/// <reference types="vite/client" />

// JSON 파일을 import할 수 있도록 타입 선언
declare module '*.json' {
  const value: any;
  export default value;
}
