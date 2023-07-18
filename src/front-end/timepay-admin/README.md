# 타임페이 커뮤니티 관리자 사이트

## 프로젝트 스크립트

### 로컬 실행

```shell  
 yarn install  
 yarn start
```

### 빌드

```shell
yarn build
```

## 프로젝트 구조

timepay-admin    
┣ node_modules    
┣ public     
┣ src  
┃ ┣ api  
┃ ┃ ┣ hooks // react-query hooks  
┃ ┃ ┗ interfaces // types  
┃ ┣ assets    
┃ ┃ ┗ images    
┃ ┃   ┗ icons  // images  
┃ ┣ components  
┃ ┣ hooks // custom hooks  
┃ ┣ pages  
┃ ┣ states // recoil states  
┃ ┣ styles  
┃ ┃ ┣ fonts // 프리텐다드 글꼴, 스타일, 라이센스 파일  
┃ ┃ ┗ constants // 전역적인 스타일 상수(color, theme)  
┃ ┣ utils // 유용한 함수, 상수 모음  
┃ ┣ App.css  
┃ ┣ App.test.tsx  
┃ ┣ App.tsx  
┃ ┣ index.css  
┃ ┣ index.tsx  
┃ ┣ react-app-env.d.ts  
┃ ┣ reportWebVitals.ts  
┃ ┗ setupTests.ts  
┣ .gitignore  
┣ package.json  
┣ README.md  
┣ tsconfig.json  
┗ yarn.lock
