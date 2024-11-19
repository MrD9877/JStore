/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: "http://localhost:3000"
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
    images: {
        domains: ['i.imgur.com', 'www.w3.org'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '',
            pathname: '/img/**'
        }],

        remotePatterns: [{
            protocol: 'https',
            hostname: 'i.imgur.com',
            port: '',
            pathname: '/**'
        }],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'api.escuelajs.co/',
            port: '',
            pathname: '/**'
        }],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'placeimg.com/',
            port: '',
            pathname: '/**'
        }],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'unsplash.com/',
            port: '',
            pathname: '/**'
        }],
        localPatterns: [
            {
                pathname: '../images/**',
                search: '',
            },
        ],
        localPatterns: [
            {
                pathname: '../_images/**',
                search: '',
            },
        ],
    }
};

export default nextConfig;
