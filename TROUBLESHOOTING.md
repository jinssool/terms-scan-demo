# 문제 해결 가이드

## 500 Internal Server Error 해결 방법

### 1. Vercel Functions 로그 확인

Vercel 대시보드에서:
1. 프로젝트 → **Functions** 탭
2. `/api/analyze` 함수 클릭
3. **Logs** 섹션에서 에러 메시지 확인

### 2. 일반적인 원인 및 해결

#### 원인 1: API 키가 없음
**증상**: `API 키가 필요합니다` 에러

**해결**:
1. Vercel 대시보드 → Settings → Environment Variables
2. `GEMINI_API_KEY` 또는 `OPENAI_API_KEY` 추가
3. 배포 재실행

또는 프론트엔드에서 API 키 입력

#### 원인 2: 의존성 패키지 오류
**증상**: `Cannot find module` 에러

**해결**:
1. `package.json`에 다음 패키지가 있는지 확인:
   ```json
   {
     "dependencies": {
       "@google/generative-ai": "^0.21.0",
       "openai": "^4.52.7"
     }
   }
   ```
2. 로컬에서 `npm install` 실행
3. Git에 커밋 후 재배포

#### 원인 3: 함수 파일 위치 오류
**증상**: 404 NOT_FOUND

**해결**:
- 파일이 `api/analyze.js` 위치에 있는지 확인
- `vercel.json` 파일이 있으면 삭제하거나 `{}`만 포함

#### 원인 4: 런타임 오류
**증상**: 함수 실행 중 오류

**해결**:
1. Vercel Functions 로그에서 정확한 에러 메시지 확인
2. 코드의 try-catch 블록 확인
3. API 응답 형식 확인

### 3. 로컬에서 테스트

```bash
cd terms-scan-project
npm install
npm start
```

브라우저에서 `http://localhost:3000/clause_scanner_app.html` 접속

### 4. 배포 확인 체크리스트

- [ ] `api/analyze.js` 파일이 존재하는가?
- [ ] `package.json`에 필요한 패키지가 있는가?
- [ ] 환경 변수가 설정되어 있는가?
- [ ] Git에 모든 파일이 커밋되었는가?
- [ ] Vercel Functions 탭에서 함수가 표시되는가?
- [ ] 함수 로그에 에러가 없는가?

### 5. 디버깅 팁

1. **콘솔 로그 확인**: Vercel Functions 로그에서 `console.log` 출력 확인
2. **응답 형식 확인**: API 응답이 올바른 JSON 형식인지 확인
3. **네트워크 탭 확인**: 브라우저 개발자 도구에서 실제 요청/응답 확인

