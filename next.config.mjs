/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "running4life-public.s3.ap-southeast-2.amazonaws.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
