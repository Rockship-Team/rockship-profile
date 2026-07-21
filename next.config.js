/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,

  // Image optimization configuration
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Optimize package imports for better tree-shaking
  experimental: {
    // TypeScript 7 ships the Go compiler and dropped lib/typescript.js, the JS
    // Compiler API that Next's default type-check backend calls into. Without
    // this flag Next concludes TypeScript is not installed, shells out to
    // `npm install` (in a Bun repo) and then crashes. This runs the local `tsc`
    // CLI instead. Requires Next >= 16.3 — see vercel/next.js#95639.
    useTypeScriptCli: true,

    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-slot',
    ],
  },

  // Turbopack configuration for Next.js 16
  turbopack: {
    root: process.cwd(),
  },

  // Bundle analyzer configuration (only used with --webpack flag)
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer ? '../analyze-server.html' : './analyze-client.html',
          openAnalyzer: false,
        })
      );
    }

    return config;
  },
}

export default nextConfig