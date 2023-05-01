/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['jain5379.pythonanywhere.com'],
  },
};

const nextConfig = {
  images: {
    domains: [
      'source.unsplash.com',
      'i.picsum.photos',
      'picsum.photos',
      's3.ap-northeast-2.amazonaws.com',
      'jain5379.pythonanywhere.com',
    ],
  },
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });
    return config;
  },
};

module.exports = {
  transpilePackages: ['react-ridge-state'],
  ...nextConfig,
};
