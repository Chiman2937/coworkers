# 프로젝트 개요

[[🔗 Storybook]](https://68f03b585d2182dc0ca9a472-ftcqayhygx.chromatic.com/)

# My App

Next.js 프로젝트 기본 세팅

## 주요 기능

### 프레임워크 & 라이브러리

- **Next.js 15** - React 프레임워크 (Turbopack 지원)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 스타일링

### 개발 도구

- **ESLint** - 코드 품질 검사 및 자동 수정
  - Import 자동 정렬 지원 (simple-import-sort)
  - JSX 속성 자동 정렬 지원 (perfectionist)
  - Next.js 규칙 검사
- **Prettier** - 코드 포매팅
  - Tailwind CSS 클래스 정렬 지원
- **Husky + lint-staged** - Git hooks를 통한 커밋 전 자동 검사

### API & 상태 관리

- **TanStack Query (React Query)** - 서버 상태 관리 및 데이터 페칭
  - DevTools 포함
- **Orval** - OpenAPI/Swagger를 통한 API 클라이언트 자동 생성

### 테스트 & 개발

- **Jest** - JavaScript 테스트 프레임워크
  - React Testing Library 포함
  - jsdom 환경 지원
- **Storybook** - UI 컴포넌트 개발 및 문서화
- **MSW (Mock Service Worker)** - API 모킹

### 유틸리티

- **@faker-js/faker** - 테스트 데이터 생성
- **@svgr/webpack** - SVG를 React 컴포넌트로 변환

## 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# Storybook 실행
npm run storybook

# Storybook 빌드
npm run build-storybook
```

## 참고

프로젝트 세팅은 [Project Setup Guide](https://github.com/Chiman2937/Project-Setup-Guide/tree/main)를 기반으로 생성했습니다.
