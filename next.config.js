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
  images: {
    domains: ["upload.wikimedia.org", "raw.githubusercontent.com"],
    loader: "default",
  },
};

module.exports = nextConfig;
