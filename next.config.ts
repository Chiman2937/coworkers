// next.config.ts
import type { NextConfig } from 'next';

import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  images: {
    //이미지 경로는 사양에 맞게 수정하여 적용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    //imagesSizes, deviceSizes는 기본 설정
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
