# Vercel 404 오류 해결 가이드

## 문제
`404: NOT_FOUND` 오류가 발생하는 경우

## 해결 방법

### 1. vercel.json 파일 제거 또는 빈 파일로 설정
Vercel은 `/api` 폴더의 파일을 자동으로 인식합니다. `vercel.json` 파일이 있으면 간단하게 빈 객체 `{}`만 포함하거나 파일을 삭제하세요.

### 2. 파일 구조 확인
다음과 같은 구조여야 합니다:
```
terms-scan-project/
  ├── api/
  │   └── analyze.js
  ├── package.json
  ├── index.html
  └── clause_scanner_app.html
```

### 3. Vercel 재배포

```bash
cd terms-scan-project
vercel --prod
```

또는 Vercel 대시보드에서:
1. 프로젝트 → Settings → Git
2. "Redeploy" 버튼 클릭

### 4. API 엔드포인트 확인

배포 후 다음 URL로 테스트:
- `https://your-project.vercel.app/api/analyze`

### 5. 환경 변수 확인

Vercel 대시보드에서:
1. Settings → Environment Variables
2. `GEMINI_API_KEY` 또는 `OPENAI_API_KEY`가 설정되어 있는지 확인

### 6. 함수 로그 확인

Vercel 대시보드에서:
1. Functions 탭
2. `/api/analyze` 함수 클릭
3. 로그 확인

## 여전히 문제가 있는 경우

1. `api/analyze.js` 파일의 `module.exports` 형식 확인
2. Node.js 런타임이 올바른지 확인 (`package.json`의 engines 필드)
3. 의존성이 `package.json`에 포함되어 있는지 확인

