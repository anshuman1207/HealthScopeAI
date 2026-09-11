/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const SERVER_MAIN_URL = process.env.SERVER_MAIN_URL || 'http://localhost:5000'
    const SERVER_ML_URL = process.env.SERVER_ML_URL || 'http://localhost:8000'
    const SERVER_BOT_URL = process.env.SERVER_BOT_URL || 'http://localhost:5002'

    return [
      {
        source: '/api/analyze-symptoms',
        destination: `${SERVER_ML_URL}/analyze-symptoms`,
      },
      {
        source: '/api/medical-query',
        destination: `${SERVER_BOT_URL}/api/medical-query`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${SERVER_MAIN_URL}/api/auth/:path*`,
      },
      {
        source: '/api/reports/:path*',
        destination: `${SERVER_MAIN_URL}/api/reports/:path*`,
      },
      {
        source: '/api/doctors/urgent-cases',
        destination: `${SERVER_MAIN_URL}/api/doctors/urgent-cases`,
      },
      {
        source: '/api/doctors/me',
        destination: `${SERVER_MAIN_URL}/api/doctors/me`,
      },
      {
        source: '/api/doctors/register-profile',
        destination: `${SERVER_MAIN_URL}/api/doctors/register-profile`,
      },
      {
        source: '/api/doctors/appointments',
        destination: `${SERVER_MAIN_URL}/api/doctors/appointments`,
      },
      {
        source: '/api/appointments/:path*',
        destination: `${SERVER_MAIN_URL}/api/appointments/:path*`,
      },
    ]
  },
}

export default nextConfig
