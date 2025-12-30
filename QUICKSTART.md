# 빠른 시작 가이드

## 1. 서버 실행

터미널에서 다음 명령어 실행:

```bash
cd terms-scan-project
npm install  # 이미 설치했다면 생략 가능
npm start
```

서버가 `http://localhost:3000`에서 실행됩니다.

## 2. 브라우저에서 접속

- 랜딩 페이지: http://localhost:3000/index.html
- 앱 페이지: http://localhost:3000/clause_scanner_app.html

## 3. AI API 키 준비

### Google Gemini API 키 (권장)
1. https://aistudio.google.com/app/apikey 에서 계정 생성 및 로그인
2. "Create API Key" 클릭
3. 생성된 API 키를 복사 (예: `AIza...`)

### ChatGPT (OpenAI) API 키
1. https://platform.openai.com/api-keys 에서 계정 생성 및 로그인
2. "Create new secret key" 클릭
3. 생성된 API 키를 복사 (예: `sk-...`)

## 4. 약관 분석 사용하기

1. `clause_scanner_app.html` 페이지 접속
2. AI 모델 선택 (Google Gemini 또는 ChatGPT)
3. API 키 입력란에 선택한 모델의 API 키 붙여넣기
4. 약관 텍스트를 텍스트 영역에 붙여넣기
5. "약관 스캔 시작" 버튼 클릭
6. 약 10-30초 후 분석 결과 확인

## 5. Vercel 배포하기

자세한 배포 방법은 `DEPLOY.md` 파일을 참고하세요.

간단한 배포 방법:
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 테스트용 약관 텍스트 예시

```
제1조 (목적)
이 약관은 회사가 제공하는 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.

제5조 (유료 서비스 및 결제)
1. 무료 체험 기간은 7일입니다.
2. 무료 체험 기간 종료 후 별도 고지 없이 자동으로 유료 결제가 진행됩니다.
3. 결제된 금액은 환불되지 않습니다.

제10조 (개인정보의 제3자 제공)
회사는 다음의 경우 개인정보를 제3자에게 제공할 수 있습니다:
- 마케팅 및 광고 목적
- 협력사 및 제휴사에게 제공
```

## 문제 해결

### 서버가 실행되지 않을 때
- Node.js가 설치되어 있는지 확인: `node --version`
- 포트 3000이 이미 사용 중인지 확인

### API 오류가 발생할 때
- API 키가 올바른지 확인
- Anthropic 계정에 크레딧이 있는지 확인
- 네트워크 연결 확인

