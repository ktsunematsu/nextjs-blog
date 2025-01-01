/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // クライアントサイドのビルド時にNode.jsモジュールを空オブジェクトとして扱う
            config.resolve.fallback = {
                fs: false,
                path: false,
                util: false,
            };
        }
        return config;
    },
};

module.exports = nextConfig; 