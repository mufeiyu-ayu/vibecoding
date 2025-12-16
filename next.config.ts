import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingExcludes: {
    '*': ['**contentlayer**'],
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

export default withContentlayer(nextConfig)
