# Vercel 배포 가이드

## 방법 1: Vercel CLI 사용

### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

### 2. 로그인

```bash
vercel login
```

### 3. 프로젝트 디렉토리에서 배포

```bash
cd terms-scan-project
vercel
```

처음 배포 시 프로젝트 설정을 묻습니다:
- Set up and deploy? **Y**
- Which scope? (자신의 계정 선택)
- Link to existing project? **N**
- What's your project's name? **terms-scan-demo** (원하는 이름)
- In which directory is your code located? **./**

### 4. 프로덕션 배포

```bash
vercel --prod
```

## 방법 2: Vercel 웹사이트 사용

### 1. GitHub에 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Vercel 대시보드에서 배포

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - Framework Preset: **Other**
   - Root Directory: `terms-scan-project` (또는 `.`)
5. "Deploy" 클릭

## 배포 후 확인

배포가 완료되면:
- 프로젝트 URL: `https://terms-scan-demo.vercel.app`
- 랜딩 페이지: `https://terms-scan-demo.vercel.app/index.html`
- 앱 페이지: `https://terms-scan-demo.vercel.app/clause_scanner_app.html`

## 환경 변수

현재는 API 키를 사용자가 직접 입력하도록 설계되어 있어 환경 변수 설정이 필요 없습니다.

## 트러블슈팅

### 빌드 오류 발생 시

1. `package.json`에 모든 의존성이 포함되어 있는지 확인
2. `vercel.json` 설정 확인
3. Vercel 로그 확인: 대시보드 → 프로젝트 → Deployments → Logs

### API 함수가 작동하지 않을 때

1. `/api/analyze.js` 파일이 올바른 위치에 있는지 확인
2. 함수가 올바른 형식으로 export되는지 확인
3. Vercel 함수 로그 확인

## 주의사항

- Vercel의 무료 플랜에서는 함수 실행 시간 제한이 있습니다 (10초)
- 큰 약관 텍스트 분석 시 타임아웃이 발생할 수 있으니 주의하세요
- 필요시 Vercel Pro 플랜으로 업그레이드하거나 타임아웃 설정을 조정하세요

