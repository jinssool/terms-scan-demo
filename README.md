# 약간 스캐너 (Terms Scanner)

AI 기반 약관 분석 서비스 - 대학생을 위한 디지털 권리 보호 도구

## 기능

- 약관 텍스트 AI 분석 (Google Gemini 또는 ChatGPT 기반)
- 리스크 레벨 분석 (Red/Yellow/Green)
- 안전 등급 산출 (A~E)
- 체크리스트 가이드 제공
- 대학생 친화적 쉬운 설명

## Vercel 배포 (권장)

### 1. Vercel에 배포하기

```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 프로젝트 디렉토리에서 배포
cd terms-scan-project
vercel
```

또는 Vercel 웹사이트에서 GitHub 저장소를 연결하여 자동 배포할 수 있습니다.

### 2. 배포 후 접속

배포가 완료되면 `https://terms-scan-demo.vercel.app` 같은 URL에서 접속할 수 있습니다.

## 로컬 개발

### 1. 의존성 설치

```bash
cd terms-scan-project
npm install
```

### 2. 서버 실행

```bash
npm start
```

서버가 `http://localhost:3000`에서 실행됩니다.

### 3. 브라우저에서 접속

- 랜딩 페이지: `http://localhost:3000/index.html`
- 앱 페이지: `http://localhost:3000/clause_scanner_app.html`

## 사용 방법

1. `clause_scanner_app.html` 페이지 접속
2. AI 모델 선택 (Google Gemini 또는 ChatGPT)
3. API 키 입력
4. 약관 텍스트 입력 또는 이미지 업로드
5. "약관 스캔 시작" 버튼 클릭
6. 분석 결과 확인

## API 키 발급

### Google Gemini API 키
1. [Google AI Studio](https://aistudio.google.com/app/apikey)에 접속
2. "Create API Key" 클릭
3. 생성된 API 키를 복사 (예: `AIza...`)

### ChatGPT (OpenAI) API 키
1. [OpenAI Platform](https://platform.openai.com/api-keys)에 접속
2. "Create new secret key" 클릭
3. 생성된 API 키를 복사 (예: `sk-...`)

## 기술 스택

- **Backend**: Node.js, Vercel Serverless Functions
- **AI Models**: Google Gemini 1.5 Flash, ChatGPT (GPT-4o-mini)
- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **Font**: Pretendard
- **Deployment**: Vercel

## 라이선스

MIT

