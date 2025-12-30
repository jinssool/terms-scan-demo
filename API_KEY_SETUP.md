# API 키 설정 가이드

## 방법 1: Vercel 환경 변수 사용 (권장 ⭐)

서버 측에서 API 키를 관리하는 방법입니다. 사용자가 API 키를 입력할 필요가 없습니다.

### 1. Google Gemini API 키 발급

1. https://aistudio.google.com/app/apikey 접속
2. "Create API Key" 클릭
3. 생성된 API 키 복사 (예: `AIzaSy...`)

### 2. Vercel 환경 변수 설정

#### 방법 A: Vercel 웹사이트에서 설정 (권장)

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 배포한 프로젝트 클릭
3. **Settings** 탭 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 클릭
5. 다음 환경 변수 추가:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: 발급받은 Google Gemini API 키 (예: `AIzaSy...`)
   - **Environment**: Production, Preview, Development 모두 선택
6. **Save** 클릭
7. **Deployments** 탭으로 이동
8. 최신 배포 옆 **⋯** 메뉴 클릭 → **Redeploy** 선택

#### 방법 B: Vercel CLI로 설정

```bash
# 프로젝트 디렉토리에서
vercel env add GEMINI_API_KEY
# API 키 입력 (예: AIzaSy...)
# 환경 선택: Production, Preview, Development
```

### 3. 코드 변경 후 재배포

`api/analyze.js` 파일이 이미 환경 변수를 지원하도록 업데이트되었습니다.

재배포:
```bash
vercel --prod
```

## 방법 2: 프론트엔드에서 사용자 입력 (현재 방식)

현재 코드는 프론트엔드에서 사용자가 직접 API 키를 입력하는 방식도 지원합니다.
환경 변수가 설정되지 않은 경우, 사용자가 입력한 API 키를 사용합니다.

## 보안 권장사항

- ✅ **방법 1 권장**: 서버 측 환경 변수 사용
  - API 키가 클라이언트에 노출되지 않음
  - 사용자가 API 키를 입력할 필요 없음
  - 더 안전하고 편리함

- ⚠️ **방법 2 사용 시 주의**:
  - API 키가 브라우저를 통해 전송됨
  - 사용자마다 API 키를 입력해야 함
  - API 키 노출 위험 있음

## 확인 방법

환경 변수가 제대로 설정되었는지 확인:

1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. `GEMINI_API_KEY`가 있는지 확인
3. Functions 탭에서 로그 확인

또는 배포 후 테스트:
- 프론트엔드에서 API 키 입력 없이도 작동하면 환경 변수가 제대로 설정된 것입니다.

