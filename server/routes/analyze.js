import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { sampleLabels } from '../data/laundryGuideData.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = process.env.DATA_DIR 
  ? path.join(process.env.DATA_DIR, 'uploads') 
  : path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `label-${uniqueSuffix}${ext}`);
  }
});

// File filter: only common image formats
const fileFilter = (req, file, cb) => {
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('지원되지 않는 파일 형식입니다. JPG, PNG, WEBP, GIF 이미지 파일만 업로드할 수 있습니다.'), false);
  }
};

// 10MB limit
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
});

// Helper: read file to base64
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
      mimeType
    }
  };
}

// System prompt for Gemini Vision
const GEMINI_SYSTEM_INSTRUCTION = `
당신은 의류 케어 라벨 및 세탁 기호(한국 표준 KS K 0021 및 국제 표준 ISO 3758) 판독 전문 AI 'LAUNDRY VISION'입니다.
제공된 이미지를 꼼꼼하게 검토하여 다음 엄격한 규칙에 따라 세탁 라벨을 분석하세요.

[분석 규칙 - 필수 준수]
1. 실제 사진에서 눈으로 명확히 확인할 수 있는 기호만 판별하십시오.
2. 사진에 존재하지 않는 기호나 보이지 않는 기호를 추측으로 날조하거나 임의 생성하지 마십시오.
3. 기호가 훼손, 흐림, 구김, 또는 가려짐 등으로 판별하기 어려운 경우, 해당 항목의 symbolName을 '인식 불가'로 하고 confidence를 'unclear'로 지정하십시오.
4. 만약 업로드된 이미지가 옷의 세탁 라벨이 아니거나(예: 풍경, 인물, 음식, 일반 옷 겉면 등), 세탁 기호가 전혀 보이지 않는 경우:
   isCareLabel: false,
   labelDetected: false,
   overallSummary: "업로드된 이미지에서 세탁 취급 라벨 또는 세탁 기호를 식별할 수 없습니다. 옷 안쪽에 부착된 세탁 라벨 사진을 다시 촬영해 주세요."
   형태로 명확히 표시하십시오.
5. 잘못된 세탁법을 확정적으로 단정하여 안내하지 말고, 주의사항을 충실히 제공하십시오.

반드시 다른 부가 텍스트 없이 유효한 JSON 형식 하나만 출력하십시오. Markdown codeblock(\`\`\`json ... \`\`\`) 형식도 허용됩니다.

JSON 스키마 규격:
{
  "isCareLabel": true | false,
  "labelDetected": true | false,
  "fabricInfo": "인식된 섬유 혼용률 (예: '면 100%', '울 80% 캐시미어 20%', '미표시')",
  "overallSummary": "이 의류의 올바른 세탁 관리법 종합 요약 (친절한 존댓말 2~3문장)",
  "keyCautions": [
    "가장 치명적인 손상을 유발할 수 있는 주의사항 (예: 회전식 건조기 절대 금지)",
    "주의사항 2 (예: 염소계 표백제 불가)"
  ],
  "symbols": [
    {
      "category": "wash" | "bleach" | "dry" | "iron" | "dryclean",
      "categoryName": "물세탁" | "표백" | "건조" | "다림질" | "드라이클리닝",
      "symbolName": "인식된 기호 이름 (예: '40℃ 세탁기 표준', '손세탁', '물세탁 금지', '인식 불가')",
      "meaning": "기호의 공식 의미 설명",
      "recommendation": "권장 세탁 방법 가이드",
      "caution": "해당 공정 시 주의사항",
      "confidence": "high" | "medium" | "low" | "unclear",
      "iconCode": "WASH_40_NORMAL" | "WASH_40_GENTLE" | "WASH_30_VERY_GENTLE" | "WASH_HAND" | "WASH_NO" | "BLEACH_ALL" | "BLEACH_OXYGEN_ONLY" | "BLEACH_NO" | "TUMBLE_HIGH" | "TUMBLE_LOW" | "TUMBLE_NO" | "DRY_FLAT_SHADE" | "DRY_LINE_SHADE" | "IRON_200" | "IRON_150" | "IRON_110" | "IRON_CLOTH" | "IRON_NO" | "DRYCLEAN_YES" | "DRYCLEAN_P" | "DRYCLEAN_F" | "DRYCLEAN_NO" | "UNKNOWN"
    }
  ]
}
`;

// POST /api/analyze
router.post('/', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: '파일 용량이 너무 큽니다. 10MB 이하의 이미지를 업로드해주세요.' });
      }
      return res.status(400).json({ error: `파일 업로드 오류: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { sampleId } = req.body;
    const file = req.file;

    // Check if neither sample nor file provided
    if (!sampleId && !file) {
      return res.status(400).json({ error: '분석할 이미지를 업로드하거나 샘플 라벨을 선택해주세요.' });
    }

    // Check Gemini API Key
    const apiKey = process.env.GEMINI_API_KEY;
    const hasLiveApiKey = Boolean(apiKey && apiKey.trim().length > 5 && !apiKey.includes('YOUR_GEMINI_API_KEY'));

    // 1. If sample is selected and no API key or explicitly requested sample analysis
    if (sampleId) {
      const sample = sampleLabels.find(s => s.id === sampleId);
      if (!sample) {
        return res.status(404).json({ error: '선택한 샘플을 찾을 수 없습니다.' });
      }

      // If we don't have an API key, return the ground-truth sample result in test mode
      if (!hasLiveApiKey) {
        return res.json({
          success: true,
          mode: 'test',
          isMock: true,
          modeNotice: '[테스트 모드] Gemini API 키가 설정되지 않아 표준 샘플 데이터로 분석되었습니다.',
          imageName: sample.title,
          imagePath: sample.image,
          result: sample.analysis
        });
      }
      // If we have an API key, we will analyze the sample image directly below!
    }

    // 2. Real Gemini Analysis
    if (hasLiveApiKey) {
      try {
        let imagePart = null;
        let imagePath = '';
        let imageName = '';

        if (file) {
          imagePart = fileToGenerativePart(file.path, file.mimetype);
          imagePath = `/uploads/${file.filename}`;
          imageName = file.originalname;
        } else if (sampleId) {
          const sample = sampleLabels.find(s => s.id === sampleId);
          imageName = sample.title;
          imagePath = sample.image;
          // SVG sample path on disk
          const sampleDiskPath = path.join(__dirname, '..', 'public', sample.image.replace(/^\//, ''));
          if (fs.existsSync(sampleDiskPath)) {
            imagePart = fileToGenerativePart(sampleDiskPath, 'image/svg+xml');
          }
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = '이 의류 라벨 사진에 부착된 세탁 기호들을 분석하고 지시된 JSON 형식으로 결과를 반환해 주세요.';
        const contents = imagePart ? [prompt, imagePart] : [prompt];

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }, ...contents.map(c => typeof c === 'string' ? { text: c } : c)] }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        });

        const responseText = result.response.text();
        
        // Clean markdown backticks if any
        let cleanedJson = responseText.trim();
        if (cleanedJson.startsWith('```json')) {
          cleanedJson = cleanedJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedJson.startsWith('```')) {
          cleanedJson = cleanedJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        let parsedResult;
        try {
          parsedResult = JSON.parse(cleanedJson);
        } catch (jsonErr) {
          console.error('JSON parse error from Gemini output:', jsonErr, responseText);
          throw new Error('Gemini 분석 응답 형식을 해석할 수 없습니다.');
        }

        return res.json({
          success: true,
          mode: 'live',
          isMock: false,
          imageName,
          imagePath,
          result: parsedResult
        });
      } catch (geminiError) {
        console.error('Gemini API execution error:', geminiError);
        
        // Provide clear actionable error message
        const errMsg = geminiError.message || '';
        let userFriendlyError = 'Gemini 이미지 분석 중 오류가 발생했습니다.';
        if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('key not valid')) {
          userFriendlyError = '등록된 Gemini API 키가 유효하지 않습니다. 올바른 키를 입력해주세요.';
        } else if (errMsg.includes('quota') || errMsg.includes('RESOURCE_EXHAUSTED')) {
          userFriendlyError = 'Gemini API 호출 할당량이 초과되었습니다. 잠시 후 다시 시도해주세요.';
        }

        return res.status(500).json({
          error: userFriendlyError,
          details: errMsg,
          suggestTestMode: true
        });
      }
    }

    // 3. Fallback when no Gemini API key is configured
    // We clearly inform user this is Test Mode!
    if (file) {
      const imagePath = `/uploads/${file.filename}`;
      const imageName = file.originalname;

      // Realistic test mock result that simulates care label scan
      const mockResult = {
        isCareLabel: true,
        labelDetected: true,
        fabricInfo: '면 100% (Cotton 100% 추정)',
        overallSummary: '물온도 40℃ 표준 세탁기로 세탁이 가능하며, 산소계 표백제 사용이 가능합니다. 원단 보호를 위해 그늘 건조를 권장하며 140~160℃ 중온에서 다림질하세요.',
        keyCautions: [
          '염소계 표백제(락스)는 섬유 탈색 및 원단 손상을 일으키므로 절대 사용하지 마세요.',
          '고온 열풍 건조기 사용 시 수축 위험이 있으므로 자연 건조를 권장합니다.'
        ],
        symbols: [
          {
            category: 'wash',
            categoryName: '물세탁',
            symbolName: '40℃ 세탁기 세탁 (표준 코스)',
            meaning: '물 온도 40℃ 이하로 세탁기에서 일반 세탁이 가능합니다.',
            recommendation: '일반 세탁 세제를 사용하여 표준 코스로 세탁하세요.',
            caution: '진한 색상 의류는 물 빠짐 방지를 위해 분리 세탁하세요.',
            confidence: 'high',
            iconCode: 'WASH_40_NORMAL'
          },
          {
            category: 'bleach',
            categoryName: '표백',
            symbolName: '산소계 표백제만 가능',
            meaning: '과탄산소다 등 산소계 표백제는 사용 가능하나 염소계 표백제(락스)는 금지됩니다.',
            recommendation: '얼룩 제거 시 미온수에 산소계 표백제를 충분히 녹여 사용하세요.',
            caution: '염소계 표백제 접촉 시 즉시 탈색됩니다.',
            confidence: 'high',
            iconCode: 'BLEACH_OXYGEN_ONLY'
          },
          {
            category: 'dry',
            categoryName: '건조',
            symbolName: '옷걸이에 걸어 그늘에 건조',
            meaning: '직사광선을 피해 통풍이 잘되는 그늘에서 옷걸이에 걸어 말립니다.',
            recommendation: '햇빛으로 인한 색바램을 방지하기 위해 그늘진 베란다에 널어주세요.',
            caution: '젖은 상태로 뭉쳐두면 냄새 및 곰팡이가 생길 수 있습니다.',
            confidence: 'high',
            iconCode: 'DRY_LINE_SHADE'
          },
          {
            category: 'iron',
            categoryName: '다림질',
            symbolName: '중온 다림질 (140~160℃)',
            meaning: '다리미 온도를 140~160℃(점 2개)로 설정하여 다림질합니다.',
            recommendation: '약간의 스팀을 주거나 분무기로 물을 뿌린 후 다려주세요.',
            caution: '원단이 얇은 경우 다림질용 천을 덧대어 다리세요.',
            confidence: 'high',
            iconCode: 'IRON_150'
          },
          {
            category: 'dryclean',
            categoryName: '드라이클리닝',
            symbolName: '드라이클리닝 가능',
            meaning: '전문 세탁소에서 일반 드라이클리닝이 가능합니다.',
            recommendation: '가정 물세탁이 가능하므로 필요한 경우에만 드라이클리닝을 맡기세요.',
            caution: '일상적인 오염은 물세탁으로 충분합니다.',
            confidence: 'high',
            iconCode: 'DRYCLEAN_YES'
          }
        ]
      };

      return res.json({
        success: true,
        mode: 'test',
        isMock: true,
        modeNotice: '⚠️ [테스트 모드] 현재 백엔드 .env에 GEMINI_API_KEY가 등록되어 있지 않아 테스트 모드로 동작합니다. 실시간 비전 AI 분석을 원하시면 API 키를 등록해주세요.',
        imageName,
        imagePath,
        result: mockResult
      });
    }

    res.status(400).json({ error: '분석할 이미지를 찾을 수 없습니다.' });
  });
});

export default router;
