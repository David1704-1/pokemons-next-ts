/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: "/",
        destination: "/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
