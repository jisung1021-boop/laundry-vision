# 🧺 LAUNDRY VISION (런드리 비전)

> **의류 세탁 라벨 기호 자동인식 & 올바른 세탁 가이드 웹 서비스**  
> Google Gemini Vision AI를 활용하여 의류 케어 라벨의 기호를 자동으로 인식하고, 옷감 손상을 방지하는 최적의 세탁·건조·다림질 방법을 안내합니다.

---

## 🌟 프로젝트 개요

의류 안쪽에 부착된 세탁 취급 라벨은 기호가 복잡하고 제조국마다 규격이 상이하여 일반 사용자가 올바른 세탁법을 파악하기 어렵습니다. 잘못된 세탁 한 번으로 니트가 수축하거나 아웃도어 방수 코팅이 손상되는 사고를 방지하기 위해, 사진 업로드만으로 5대 핵심 세탁 기호를 자동 판독해 주는 전문 세탁 케어 플랫폼입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 사용 기술 | 설명 |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | 빠르고 반응성 높은 모던 SPA 웹 애플리케이션 |
| **Styling** | Tailwind CSS v3 | 화이트 & 연한 블루(#0284C7, #38BDF8) 테마의 모던 세탁 서비스 UI |
| **Icons** | Lucide React | 세련된 벡터 UI 아이콘 및 KS/ISO 표준 SVG 세탁 기호 |
| **Backend** | Node.js, Express | RESTful API 서버, 파일 업로드(Multer), 정적 파일 서빙, SPA 라우팅 |
| **Database** | SQLite (`sql.js`) | 분석 결과 영구 저장 및 히스토리 관리 (새로고침 후에도 유지) |
| **Vision AI** | Google Gemini API (`@google/generative-ai`) | 멀티모달 비전 AI 모델을 통한 고정밀 세탁 기호 식별 |
| **Deployment**| Render (Web Service) | Node.js 클라우드 호스팅, HTTPS 자동 지원, 0.0.0.0 바인딩 |

---

## 📐 5대 표준 분석 영역 (KS K 0021 / ISO 3758)

1. **물세탁 (Washing)**: 세탁기 적정 수온(95℃, 60℃, 40℃, 30℃), 세탁 강도(표준, 울코스, 매우 약하게), 손세탁 여부, 물세탁 금지
2. **표백 (Bleaching)**: 모든 표백제 가능, 산소계 표백제 전용(염소계 금지), 표백제 사용 금지
3. **건조 (Drying)**: 회전식 텀블 건조기 사용 가능(고온 80℃, 저온 60℃), 건조기 금지, 햇빛/그늘 건조, 뉘어서 건조, 비틀어 짜기 금지
4. **다림질 (Ironing)**: 고온(180~200℃), 중온(140~160℃), 저온(80~120℃), 헝겊 덮고 다림질, 스팀 다림질 금지, 다림질 금지
5. **드라이클리닝 (Dry Cleaning)**: 드라이 가능, 퍼클로로에틸렌(P), 석유계 용제(F), 웨트클리닝(W), 드라이클리닝 절대 금지

---

## 📂 프로젝트 구조

```plaintext
laundry-vision/
├── client/                     # 프론트엔드 (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # UI 컴포넌트 (Uploader, Result, Guide, History, About 등)
│   │   ├── utils/api.js        # 백엔드 REST API 연동 클라이언트
│   │   ├── App.jsx             # 메인 SPA 뷰 컨트롤러
│   │   └── main.jsx
│   ├── dist/                   # npm run build 생성 배포용 정적 번들
│   └── vite.config.js          # 개발 서버 포트(5173) 및 백엔드 프록시 설정
│
├── server/                     # 백엔드 (Node.js + Express + SQLite + Gemini API)
│   ├── routes/
│   │   ├── analyze.js          # 이미지 업로드 & Gemini 비전 분석 API
│   │   ├── history.js          # SQLite 분석 기록 CRUD API
│   │   ├── guide.js            # 세탁 기호 가이드 & 표준 샘플 데이터 API
│   │   └── config.js           # API 키 상태 조회 및 런타임 설정 API
│   ├── data/
│   │   └── laundryGuideData.js # 28종 표준 기호 및 4종 실감 샘플 라벨
│   ├── public/samples/         # 4종 샘플 라벨 벡터 이미지
│   ├── uploads/                # 사용자가 업로드한 세탁 라벨 저장소
│   ├── db.js                   # SQLite 데이터베이스 엔진 (sql.js)
│   ├── database.sqlite         # SQLite 데이터 파일
│   ├── index.js                # Express 메인 진입점 (0.0.0.0:PORT 바인딩, SPA 라우팅)
│   └── .env                    # 로컬 환경 변수 (GitHub 커밋 제외)
│
├── .gitignore                  # GitHub 업로드 제외 설정 (.env, node_modules, sqlite 등)
├── render.yaml                 # Render 원클릭 배포 Blueprint 설정
├── start-all.js                # 로컬 동시 실행 오케스트레이터 (PowerShell 완벽 호환)
├── package.json                # 통합 빌드/실행 스크립트
└── README.md                   # 프로젝트 종합 문서
```

---

## 🌐 Render 정식 배포 가이드 (Step-by-Step)

LAUNDRY VISION은 **단일 Node.js Web Service**로 프론트엔드(React SPA)와 백엔드(Express API)를 함께 제공하도록 최적화되어 있습니다.

### [1단계] GitHub 저장소 준비 및 소스코드 푸시

1. **[GitHub](https://github.com/)**에 로그인 후 새 Repository를 생성합니다 (예: `laundry-vision`, **Public** 또는 **Private** 선택).
2. 로컬 터미널(PowerShell)을 열고 프로젝트 루트 폴더에서 Git 커밋 및 푸시를 진행합니다:

```powershell
# 1. 프로젝트 폴더로 이동
cd "C:\Users\dmsrc\.gemini\antigravity\scratch\laundry-vision"

# 2. Git 저장소 초기화
git init

# 3. 브랜치명을 main으로 설정
git branch -M main

# 4. 파일 스테이징 및 초기 커밋 (.gitignore 덕분에 .env와 node_modules는 자동으로 제외됩니다)
git add .
git commit -m "feat: complete LAUNDRY VISION full-stack web service for Render deploy"

# 5. 본인의 GitHub 원격 저장소 연결 (본인의 GitHub 주소로 변경)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/laundry-vision.git

# 6. GitHub에 푸시
git push -u origin main
```

---

### [2단계] Render에서 Web Service 생성

1. **[Render 대시보드](https://dashboard.render.com/)**에 접속하여 로그인합니다.
2. 우측 상단 **[New +]** 버튼을 클릭하고 **[Web Service]**를 선택합니다.
3. **[Build and deploy from a Git repository]**를 선택하고, 방금 푸시한 GitHub의 `laundry-vision` 저장소를 연결(**Connect**)합니다.
4. 아래 설정 항목들을 입력합니다:

| 설정 항목 | 권장 입력값 | 설명 |
| :--- | :--- | :--- |
| **Name** | `laundry-vision` (또는 원하는 서비스명) | 서비스 식별 이름 |
| **Region** | `Singapore` 또는 `Oregon (US West)` | 사용자와 가까운 리전 권장 |
| **Branch** | `main` | 배포할 깃허브 브랜치 |
| **Root Directory** | *(비워둠)* | 루트 경로 기본값 사용 |
| **Runtime** | `Node` | Node.js 런타임 환경 |
| **Build Command** | `npm --prefix server install && npm --prefix client install && npm run build` | 백엔드/프론트엔드 패키지 설치 및 Vite 빌드 |
| **Start Command** | `npm start` | Express 배포 서버 실행 (`node server/index.js`) |
| **Instance Type** | `Free` | 무료 플랜 선택 |

---

### [3단계] 환경 변수 (Environment Variables) 설정

페이지 하단의 **[Advanced]** 탭을 클릭하거나 **[Environment Variables]** 섹션에서 다음 변수들을 추가합니다:

1. **`NODE_VERSION`**: `20`
2. **`GEMINI_API_KEY`**: [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급받은 본인의 실제 Gemini API 키
3. **`GEMINI_MODEL`**: `gemini-1.5-flash`
4. *(선택 사항 - Persistent Disk 사용 시)* **`DATA_DIR`**: `/var/data` (영구 디스크 마운트 경로)

> [!IMPORTANT]
> - `PORT` 변수는 Render가 자동으로 내부 포트를 할당하므로 직접 입력하지 마세요. (Express 코드가 `process.env.PORT`를 자동으로 읽습니다)
> - `GEMINI_API_KEY`는 Render 서버 환경 변수에만 안전하게 저장되며, 클라이언트(프론트엔드) 브라우저 코드에는 절대 노출되지 않습니다.

---

### [4단계] 배포 시작 및 접속 확인

1. **[Create Web Service]** 버튼을 클릭합니다.
2. Render 빌드 로그에 아래 메시지가 순서대로 출력되는지 확인합니다:
   ```
   ==> Running build command 'npm --prefix server install && npm --prefix client install && npm run build'...
   vite v5.4.21 building for production...
   ✓ built in ...s
   ==> Uploading build...
   ==> Starting service with 'npm start'...
   📦 Serving frontend from: .../client/dist
   ✅ SQLite Database successfully initialized.
   🚀 LAUNDRY VISION server is running on http://0.0.0.0:10000
   🔑 Gemini API Key configured: true
   ==> Your service is live 🎉
   ```
3. 상단에 부여된 고유 URL(예: `https://laundry-vision-xxxx.onrender.com`)을 클릭하여 접속합니다.
4. 의류 세탁 라벨 업로드, 4종 샘플 테스트, 세탁 기호 가이드, 분석 기록이 모두 정상 작동하는지 확인합니다!

> [!NOTE]
> **Render 무료 플랜(Free Tier) 안내**:
> 15분간 요청이 없으면 서버가 절전(Spin down) 상태로 전환됩니다. 이후 첫 접속 시 컨테이너가 다시 켜지는 데 약 30~50초 정도 소요될 수 있으며, 이후에는 정상 속도로 즉시 응답합니다.

---

## 💻 로컬 개발 환경 실행 방법 (Local Development)

### 풀스택 동시 개발 실행 (Vite 5173 + Express 5000)
프론트엔드 Hot-Reload와 백엔드 서버를 동시에 구동합니다:
```bash
npm run start:all
```
- 프론트엔드: `http://localhost:5173`
- 백엔드 API: `http://localhost:5000`

### 프로덕션 빌드 로컬 테스트
실제 Render 배포와 동일한 방식으로 빌드 및 통합 구동을 테스트합니다:
```bash
# 1. 프론트엔드 빌드 (client/dist 생성)
npm run build

# 2. 통합 프로덕션 서버 실행 (0.0.0.0:5000)
npm start
```
브라우저에서 `http://localhost:5000` 접속.

---

## 📡 REST API 엔드포인트 명세

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/analyze` | 세탁 라벨 사진 업로드 & Gemini 비전 분석 (10MB 제한) |
| `GET` | `/api/history` | SQLite에 저장된 모든 분석 기록 목록 조회 |
| `GET` | `/api/history/:id` | 특정 분석 기록 상세 조회 |
| `POST` | `/api/history` | 새로운 분석 결과 SQLite DB에 저장 |
| `DELETE` | `/api/history/:id` | 특정 분석 기록 삭제 (연결된 이미지 파일 정리) |
| `DELETE` | `/api/history` | 모든 분석 기록 초기화 |
| `GET` | `/api/guide` | 카테고리별 세탁 기호 및 검색 결과 반환 (`?category=...&search=...`) |
| `GET` | `/api/guide/samples` | 표준 샘플 라벨 4종 정보 조회 |
| `GET` | `/api/config` | Gemini API 키 연동 상태 및 동작 모드(`live`/`test`) 확인 |
| `POST` | `/api/config/key` | 런타임 Gemini API 키 등록 및 `.env` 파일 영구 반영 |
| `GET` | `/api/health` | 서버 헬스체크 및 환경 정보 |

---

## 🛡️ 배포 안정성 및 보안 설계

- **0.0.0.0 바인딩**: Render 리버스 프록시 및 외부 네트워크 접근 완벽 지원.
- **SPA 라우팅 Fallback**: 브라우저에서 `/guide`, `/history` 등 어떤 주소로 직접 접속하거나 새로고침(F5)해도 404 없이 `index.html` 정상 응답.
- **API 키 기밀 유지**: 프론트엔드 코드가 아닌 백엔드 환경 변수(`process.env.GEMINI_API_KEY`)로만 관리.
- **Git 보안**: `.gitignore`를 통해 `.env`, DB 파일, 업로드 이미지가 깃허브 공개 저장소에 유출되지 않도록 차단.
- **영구 데이터 디렉터리(`DATA_DIR`) 지원**: Render Persistent Disk 설정 시 데이터베이스와 이미지 파일이 디플로이 후에도 유지되도록 경로 추상화.

---

## 📄 라이선스
MIT License.
