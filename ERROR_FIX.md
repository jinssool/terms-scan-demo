# 500 오류 해결 가이드

## 즉시 확인 사항

### 1. API 키 확인 (가장 중요!)

**Vercel 대시보드에서:**
1. 프로젝트 → **Settings** → **Environment Variables**
2. `GEMINI_API_KEY`가 설정되어 있는지 확인
3. 없으면 추가:
   - Key: `GEMINI_API_KEY`
   - Value: Google AI Studio에서 발급받은 API 키
   - Environment: Production, Preview, Development 모두 선택
4. **재배포 필수!** (환경 변수 추가 후 반드시 재배포)

### 2. 테스트 엔드포인트 확인

브라우저에서 다음 URL 접속:
```
https://your-project.vercel.app/api/test
```

응답 예시:
```json
{
  "status": "ok",
  "packages": {
    "@google/generative-ai": "OK",
    "openai": "OK"
  },
  "environment": {
    "hasGeminiKey": true,
    "hasOpenAIKey": false
  }
}
```

만약 패키지가 "ERROR"로 표시되면:
- Vercel에서 패키지가 제대로 설치되지 않은 것
- `package.json` 확인 및 재배포 필요

### 3. Vercel Functions 로그 확인

**Vercel 대시보드에서:**
1. 프로젝트 → **Functions** 탭
2. `/api/analyze` 함수 클릭
3. **Logs** 섹션에서 에러 메시지 확인

**확인할 내용:**
- "API 키가 필요합니다" → API 키 설정 필요
- "Cannot find module" → 패키지 설치 문제
- "Gemini API 오류" → API 키가 잘못되었거나 API 호출 실패

### 4. 빠른 해결 방법

#### 방법 A: 환경 변수 설정 (권장)
1. Vercel 대시보드 → Settings → Environment Variables
2. `GEMINI_API_KEY` 추가
3. 재배포

#### 방법 B: 프론트엔드에서 API 키 입력
1. 로그인 화면에서 API 키 입력 필드에 Gemini API 키 입력
2. 분석 실행

### 5. 재배포 방법

```bash
cd terms-scan-project
git add .
git commit -m "Fix API error handling"
git push
```

또는 Vercel 대시보드에서:
- Deployments → 최신 배포 → "Redeploy"

## 일반적인 오류 메시지와 해결

| 오류 메시지 | 원인 | 해결 방법 |
|------------|------|----------|
| "API 키가 필요합니다" | API 키 미설정 | 환경 변수 또는 프론트엔드에서 API 키 입력 |
| "Gemini API 키가 유효하지 않습니다" | 잘못된 API 키 | Google AI Studio에서 새 API 키 발급 |
| "Cannot find module" | 패키지 미설치 | `package.json` 확인 및 재배포 |
| "서버 설정 오류" | 모듈 로드 실패 | Vercel Functions 로그 확인 |

## 디버깅 체크리스트

- [ ] `/api/test` 엔드포인트가 정상 작동하는가?
- [ ] `GEMINI_API_KEY` 환경 변수가 설정되어 있는가?
- [ ] 환경 변수 추가 후 재배포를 했는가?
- [ ] Vercel Functions 로그에 에러가 있는가?
- [ ] `package.json`에 필요한 패키지가 모두 있는가?
- [ ] API 키가 올바른 형식인가? (AIza...로 시작)

