/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "downloads.ctfassets.net",
      "images.ctfassets.net",
      "lh3.googleusercontent.com",
      "lh5.googleusercontent.com",
      "assets.website-files.com",
      "storage.googleapis.com",
      "assets.website-files.com",
      "abs.twimg.com"
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
}
