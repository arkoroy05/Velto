/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for MCP
  experimental: {
    serverComponentsExternalPackages: ['@modelcontextprotocol/sdk'],
  },
  
  // Output configuration for Vercel
  output: 'standalone',
  
  // Environment variables that should be available on the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Webpack configuration for MCP packages
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@modelcontextprotocol/sdk')
    }
    return config
  },
  
  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/mcp/:path*',
        destination: '/api/mcp/[...path]',
      },
    ]
  },
}

module.exports = nextConfig
