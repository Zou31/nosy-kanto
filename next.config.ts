
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "jzcqenfqzxcaacsptydy.supabase.co",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/produit/5-gousse-vanilles-madagascar-18-20",
        destination:
          "/produit/5-gousses-vanille-madagascar-18-20-cm",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


