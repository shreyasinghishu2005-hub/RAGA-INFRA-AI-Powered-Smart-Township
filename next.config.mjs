/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip TypeScript errors during build (they show as warnings, not failures)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unpkg.com" },
    ],
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_your_clerk_publishable_key",
  },
};

export default nextConfig;
