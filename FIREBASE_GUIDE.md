# 🔥 Firebase에서 프로젝트 배포하기

Firebase Hosting을 사용하여 프로젝트를 인터넷에 배포하는 완벽 가이드입니다.

---

## 📋 사전 준비

### 필요한 것들

1. ✅ Google 계정
2. ✅ Node.js 설치 (v18.0 이상)
3. ✅ 이 프로젝트 파일들

---

## 🚀 빠른 시작 (5분 완성)

### 1단계: Firebase CLI 설치

```bash
# Firebase CLI 전역 설치
npm install -g firebase-tools
```

### 2단계: Firebase 로그인

```bash
# Google 계정으로 로그인
firebase login
```

브라우저가 열리면 Google 계정으로 로그인하세요.

### 3단계: Firebase 프로젝트 생성

#### Option A: 브라우저에서 생성 (권장)

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `economic-calendar`)
4. Google Analytics 설정 (선택사항)
5. "프로젝트 만들기" 클릭

#### Option B: CLI에서 생성

```bash
firebase projects:create economic-calendar
```

### 4단계: 프로젝트 초기화

```bash
# 프로젝트 폴더로 이동
cd your-project-folder

# Firebase 초기화
firebase init hosting
```

다음 질문에 답하세요:

```
? Please select an option:
  → Use an existing project

? Select a default Firebase project:
  → economic-calendar (선택)

? What do you want to use as your public directory?
  → dist

? Configure as a single-page app (rewrite all urls to /index.html)?
  → Yes

? Set up automatic builds and deploys with GitHub?
  → No (나중에 설정 가능)
```

### 5단계: 프로젝트 빌드

```bash
npm run build
```

`dist/` 폴더가 생성됩니다.

### 6단계: 배포!

```bash
firebase deploy
```

완료! 🎉 배포된 URL이 표시됩니다:
```
Hosting URL: https://economic-calendar.web.app
```

---

## 🔄 업데이트 배포

코드를 수정한 후 다시 배포하려면:

```bash
# 1. 빌드
npm run build

# 2. 배포
firebase deploy
```

단 2줄이면 끝! 😎

---

## 🎯 커스텀 도메인 연결

### 1단계: Firebase Console에서 도메인 추가

1. [Firebase Console](https://console.firebase.google.com/) → 프로젝트 선택
2. 좌측 메뉴 → Hosting → "도메인 추가"
3. 소유한 도메인 입력 (예: `myeconomy.com`)
4. "계속" 클릭

### 2단계: DNS 설정

Firebase가 제공하는 레코드를 도메인 제공업체(예: GoDaddy, Namecheap)에 추가:

```
Type: A
Name: @
Value: 151.101.1.195, 151.101.65.195

Type: TXT
Name: @
Value: [Firebase가 제공한 값]
```

### 3단계: 확인

DNS 전파까지 최대 24시간 소요됩니다.

---

## ⚙️ Firebase 설정 파일

### firebase.json (이미 생성됨)

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### .firebaserc (이미 생성됨)

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

프로젝트 ID를 실제 Firebase 프로젝트 ID로 변경하세요.

---

## 🔐 환경 변수 설정

API 키 같은 민감한 정보를 저장하려면:

### 1단계: .env 파일 생성

```bash
# .env 파일 생성
touch .env
```

```.env
VITE_API_KEY=your-api-key-here
VITE_FIREBASE_API_KEY=your-firebase-key
```

### 2단계: 코드에서 사용

```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

### 3단계: .gitignore 확인

`.env` 파일이 `.gitignore`에 포함되어 있는지 확인 (이미 포함됨)

---

## 📊 Firebase Analytics 설정 (선택사항)

### 방문자 통계 추적

```bash
firebase init analytics
```

Firebase Console에서 Analytics 데이터를 확인할 수 있습니다:
- 방문자 수
- 페이지 조회수
- 사용자 행동

---

## 🌍 다중 사이트 호스팅

여러 버전을 동시에 호스팅하려면:

```bash
# 새 사이트 추가
firebase hosting:sites:create staging-economic-calendar

# firebase.json 수정
{
  "hosting": [
    {
      "target": "production",
      "public": "dist",
      "site": "economic-calendar"
    },
    {
      "target": "staging",
      "public": "dist",
      "site": "staging-economic-calendar"
    }
  ]
}

# 배포
firebase deploy --only hosting:production
firebase deploy --only hosting:staging
```

---

## 🔍 배포 미리보기

배포 전에 미리보기:

```bash
firebase hosting:channel:deploy preview
```

임시 URL이 생성되어 테스트 가능합니다.

---

## 📈 성능 최적화

### 1. 캐싱 설정

`firebase.json`에 캐싱 헤더 추가 (이미 포함됨):

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### 2. 압축 활성화

Firebase는 자동으로 gzip 압축을 제공합니다.

### 3. CDN

Firebase Hosting은 자동으로 전 세계 CDN에 배포됩니다.

---

## 🛡️ 보안 규칙

### HTTPS 강제

Firebase는 자동으로 HTTPS를 제공합니다. HTTP는 자동으로 HTTPS로 리다이렉트됩니다.

### CORS 설정

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      }
    ]
  }
}
```

---

## 📱 모바일 앱 연동 (선택사항)

Firebase는 iOS/Android 앱과도 연동 가능:

```bash
firebase init
# iOS, Android 옵션 선택
```

---

## 🔧 문제 해결

### 1. "firebase: command not found"

```bash
# Firebase CLI 재설치
npm uninstall -g firebase-tools
npm install -g firebase-tools
```

### 2. 배포 후 404 에러

`firebase.json`의 rewrites 설정 확인:

```json
"rewrites": [
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

### 3. 업데이트가 반영되지 않음

```bash
# 캐시 정리
firebase hosting:disable
firebase hosting:clone source:destination

# 또는 브라우저 캐시 삭제 (Ctrl + Shift + R)
```

### 4. 권한 오류

```bash
# 다시 로그인
firebase logout
firebase login
```

### 5. 빌드 실패

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules dist
npm install
npm run build
```

---

## 📊 Firebase Console 활용

### [Firebase Console](https://console.firebase.google.com/) 에서 확인 가능한 정보:

1. **Hosting 탭**
   - 배포 히스토리
   - 트래픽 통계
   - 도메인 관리

2. **Analytics 탭** (설정 시)
   - 방문자 수
   - 페이지뷰
   - 사용자 행동

3. **Performance 탭**
   - 페이지 로딩 속도
   - 네트워크 성능

---

## 💰 비용

### 무료 플랜 (Spark Plan)

- 호스팅: 10GB 저장소
- 트래픽: 360MB/일
- 무료 SSL 인증서
- **대부분의 개인 프로젝트에 충분!**

### 유료 플랜 (Blaze Plan)

- 종량제 (사용한 만큼만)
- 무료 할당량 초과 시 과금
- 대규모 트래픽에 적합

---

## 🚀 자동 배포 설정 (GitHub Actions)

### 1단계: GitHub에 코드 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### 2단계: Firebase Token 생성

```bash
firebase login:ci
```

토큰이 출력됩니다. 복사하세요.

### 3단계: GitHub Secrets 설정

1. GitHub 저장소 → Settings → Secrets → New repository secret
2. Name: `FIREBASE_TOKEN`
3. Value: [복사한 토큰]

### 4단계: GitHub Actions 워크플로우 생성

`.github/workflows/firebase-hosting.yml` 파일 생성:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_TOKEN }}'
          channelId: live
          projectId: your-project-id
```

이제 `main` 브랜치에 푸시하면 자동으로 배포됩니다! 🎉

---

## 📝 유용한 명령어 모음

```bash
# 로그인/로그아웃
firebase login
firebase logout

# 프로젝트 목록 확인
firebase projects:list

# 현재 프로젝트 확인
firebase use

# 프로젝트 전환
firebase use another-project

# 배포 취소 (롤백)
firebase hosting:clone source:destination

# 로그 확인
firebase hosting:channel:open preview
```

---

## ✅ 배포 체크리스트

배포 전 확인사항:

- [ ] `npm run build` 실행 성공
- [ ] `dist/` 폴더 생성 확인
- [ ] `firebase.json` 설정 확인
- [ ] `.firebaserc`에 프로젝트 ID 설정
- [ ] Firebase 로그인 완료
- [ ] `firebase deploy` 실행
- [ ] 배포된 URL에서 정상 작동 확인
- [ ] 모바일에서도 테스트

---

## 🎓 다음 단계

1. **커스텀 도메인 연결**
2. **Analytics 설정으로 방문자 추적**
3. **GitHub Actions로 자동 배포**
4. **성능 모니터링 설정**

---

## 📞 도움말

- [Firebase Hosting 문서](https://firebase.google.com/docs/hosting)
- [Firebase CLI 레퍼런스](https://firebase.google.com/docs/cli)
- [Firebase 커뮤니티](https://firebase.google.com/community)

---

**Firebase로 세계에 공개! 🌍🔥**

배포 URL을 친구들에게 공유하세요!
