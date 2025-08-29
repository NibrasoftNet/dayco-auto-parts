import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6001",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "http",
        hostname: "tecdoc.makingdatameaningful.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "auto-car-parts.s3.us-east-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "tecdoc2025.makingdatameaningful.com",
        pathname: "**",
      },
       {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "auto-car-parts.s3.us-east-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
