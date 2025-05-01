/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://4cvkcdpso9c4ux4t.public.blob.vercel-storage.com',
        pathname: '/**',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      new URL('https://4cvkcdpso9c4ux4t.public.blob.vercel-storage.com/**'),
    ],
  },
};
