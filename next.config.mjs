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
};

export default nextConfig;
