/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
};

export default nextConfig;
