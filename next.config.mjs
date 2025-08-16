/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.w3.org", "j-shop.s3.eu-north-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "j-shop.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
