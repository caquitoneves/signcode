/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@signcode/ui'],
  // Lint roda como passo próprio (turbo run lint), não durante o build.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
