/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
        pathname: "/v1/storage/buckets/**",
      },
    ],
  },
};

module.exports = nextConfig;
