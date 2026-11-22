import React, { useState } from 'react';
import { 
  Sparkles, RotateCcw, Bookmark, Check, AlertTriangle, ShieldCheck, 
  ExternalLink, Info, Copy, Share2, Layers, CheckCircle2, AlertOctagon, HelpCircle 
} from 'lucide-react';
import SymbolCard from './SymbolCard';

export default function AnalysisResult({
  analysisData,
  onReset,
  onSaveToHistory,
  isSaving,
  isSaved,
  onViewGuide
}) {
  const [copied, setCopied] = useState(false);
  const [showFullImageModal, setShowFullImageModal] = useState(false);

  if (!analysisData) return null;

  const { result, imageName, imagePath, mode, modeNotice } = analysisData;
  const isCareLabel = result?.isCareLabel !== false && result?.labelDetected !== false;

  const handleCopySummary = () => {
    if (!result) return;
    const textToCopy = `[LAUNDRY VISION 세탁 가이드]
원단: ${result.fabricInfo || '미표시'}
요약: ${result.overallSummary || ''}

⚠️ 핵심 주의사항:
${(result.keyCautions || []).map(c => `• ${c}`).join('\n')}

인식된 기호:
${(result.symbols || []).map(s => `• [${s.categoryName}] ${s.symbolName}: ${s.recommendation || s.meaning}`).join('\n')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Case 1: Image is NOT a laundry care label or no care symbols found
  if (!isCareLabel) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h3 className="font-extrabold text-xl text-slate-900">
            세탁 라벨을 식별할 수 없습니다
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {result?.overallSummary || '업로드된 사진에서 공인 세탁 기호(KS/ISO 규격)를 찾지 못했습니다. 의류 안쪽에 부착된 흰색 라벨을 밝은 곳에서 선명하게 다시 촬영해주세요.'}
          </p>
        </div>

        {/* Uploaded image preview */}
        {imagePath && (
          <div className="w-48 h-48 mx-auto bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
            <img src={imagePath} alt="촬영된 이미지" className="w-full h-full object-contain p-2" />
          </div>
        )}

        <div className="p-4 max-w-lg mx-auto bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs text-slate-600 space-y-2">
          <p className="font-bold text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-brand-600" /> 세탁 라벨 촬영 팁:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
            <li>옷의 안쪽 옆구리선 또는 목 뒤 라벨을 펼쳐서 촬영해주세요.</li>
            <li>그림자가 지지 않도록 조명을 켜고 기호가 흔들리지 않게 초점을 맞춰주세요.</li>
            <li>라벨이 접히거나 말리지 않도록 평평하게 펴고 찍으시면 높은 정확도로 판독됩니다.</li>
          </ul>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>다른 사진으로 다시 분석하기</span>
          </button>
        </div>
      </div>
    );
  }

  // Case 2: Successfully analyzed care label
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Test Mode Notice Banner if running in demo mode */}
      {modeNotice && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold mb-0.5">테스트 모드 안내</p>
            <p className="text-amber-800 text-xs leading-relaxed">{modeNotice}</p>
          </div>
        </div>
      )}

      {/* Main Analysis Summary Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Original Image Card */}
            <div className="w-full lg:w-72 shrink-0 space-y-3">
              <div 
                onClick={() => setShowFullImageModal(true)}
                className="relative group w-full h-72 bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden shadow-inner flex items-center justify-center cursor-zoom-in"
                title="원본 크게 보기"
              >
                <img
                  src={imagePath}
                  alt={imageName || '세탁 라벨 원본'}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[1px]">
                  <ExternalLink className="w-4 h-4" /> 클릭하여 크게 보기
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="font-medium truncate max-w-[180px]">{imageName}</span>
                <span className="font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  {result.fabricInfo || '섬유 미표시'}
                </span>
              </div>
            </div>

            {/* Right: Overall Care Recommendation & Key Cautions */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-extrabold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" /> AI 세탁 분석 완료
                  </span>
                  <span className="text-xs text-slate-400">
                    인식된 기호: <strong className="text-slate-700 font-bold">{result.symbols?.length || 0}개</strong>
                  </span>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    title="가이드 요약 복사"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                    <span className="hidden sm:inline">{copied ? '복사됨!' : '요약 복사'}</span>
                  </button>

                  <button
                    onClick={onSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={`px-4 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                      isSaved
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-brand-600 hover:bg-brand-700 text-white active:scale-95'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>기록 저장 완료</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>{isSaving ? '저장 중...' : '결과 저장'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Overall Summary Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50/60 to-sky-50/40 border border-brand-100/80">
                <h4 className="text-xs font-extrabold text-brand-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-600" /> 전체 세탁 방법 종합 요약
                </h4>
                <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                  {result.overallSummary || '기호별 세탁 주의사항을 준수하여 안전하게 세탁해 주세요.'}
                </p>
              </div>

              {/* Key Cautions Warning Box (High Priority) */}
              {result.keyCautions && result.keyCautions.length > 0 && (
                <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200">
                  <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> 주의해야 할 세탁 방법 (손상 방지 필수)
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-rose-900 font-medium">
                    {result.keyCautions.map((caution, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                        <span>{caution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Categories Detected Symbols Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              항목별 세탁 기호 상세 분석
            </h3>
            <span className="text-xs text-slate-500">
              (물세탁 · 표백 · 건조 · 다림질 · 드라이클리닝)
            </span>
          </div>

          <button
            onClick={onViewGuide}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
          >
            전체 세탁 기호 사전 보기 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.symbols && result.symbols.length > 0 ? (
            result.symbols.map((sym, index) => (
              <SymbolCard key={index} symbol={sym} index={index} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-sm text-slate-400 bg-white rounded-2xl border border-slate-200">
              분석된 세탁 기호가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
        <button
          onClick={onReset}
          className="px-6 py-3.5 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm active:scale-[0.98] transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>다른 라벨 다시 분석하기</span>
        </button>

        <button
          onClick={onSaveToHistory}
          disabled={isSaving || isSaved}
          className={`px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center gap-2 ${
            isSaved
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/25'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>분석 결과가 기록에 저장되었습니다</span>
            </>
          ) : (
            <>
              <Bookmark className="w-5 h-5" />
              <span>{isSaving ? '저장 중...' : '분석 결과 저장하기'}</span>
            </>
          )}
        </button>
      </div>

      {/* Full Image Modal */}
      {showFullImageModal && (
        <div 
          onClick={() => setShowFullImageModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-2 shadow-2xl overflow-hidden">
            <img src={imagePath} alt="라벨 확대 보기" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowRight(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
