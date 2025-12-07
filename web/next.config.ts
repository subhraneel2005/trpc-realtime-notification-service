/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pfps.gg",
      },
    ],
  },
};

export default nextConfig;
