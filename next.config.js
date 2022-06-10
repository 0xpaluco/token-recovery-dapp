/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*', "", 'tailwindui.com', "cdn.discordapp.com", "gateway.ipfs.io"],
  },
}

module.exports = nextConfig
