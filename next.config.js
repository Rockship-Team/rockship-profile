/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,

  // Emit a self-contained server bundle in .next/standalone for the Docker
  // image — scripts/deploy.sh expects .next/standalone/server.js.
  //
  // Not on Vercel. Vercel's builder does its own output file tracing and
  // patches the config ("Applying modifyConfig from Vercel"); standalone is
  // both unnecessary and unsupported there, and its interaction with that
  // patching is what leaves onBuildComplete unable to open
  // .next/next-server.js.nft.json. VERCEL=1 is set in Vercel build envs.
  output: process.env.VERCEL ? undefined : 'standalone',

  // Image optimization configuration
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // The previous rockship.co lived at a different set of URLs, and Google still
  // serves them: /blogs (the "Knowledge Hub"), /blogs/<Title>-<hash> articles,
  // /talents and /talent-as-a-service. Every one of them 404s on this site,
  // which is where the "404: This page could not be found." pageviews in GA4
  // come from. The old article slugs have no counterpart here, so the whole
  // /blogs tree lands on the blog index rather than a specific post.
  async redirects() {
    return [
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/blogs/:path*', destination: '/blog', permanent: true },
      { source: '/knowledge-hub', destination: '/blog', permanent: true },
      { source: '/talents', destination: '/#services', permanent: true },
      { source: '/talent-as-a-service', destination: '/#services', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/about-us', destination: '/#team', permanent: true },
    ]
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