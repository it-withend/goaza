/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logos.context.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
