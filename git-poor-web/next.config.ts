import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // 깃허브 이미지 도메인 허용
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
