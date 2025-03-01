/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Disable SWC
  experimental: {
    forceSwcTransforms: false // Prevent SWC from being used
  }
};

export default nextConfig;
