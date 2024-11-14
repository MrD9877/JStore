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
