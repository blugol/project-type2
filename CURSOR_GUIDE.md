# 🎯 Cursor에서 프로젝트 실행하기

Cursor는 VS Code 기반의 AI 코드 에디터입니다. 이 가이드는 Cursor에서 프로젝트를 여는 방법을 설명합니다.

---

## 🚀 빠른 시작

### 1단계: Cursor 설치

1. [Cursor 공식 웹사이트](https://cursor.sh/) 접속
2. "Download" 버튼 클릭
3. 운영체제에 맞는 버전 다운로드
4. 설치 프로그램 실행

### 2단계: 프로젝트 열기

```bash
# 방법 1: 터미널에서 프로젝트 폴더 열기
cursor .

# 방법 2: Cursor 앱에서
# File → Open Folder → 프로젝트 폴더 선택
```

### 3단계: 터미널에서 설치 및 실행

Cursor 내장 터미널 열기: `Ctrl + ~` (Mac: `Cmd + ~`)

```bash
# 1. Node.js 버전 확인 (18.0 이상 필요)
node --version

# 2. 패키지 설치
npm install

# 3. React 설치
npm install react@18.3.1 react-dom@18.3.1

# 4. 개발 서버 실행
npm run dev
```

### 4단계: 브라우저에서 확인

터미널에 표시된 주소 클릭 또는 브라우저에서 다음 주소 입력:
```
http://localhost:5173
```

---

## 🤖 Cursor AI 기능 활용하기

### 1. AI Chat (Ctrl/Cmd + L)

프로젝트에 대해 AI에게 질문하세요:

```
예시 질문:
- "이 프로젝트의 구조를 설명해줘"
- "StockCalendar 컴포넌트는 어떻게 작동하나요?"
- "새로운 경제 지표를 추가하려면 어떻게 해야 하나요?"
- "다크모드는 어떻게 구현되어 있나요?"
```

### 2. AI Edit (Ctrl/Cmd + K)

코드를 선택하고 AI에게 수정 요청:

```
예시 요청:
- "이 컴포넌트에 로딩 상태 추가해줘"
- "이 함수를 TypeScript로 변환해줘"
- "이 부분을 더 효율적으로 리팩토링해줘"
```

### 3. AI Autocomplete

코드를 작성하면 자동으로 AI가 제안합니다.

---

## 📁 프로젝트 구조 탐색

Cursor 사이드바에서 다음 파일들을 확인하세요:

```
📂 주요 파일 위치
├── src/app/App.tsx                    # 메인 앱
├── src/app/components/
│   ├── StockCalendar.tsx             # 캘린더
│   ├── RelatedStocksSection.tsx      # 종목 정보
│   └── EventDetailSidebar.tsx        # 상세 정보
├── src/app/data/
│   ├── uploaded/events.json          # 경제 일정 데이터
│   ├── uploaded/stocks2.json         # 종목 데이터
│   └── indicatorGuides.ts            # 지표 기준치
└── src/styles/                        # 스타일 파일
```

---

## 🎨 추천 확장 프로그램

Cursor를 열면 자동으로 추천 확장 프로그램이 표시됩니다:

1. **Tailwind CSS IntelliSense** - Tailwind 자동완성
2. **ES7+ React/Redux/React-Native snippets** - React 스니펫
3. **Prettier** - 코드 포맷팅
4. **ESLint** - 코드 린팅

설치 방법: 우측 하단 알림 → "Install All" 클릭

---

## 🛠️ 유용한 단축키

| 기능 | Windows/Linux | Mac |
|------|---------------|-----|
| AI Chat | `Ctrl + L` | `Cmd + L` |
| AI Edit | `Ctrl + K` | `Cmd + K` |
| 터미널 열기 | `Ctrl + ~` | `Cmd + ~` |
| 파일 찾기 | `Ctrl + P` | `Cmd + P` |
| 전체 검색 | `Ctrl + Shift + F` | `Cmd + Shift + F` |
| 명령 팔레트 | `Ctrl + Shift + P` | `Cmd + Shift + P` |

---

## 📝 데이터 수정하기

### 경제 일정 추가/수정

1. `src/app/data/uploaded/events.json` 열기
2. AI에게 요청: "여기에 새로운 경제 일정을 추가해줘"
3. 또는 직접 JSON 형식으로 추가

### 종목 데이터 추가/수정

1. `src/app/data/uploaded/stocks2.json` 열기
2. AI에게 요청: "새로운 종목을 추가해줘"
3. 시가총액(marketCap) 값 확인:
   - 대형주: 2,000,000,000,000 이상
   - 중형주: 500,000,000,000 ~ 2,000,000,000,000
   - 소형주: 500,000,000,000 미만

---

## 🔧 문제 해결

### 1. TypeScript 오류가 많이 표시됨

```bash
# TypeScript 재시작
Ctrl/Cmd + Shift + P → "TypeScript: Restart TS Server"
```

### 2. 자동완성이 작동하지 않음

```bash
# Cursor 재시작
Ctrl/Cmd + Shift + P → "Reload Window"
```

### 3. 포트 충돌

```bash
# 다른 포트 사용
npm run dev -- --port 3000
```

### 4. 모듈을 찾을 수 없음

```bash
# node_modules 재설치
rm -rf node_modules
npm install
```

---

## 🎯 AI로 코드 수정 예시

### 예시 1: 새로운 기능 추가

1. `App.tsx` 열기
2. `Ctrl/Cmd + K` 누르기
3. 요청: "검색 기능 추가해줘"

### 예시 2: 버그 수정

1. 문제가 있는 코드 선택
2. `Ctrl/Cmd + L` 누르기
3. 질문: "이 코드에 버그가 있나요?"

### 예시 3: 리팩토링

1. 컴포넌트 파일 열기
2. `Ctrl/Cmd + K` 누르기
3. 요청: "이 컴포넌트를 더 작은 컴포넌트로 분리해줘"

---

## 🚀 프로덕션 빌드

### 빌드 실행

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

---

## 🌐 Git 연동 (선택사항)

### Git 초기화

```bash
git init
git add .
git commit -m "Initial commit"
```

### GitHub에 푸시

```bash
# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

Cursor는 Git을 자동으로 인식하며, 사이드바에서 변경사항을 확인할 수 있습니다.

---

## 💡 Cursor AI 활용 팁

### 1. 프로젝트 이해하기

```
@workspace 이 프로젝트의 전체 구조를 설명해줘
```

### 2. 특정 파일 수정

```
@파일명 이 파일에서 다크모드를 토글하는 부분을 찾아줘
```

### 3. 코드 생성

```
StockCalendar와 비슷한 새로운 컴포넌트를 만들어줘
```

### 4. 디버깅

```
콘솔에 이런 에러가 나는데 어떻게 해결하나요?
[에러 메시지 붙여넣기]
```

---

## 📚 추가 학습 자료

- [Cursor 공식 문서](https://cursor.sh/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com)
- [Vite 문서](https://vitejs.dev)

---

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Cursor 설치 완료
- [ ] 프로젝트 폴더 열기 완료
- [ ] `npm install` 실행 완료
- [ ] `npm run dev` 실행 성공
- [ ] 브라우저에서 http://localhost:5173 접속 성공
- [ ] 추천 확장 프로그램 설치 완료
- [ ] AI Chat 기능 테스트 완료

모두 체크되었다면 준비 완료! 🎉

---

**Cursor에서 개발 시작! AI와 함께 더 빠르게 코딩하세요! 🚀**
