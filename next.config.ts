import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(!process.env.NEXT_PUBLIC_STATIC_EXPORT ? {async redirects(){return [{source:'/faq',destination:'/ratgeber',permanent:true}]}} : {}),
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === '1' ? {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
