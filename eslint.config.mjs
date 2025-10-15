// eslint.config.mjs에 규칙 추가
import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      perfectionist: perfectionist,
    },
    rules: {
      'no-unused-vars': 'off', // JS용 기본 비활성화
      // export 정렬
      'simple-import-sort/exports': 'warn',
      // import 정렬
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // CSS imports
            ['\\.css$'],
            // Next.js (일반 import)
            ['^next(?!.*type)'],
            // Next.js (type import)
            ['^next.*\\u0000$'],
            // React (일반 import)
            ['^react(?!.*type)'],
            // React (type import)
            ['^react.*\\u0000$'],
            // 서드파티 (외부 라이브러리)
            ['^@?\\w'],
            // 로컬 파일 (@/ 경로)
            ['^@/'],
            // 상대 경로
            ['^\\.'],
          ],
        },
      ],
      // JSX 속성 정렬
      'perfectionist/sort-jsx-props': [
        'warn',
        {
          type: 'alphabetical',
          order: 'asc',
          groups: ['key', 'ref', 'id', 'className', 'style', 'unknown', 'callback'],
          customGroups: {
            key: 'key',
            ref: 'ref',
            id: 'id',
            className: 'className',
            style: 'style',
            callback: '^on[A-Z].*',
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default eslintConfig;
