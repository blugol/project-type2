# 📈 경제일정 & 종목확인 (Economic Calendar & Stock Tracker)

주식 경제 일정을 캘린더 형식으로 보여주고, 관련 종목 정보를 확인할 수 있는 웹 애플리케이션입니다.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178c6.svg)

> 🎯 **처음 시작하시나요?** [START_HERE.md](./START_HERE.md) 파일을 먼저 확인하세요!

---

## ✨ 주요 기능

### 📅 경제 일정 캘린더
- **월별 캘린더 뷰**: 경제 지표 발표 일정을 한눈에 확인
- **일정 클릭**: 일정을 클릭하면 상세 정보 표시
- **자동 선택**: 오늘 날짜의 일정 자동 선택

### 📊 경제 지표 상세 정보
- **수치 데이터**: 전월 실적, 시장 예상, 실제 발표, 괴리율
- **지표 기준치 가이드**: PMI, CPI, NFP, 실업률, 원유재고, GDP 등의 기준점과 해석 정보
- **해석 가이드**: 각 지표의 의미와 시장 영향 설명

### 📈 관련 종목 정보
- **시가총액 기준 자동 분류**:
  - 대형주 (2조원 이상)
  - 중형주 (5천억~2조원)
  - 소형주 (5천억원 미만)
- **토글 방식**: 각 그룹별로 펼쳐보기/접기 가능
- **종목 정보**: 종목명, 종목번호, 관���재료/업황/섹터
- **클립보드 복사**: 종목 정보를 클릭하여 복사

### 🎨 사용자 인터페이스
- **다크모드/라이트모드**: 전체 애플리케이션에서 지원
- **통일된 디자인**: Stone-400 톤의 차분한 회색 배경과 Gray-800 테두리
- **반응형 디자인**: 다양한 화면 크기에 대응

---

## 🚀 빠른 시작 (Quick Start)

### 1️⃣ 사전 요구사항

다음 프로그램이 설치되어 있어야 합니다:

- **Node.js**: v18.0.0 이상 ([다운로드](https://nodejs.org/))
- **npm** 또는 **pnpm** (Node.js 설치 시 npm은 자동 설치됨)

### 2️⃣ 설치 방법

#### Option A: npm 사용

```bash
# 1. 프로젝트 폴더로 이동
cd your-project-folder

# 2. 의존성 패키지 설치
npm install

# 3. React와 React-DOM 설치 (peer dependencies)
npm install react@18.3.1 react-dom@18.3.1

# 4. 개발 서버 실행
npm run dev
```

#### Option B: pnpm 사용 (권장)

```bash
# 1. pnpm 설치 (처음 한 번만)
npm install -g pnpm

# 2. 프로젝트 폴더로 이동
cd your-project-folder

# 3. 의존성 패키지 설치
pnpm install

# 4. React와 React-DOM 설치
pnpm add react@18.3.1 react-dom@18.3.1

# 5. 개발 서버 실행
pnpm run dev
```

### 3️⃣ 브라우저에서 확인

개발 서버가 실행되면 브라우저에서 다음 주소로 접속하세요:

```
http://localhost:5173
```

---

## 📁 프로젝트 구조

```
project-root/
├── src/
│   ├── app/
│   │   ├── components/          # React 컴포넌트
│   │   │   ├── StockCalendar.tsx          # 캘린더 컴포넌트
│   │   │   ├── RelatedStocksSection.tsx   # 관련 종목 섹션
│   │   │   ├── EventDetailSidebar.tsx     # 일정 상세 사이드바
│   │   │   └── ui/                        # UI 컴포넌트 라이브러리
│   │   ├── data/                # 데이터 관리
│   │   │   ├── uploaded/
│   │   │   │   ├── events.json           # 경제 일정 데이터
│   │   │   │   └── stocks2.json          # 종목 데이터 (시가총액 포함)
│   │   │   ├── indicatorGuides.ts        # 경제 지표 기준치 정보
│   │   │   ├── dataLoader.ts             # 데이터 로더
│   │   │   ├── types.ts                  # TypeScript 타입 정의
│   │   │   └── mockData.ts               # 샘플 데이터
│   │   └── App.tsx              # 메인 애플리케이션
│   ├── styles/                  # 스타일 파일
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── vite-env.d.ts
├── package.json
├── vite.config.ts               # Vite 설정
└── README.md                    # 이 파일
```

---

## 🛠️ 데이터 커스터마이징

### 경제 일정 데이터 수정

`src/app/data/uploaded/events.json` 파일을 수정하세요:

```json
[
  {
    "id": "1",
    "title": "미국 비농업고용지수 (NFP)",
    "date": "2026-02-06T22:30:00",
    "country": "US",
    "category": "고용",
    "categoryColor": "#10b981",
    "importance": "high",
    "prev_value": 256,
    "forecast_value": 180,
    "actual_value": null,
    "unit": "천명",
    "description": "미국의 비농업 부문 고용 변화를 나타내는 지표",
    "tooltip": "NFP는 미국 노동 시장의 건강도를 측정하는 가장 중요한 지표",
    "base_guide": "예상치보다 높으면 경기 호조, 낮으면 경기 둔화 신호",
    "relatedStocks": ["stock1", "stock2"],
    "lastUpdated": "2026-01-31T00:00:00"
  }
]
```

### 종목 데이터 수정

`src/app/data/uploaded/stocks2.json` 파일을 수정하세요:

```json
{
  "stock1": {
    "name": "삼성전자",
    "code": "005930",
    "sector": "반도체",
    "marketCap": 500000000000000
  }
}
```

**시가총액(marketCap) 기준**:
- 대형주: 2,000,000,000,000 (2조원) 이상
- 중형주: 500,000,000,000 ~ 2,000,000,000,000 (5천억~2조원)
- 소형주: 500,000,000,000 (5천억원) 미만

### 경제 지표 기준치 추가

`src/app/data/indicatorGuides.ts` 파일에서 새로운 지표를 추가할 수 있습니다:

```typescript
export const indicatorGuides: Record<string, IndicatorGuide> = {
  'PMI': {
    name: 'PMI (제조업/서비스)',
    basePoint: '50.0',
    highInterpretation: '경기 확장 (호재)',
    lowInterpretation: '경기 위축 (악재)'
  },
  // 여기에 새로운 지표 추가
};
```

---

## 🎯 사용 방법

1. **캘린더에서 일정 선택**: 달력에서 원하는 날짜의 경제 일정을 클릭
2. **지표 정보 확인**: 상단 정보창에서 전월 실적, 시장 예상, 실제 발표, 괴리율, 기준치 확인
3. **관련 종목 확인**: 하단에서 대형주/중형주/소형주별로 관련 종목 확인
4. **종목 정보 복사**: 종목 카드를 클릭하여 정보를 클립보드에 복사
5. **다크모드 전환**: 우측 상단의 달/태양 아이콘으로 테마 변경

---

## 🔧 기술 스택

- **프레임워크**: React 18.3.1
- **빌드 도구**: Vite 6.3.5
- **스타일링**: Tailwind CSS 4.1.12
- **UI 컴포넌트**: Radix UI
- **아이콘**: Lucide React
- **알림**: Sonner (Toast)
- **타입 안정성**: TypeScript

---

## 📦 빌드 (프로덕션)

프로덕션용으로 빌드하려면:

```bash
# npm 사용
npm run build

# pnpm 사용
pnpm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 빌드 결과물 실행

```bash
# 1. 간단한 HTTP 서버 설치 (처음 한 번만)
npm install -g serve

# 2. 빌드 폴더 서버 실행
serve dist

# 3. 브라우저에서 http://localhost:3000 접속
```

---

## 🌐 배포 옵션

### Vercel (권장)

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

### Netlify

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 배포
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. `vite.config.ts`에 base 경로 추가:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

2. 빌드 후 `dist` 폴더를 GitHub Pages로 배포

---

## 🐛 문제 해결 (Troubleshooting)

### 1. 포트 5173이 이미 사용 중인 경우

```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

### 2. 의존성 설치 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

### 3. React 관련 오류

```bash
# React와 React-DOM 재설치
npm install react@18.3.1 react-dom@18.3.1
```

### 4. 캐시 문제

```bash
# 캐시 삭제
rm -rf node_modules/.vite
npm run dev
```

---

## 📝 주요 기능 상세

### 시가총액 기준 자동 분류

종목은 `stocks2.json`의 `marketCap` 필드 기준으로 자동 분류됩니다:

```typescript
// 대형주
marketCap >= 2,000,000,000,000 (2조원)

// 중형주
500,000,000,000 <= marketCap < 2,000,000,000,000

// 소형주
marketCap < 500,000,000,000 (5천억원)
```

### 경제 지표 가이드 시스템

각 경제 지표에 대해 다음 정보를 제공합니다:

- **기준점**: 지표의 평균치 또는 중립 수준
- **수치 높음**: Actual > 기준일 때의 경제적 의미
- **수치 낮음**: Actual < 기준일 때의 경제적 의미

현재 지원하는 지표:
- PMI (제조업/서비스)
- CPI (소비자물가)
- 비농업고용 (NFP)
- 실업률
- 원유재고
- GDP

---

## 📄 라이선스

이 프로젝트는 개인 및 상업적 용도로 자유롭게 사용 가능합니다.

---

## 🙏 도움말

문제가 발생하거나 질문이 있으신 경우:

1. `src/app/data/README.md` 파일 참조
2. GitHub Issues 생성
3. 프로젝트 문서 확인

---

## 📌 중요 참고사항

- 본 서비스는 투자 참고용이며, 실제 투자 결정에 대한 책임은 투자자 본인에게 있습니다.
- 경제 지표 데이터는 참고용이며, 실제 발표 수치와 다를 수 있습니다.
- 종목 정보는 투자 권유가 아닌 정보 제공 목적입니다.

---

**Made with ❤️ using React + Vite + Tailwind CSS**