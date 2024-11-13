/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '',
            pathname: '/img/**'
        }],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'i.imgur.com/',
            port: '',
            pathname: '/**'
        }],
        localPatterns: [
            {
                pathname: '../images/**',
                search: '',
            },
        ],
    }
};

export default nextConfig;
