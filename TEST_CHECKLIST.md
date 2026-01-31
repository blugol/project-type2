# 🔍 프로젝트 디버깅 체크리스트

## ✅ 확인 완료 항목

### 1. 파일 구조
- ✅ `/index.html` - HTML 엔트리 포인트 존재
- ✅ `/src/main.tsx` - React 시작점 존재
- ✅ `/src/app/App.tsx` - 메인 컴포넌트 존재
- ✅ `/package.json` - 의존성 및 스크립트 설정 완료
- ✅ `/tsconfig.json` - TypeScript 설정 완료
- ✅ `/vite.config.ts` - Vite 빌드 설정 완료

### 2. 데이터 파일
- ✅ `/src/app/data/uploaded/events.json` - 경제 일정 데이터 존재
- ✅ `/src/app/data/uploaded/stocks2.json` - 종목 데이터 (시가총액 포함) 존재
- ✅ `/src/app/data/indicatorGuides.ts` - 경제 지표 가이드 존재
- ✅ `/src/app/data/dataLoader.ts` - 데이터 로더 구현 완료

### 3. 주요 컴포넌트
- ✅ `StockCalendar.tsx` - 캘린더 컴포넌트
- ✅ `RelatedStocksSection.tsx` - 관련 종목 섹션
- ✅ `EventDetailSidebar.tsx` - 일정 상세 사이드바

### 4. 스타일
- ✅ `/src/styles/index.css` - 메인 스타일 파일
- ✅ `/src/styles/tailwind.css` - Tailwind CSS
- ✅ `/src/styles/theme.css` - 테마 설정

### 5. 설정 파일
- ✅ `.gitignore` - Git 무시 파일
- ✅ `.prettierrc` - 코드 포맷팅
- ✅ `firebase.json` - Firebase 설정
- ✅ `.vscode/settings.json` - VS Code/Cursor 설정

## 🧪 테스트 방법

### 로컬 실행 테스트

```bash
# 1. 의존성 설치
npm install
npm install react@18.3.1 react-dom@18.3.1

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:5173
```

### 예상 동작

1. **페이지 로드**
   - ✅ 헤더에 "경제일정 & 종목확인" 제목 표시
   - ✅ 다크모드 토글 버튼 (달/태양 아이콘)
   - ✅ 월별 캘린더 표시

2. **캘린더 기능**
   - ✅ 이전/다음 달 네비게이션 버튼 작동
   - ✅ 오늘 날짜 하이라이트
   - ✅ 일정이 있는 날짜에 배지 표시
   - ✅ 일정 클릭 시 상세 정보 표시

3. **일정 상세 정보**
   - ✅ 국가, 중요도, 카테고리 배지 표시
   - ✅ 전월 실적, 시장 예상, 실제 발표 수치
   - ✅ 괴리율 계산 및 색상 표시
   - ✅ 지표 기준치 가이드 (PMI, CPI 등)

4. **관련 종목**
   - ✅ 대장주/중견기업/소기업 분류
   - ✅ 각 티어별 토글 기능
   - ✅ 종목 카드 클릭으로 클립보드 복사
   - ✅ 복사 성공 토스트 메시지

5. **다크모드**
   - ✅ 라이트/다크 모드 전환
   - ✅ 모든 컴포넌트에서 테마 일관성
   - ✅ 로컬 스토리지에 설정 저장

## 🐛 잠재적 문제점 및 해결 방법

### 1. 포트 충돌
**증상**: "Port 5173 is already in use"
**해결**:
```bash
npm run dev -- --port 3000
```

### 2. 모듈을 찾을 수 없음
**증상**: "Cannot find module '@/app/...'"
**해결**:
```bash
rm -rf node_modules
npm install
```

### 3. TypeScript 오류
**증상**: 빨간 줄 많이 표시
**해결**:
- VS Code: Ctrl/Cmd + Shift + P → "TypeScript: Restart TS Server"
- 파일이 정상이면 실행에는 문제 없음

### 4. 스타일이 적용되지 않음
**증상**: 페이지가 하얗게 표시됨
**해결**:
```bash
rm -rf node_modules/.vite
npm run dev
```

### 5. 데이터가 표시되지 않음
**증상**: 캘린더에 일정이 없음
**해결**:
- 브라우저 콘솔(F12) 확인
- "✅ 실제 데이터 로드 완료" 메시지 확인
- events.json 파일 경로 확인

## 🔧 디버깅 방법

### 브라우저 콘솔 확인

1. 브라우저에서 F12 키 누르기
2. Console 탭 선택
3. 다음 메시지 확인:
   - "✅ 실제 데이터 로드 완료: X개의 일정"
   - "📅 오늘의 일정 자동 선택: ..."

### 네트워크 탭 확인

1. F12 → Network 탭
2. 페이지 새로고침 (F5)
3. 파일 로딩 확인:
   - `events.json` 로드 성공 (200 OK)
   - `stocks2.json` 로드 성공 (200 OK)

### React DevTools 사용

1. Chrome/Edge: [React DevTools 확장 설치](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
2. F12 → Components 탭
3. App 컴포넌트 선택
4. State 확인:
   - `events` 배열에 데이터 존재
   - `selectedEvent` 값 확인

## ✨ 정상 작동 확인 사항

### 체크리스트

- [ ] 페이지가 정상적으로 로드됨
- [ ] 캘린더가 표시됨
- [ ] 일정을 클릭하면 상세 정보가 표시됨
- [ ] 관련 종목이 표시됨 (일정 선택 시)
- [ ] 종목을 클릭하면 클립보드에 복사됨
- [ ] 다크모드 토글이 작동함
- [ ] 이전/다음 달 버튼이 작동함
- [ ] 반응형 디자인이 작동함 (창 크기 조절)
- [ ] 콘솔에 오류가 없음

### 성능 확인

- [ ] 페이지 로딩 시간 < 2초
- [ ] 일정 클릭 반응 즉시
- [ ] 월 변경 애니메이션 부드러움
- [ ] 메모리 누수 없음

## 📊 데이터 구조 확인

### events.json 구조
```json
[
  {
    "date": "2026-01-02",
    "day": "금요일",
    "schedules": [
      {
        "time": "00:00",
        "currency": "USD",
        "event": "ISM 제조업구매자지수 (12월)",
        "value": "47.948.348.2"
      }
    ]
  }
]
```

### stocks2.json 구조
```json
[
  {
    "종목코드": "060310",
    "종목명": "3S",
    "시장구분": "KOSDAQ",
    "시가총액": 77731493600
  }
]
```

## 🚀 빌드 테스트

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 빌드 파일 확인
ls -lh dist/
```

예상 결과:
- `dist/index.html` 생성
- `dist/assets/` 폴더에 JS/CSS 파일
- 빌드 크기: 약 500KB - 2MB

## 📝 로그 메시지

### 정상 로그
```
✅ 실제 데이터 로드 완료: 45개의 일정
📅 오늘의 일정 자동 선택: 미국 비농업고용지수 (NFP)
```

### 경고 로그
```
⚠️ stocks2.json 로드 실패, stocks.json으로 대체
⚠️ 실제 데이터가 없어 샘플 데이터를 사용합니다.
```

### 오류 로그
```
⚠️ 일정 데이터 로드 중 오류: [오류 내용]
⚠️ 종목 데이터 로드 중 오류: [오류 내용]
```

## 🎯 최종 확인

모든 체크리스트 항목이 완료되면 프로젝트가 정상 작동하는 것입니다!

문제가 발생하면:
1. 브라우저 콘솔 확인
2. 네트워크 탭 확인
3. 해당 섹션의 해결 방법 시도
4. 그래도 안 되면 `node_modules` 삭제 후 재설치
