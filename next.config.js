/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig