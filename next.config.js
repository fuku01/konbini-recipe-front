/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Next.jsの場合は.envをここで読み込む必要がある
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  }
}

module.exports = nextConfig
