import { defineConfig } from 'orval';

export default defineConfig({
  coworkers: {
    input: {
      // swagger ui의 json 경로 직접 지정
      // or 로컬 json 경로 지정
      target: './openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/endpoints/', // src/api/endpoints 폴더에 api 함수들 저장
      schemas: './src/api/models', // src/api/models 폴더에 요청,응답 type 저장
      client: 'react-query', //react-query 사용 지정
      mock: true, //msw를 이용한 mock data 생성 여부
      prettier: true,
      override: {
        mutator: {
          //custom fetch wrapper 경로 지정(axios 사용가능)
          path: './src/api/httpClient.ts',
          name: 'httpClient',
        },
        query: {
          useSuspenseQuery: true,
          usePrefetch: true,
        },
        operations: {
          ListArticles: {
            query: {
              useSuspenseInfiniteQuery: true,
              useInfiniteQueryParam: 'page',
            },
          },
          ListArticleComments: {
            query: {
              useSuspenseInfiniteQuery: true,
              useInfiniteQueryParam: 'cursor',
            },
          },
        },
      },
    },
  },
});
