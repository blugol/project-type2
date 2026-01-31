# 🌐 배포 가이드 (Deployment Guide)

프로젝트를 인터넷에 배포하여 누구나 접속할 수 있게 만드는 방법입니다.

---

## 🚀 Vercel로 배포 (가장 쉬움 ⭐ 추천)

### 장점
- 무료
- 자동 HTTPS
- GitHub 연동 시 자동 재배포
- 설정 거의 없음

### 방법 1: Vercel CLI 사용

```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. Vercel 로그인
vercel login

# 3. 프로젝트 배포
vercel

# 4. 프로덕션 배포
vercel --prod
```

### 방법 2: Vercel 웹사이트 사용

1. [vercel.com](https://vercel.com) 접속
2. GitHub/GitLab/Bitbucket 계정으로 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. "Deploy" 클릭
6. 완료! 자동으로 URL 생성됨

**설정 확인**:
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 📦 Netlify로 배포

### 장점
- 무료
- 드래그 앤 드롭으로 간편 배포
- 자동 HTTPS
- Form 처리 기능

### 방법 1: 드래그 앤 드롭

```bash
# 1. 프로젝트 빌드
npm run build

# 2. netlify.com 접속
# 3. "Sites" → "Add new site" → "Deploy manually"
# 4. dist 폴더를 드래그하여 업로드
```

### 방법 2: Netlify CLI

```bash
# 1. Netlify CLI 설치
npm install -g netlify-cli

# 2. 로그인
netlify login

# 3. 초기화
netlify init

# 4. 배포
netlify deploy --prod --dir=dist
```

### netlify.toml 설정 (선택사항)

프로젝트 루트에 `netlify.toml` 파일 생성:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🐙 GitHub Pages로 배포

### 장점
- GitHub 계정만 있으면 무료
- GitHub 저장소와 통합

### 단계별 가이드

#### 1. vite.config.ts 수정

```typescript
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages 배포를 위한 base 경로 추가
  base: '/your-repository-name/', // 저장소 이름으로 변경
  
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
```

#### 2. package.json에 스크립트 추가

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 3. gh-pages 패키지 설치

```bash
npm install --save-dev gh-pages
```

#### 4. 배포

```bash
npm run deploy
```

#### 5. GitHub 저장소 설정

1. GitHub 저장소 페이지 이동
2. Settings → Pages
3. Source: `gh-pages` 브랜치 선택
4. Save

---

## ☁️ AWS S3 + CloudFront로 배포

### 비용
- 소규모: 거의 무료 (AWS 프리티어)
- 중규모: 월 $1-5

### 단계

```bash
# 1. 빌드
npm run build

# 2. AWS CLI 설치 및 설정
aws configure

# 3. S3 버킷 생성
aws s3 mb s3://your-bucket-name

# 4. 정적 웹사이트 호스팅 활성화
aws s3 website s3://your-bucket-name --index-document index.html

# 5. 파일 업로드
aws s3 sync dist/ s3://your-bucket-name --acl public-read

# 6. CloudFront 배포 (HTTPS 및 CDN)
# AWS 콘솔에서 CloudFront 배포 생성
```

---

## 🔥 Firebase Hosting으로 배포

### 장점
- Google 제공
- 무료 SSL
- 빠른 CDN

### 단계

```bash
# 1. Firebase CLI 설치
npm install -g firebase-tools

# 2. Firebase 로그인
firebase login

# 3. 프로젝트 초기화
firebase init hosting

# 설정:
# - Public directory: dist
# - Single-page app: Yes
# - Set up automatic builds: No

# 4. 빌드
npm run build

# 5. 배포
firebase deploy
```

---

## 📊 비교표

| 서비스 | 무료 플랜 | 난이도 | 속도 | HTTPS | 커스텀 도메인 |
|--------|----------|--------|------|-------|---------------|
| **Vercel** | ✅ 충분 | ⭐ 매우 쉬움 | 🚀 빠름 | ✅ | ✅ |
| **Netlify** | ✅ 충분 | ⭐ 쉬움 | 🚀 빠름 | ✅ | ✅ |
| **GitHub Pages** | ✅ 무제한 | ⭐⭐ 보통 | 🐢 보통 | ✅ | ✅ |
| **Firebase** | ✅ 충분 | ⭐⭐ 보통 | 🚀 빠름 | ✅ | ✅ |
| **AWS S3** | ⚠️ 제한적 | ⭐⭐⭐ 어려움 | 🚀 빠름 | ⚠️ CloudFront 필요 | ✅ |

---

## 🔗 커스텀 도메인 연결

### Vercel

1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Domains
3. 도메인 입력 (예: yourdomain.com)
4. DNS 설정에 CNAME 레코드 추가

### Netlify

1. Netlify 대시보드 → Site Settings
2. Domain Management → Add custom domain
3. DNS 설정 업데이트

---

## 🛡️ 환경 변수 설정

### Vercel

```bash
# CLI로 설정
vercel env add

# 또는 Vercel 대시보드에서:
Settings → Environment Variables
```

### Netlify

```bash
# netlify.toml에 추가
[build.environment]
  NODE_ENV = "production"
```

---

## 📈 성능 최적화

### 빌드 최적화

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-tabs', '@radix-ui/react-dialog'],
        },
      },
    },
  },
})
```

### 이미지 최적화

- PNG/JPG → WebP 변환
- 이미지 압축 도구 사용 (TinyPNG)
- Lazy loading 적용

---

## 🔍 배포 확인

배포 후 다음 사항을 확인하세요:

- [ ] 사이트가 정상적으로 로드되는가?
- [ ] 모든 페이지가 작동하는가?
- [ ] 이미지가 제대로 표시되는가?
- [ ] API 호출이 정상적으로 작동하는가?
- [ ] HTTPS가 적용되어 있는가?
- [ ] 모바일에서도 잘 보이는가?

---

## ❓ 자주 묻는 질문

### Q: 배포 후 빈 화면만 나와요

**답변**: 
1. 브라우저 콘솔(F12) 확인
2. `vite.config.ts`의 `base` 경로 확인
3. 404 에러 → SPA 리다이렉트 설정 필요

### Q: 업데이트가 반영되지 않아요

**답변**:
1. 캐시 삭제 (Ctrl + Shift + R)
2. 빌드 다시 실행 (`npm run build`)
3. 재배포

### Q: 무료로 계속 사용할 수 있나요?

**답변**: 
- Vercel, Netlify: 개인 프로젝트는 무료
- GitHub Pages: 완전 무료
- Firebase: 소규모 트래픽은 무료

---

## 🎯 추천 배포 플랫폼

**초보자**: Vercel (드래그 앤 드롭 또는 GitHub 연동)  
**포트폴리오**: GitHub Pages  
**빠른 프로토타입**: Netlify  
**대규모 프로젝트**: AWS S3 + CloudFront  
**Google 생태계**: Firebase

---

**배포 성공하셨나요? 🎉 축하합니다!**
