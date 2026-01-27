/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "/workspace",
      //   permanent: false,
      // },
    ];
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
