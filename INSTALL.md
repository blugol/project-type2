# 🚀 빠른 설치 가이드 (Quick Install Guide)

## Windows 사용자

### 1단계: Node.js 설치

1. [Node.js 공식 웹사이트](https://nodejs.org/) 접속
2. "LTS" 버전 다운로드 (추천)
3. 다운로드한 설치 파일 실행
4. 모든 옵션 기본값으로 설치

### 2단계: 프로젝트 다운로드

```cmd
# ZIP 파일을 다운로드했다면
1. ZIP 파일 압축 해제
2. 폴더를 원하는 위치로 이동

# 또는 Git이 설치되어 있다면
git clone [repository-url]
cd [project-folder]
```

### 3단계: 명령 프롬프트(CMD) 열기

1. 프로젝트 폴더에서 `Shift + 오른쪽 클릭`
2. "여기에 PowerShell 창 열기" 선택

### 4단계: 설치 및 실행

```cmd
# 패키지 설치
npm install

# React 설치
npm install react@18.3.1 react-dom@18.3.1

# 개발 서버 실행
npm run dev
```

### 5단계: 브라우저에서 확인

브라우저를 열고 다음 주소로 이동:
```
http://localhost:5173
```

---

## macOS 사용자

### 1단계: Node.js 설치

#### Option A: 공식 설치 프로그램
1. [Node.js 공식 웹사이트](https://nodejs.org/) 접속
2. "LTS" 버전 다운로드
3. .pkg 파일 실행하여 설치

#### Option B: Homebrew 사용
```bash
# Homebrew가 없다면 먼저 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 설치
brew install node
```

### 2단계: 터미널 열기

1. `Command + Space` 눌러 Spotlight 열기
2. "터미널" 입력 후 실행

### 3단계: 프로젝트로 이동

```bash
# 프로젝트 폴더로 이동 (경로는 실제 위치에 맞게 수정)
cd ~/Downloads/your-project-folder
```

### 4단계: 설치 및 실행

```bash
# 패키지 설치
npm install

# React 설치
npm install react@18.3.1 react-dom@18.3.1

# 개발 서버 실행
npm run dev
```

### 5단계: 브라우저에서 확인

브라우저를 열고 다음 주소로 이동:
```
http://localhost:5173
```

---

## Linux 사용자

### 1단계: Node.js 설치

#### Ubuntu/Debian:
```bash
# 패키지 목록 업데이트
sudo apt update

# Node.js 설치
sudo apt install nodejs npm

# 버전 확인
node --version
npm --version
```

#### Fedora:
```bash
sudo dnf install nodejs npm
```

#### Arch Linux:
```bash
sudo pacman -S nodejs npm
```

### 2단계: 프로젝트로 이동

```bash
cd /path/to/your-project-folder
```

### 3단계: 설치 및 실행

```bash
# 패키지 설치
npm install

# React 설치
npm install react@18.3.1 react-dom@18.3.1

# 개발 서버 실행
npm run dev
```

### 4단계: 브라우저에서 확인

브라우저를 열고 다음 주소로 이동:
```
http://localhost:5173
```

---

## 🌐 브라우저에서만 실행하기 (정적 파일)

이미 빌드된 파일이 있다면 간단히 실행할 수 있습니다:

### Option 1: Python 사용 (대부분의 컴퓨터에 이미 설치되어 있음)

```bash
# 프로젝트의 dist 폴더로 이동
cd dist

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# 브라우저에서 http://localhost:8000 접속
```

### Option 2: VS Code의 Live Server 확장

1. VS Code 설치
2. Live Server 확장 설치
3. `index.html` 파일 우클릭
4. "Open with Live Server" 선택

### Option 3: serve 패키지 사용

```bash
# serve 설치 (한 번만)
npm install -g serve

# 실행
serve dist

# 브라우저에서 http://localhost:3000 접속
```

---

## ❓ 자주 묻는 질문 (FAQ)

### Q1: "npm을 찾을 수 없습니다" 오류가 나요

**답변**: Node.js가 제대로 설치되지 않았습니다.
- Windows: 컴퓨터를 재시작하고 다시 시도
- 환경 변수 PATH에 Node.js가 추가되었는지 확인

### Q2: 포트 5173이 이미 사용 중이라고 나와요

**답변**: 다른 포트를 사용하세요
```bash
npm run dev -- --port 3000
```

### Q3: 설치가 너무 느려요

**답변**: 
```bash
# 캐시 정리
npm cache clean --force

# 다시 설치
npm install
```

### Q4: "권한 없음" 오류가 나요

**답변**:
- Windows: 관리자 권한으로 CMD 실행
- Mac/Linux: `sudo npm install` 사용 (권장하지 않음)
- 더 나은 방법: nvm(Node Version Manager) 사용

### Q5: 빌드는 어떻게 하나요?

**답변**:
```bash
npm run build
```
빌드된 파일은 `dist/` 폴더에 생성됩니다.

---

## 📞 추가 도움말

여전히 문제가 있나요?

1. **README.md** 파일의 "문제 해결" 섹션 확인
2. `node_modules` 폴더를 삭제하고 다시 설치
3. Node.js를 최신 LTS 버전으로 재설치

---

## ✅ 설치 확인 체크리스트

- [ ] Node.js 설치 완료 (`node --version` 명령으로 확인)
- [ ] npm 설치 확인 (`npm --version` 명령으로 확인)
- [ ] 프로젝트 폴더로 이동
- [ ] `npm install` 실행 완료
- [ ] `npm install react@18.3.1 react-dom@18.3.1` 실행 완료
- [ ] `npm run dev` 실행 성공
- [ ] 브라우저에서 http://localhost:5173 접속 성공

모두 체크되었다면 설치 완료! 🎉
