/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
          protocol: "https",
          hostname: "rockneatdb.pockethost.io",
          port: "",
          pathname: "/**"
        }]
    },
    reactStrictMode: false,
}

module.exports = nextConfig