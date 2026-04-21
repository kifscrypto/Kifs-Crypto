/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  redirects: async () => {
    return [
      // Category redirects (with and without trailing slash)
      {
        source: '/category/trading',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/trading/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/cryptocurrency-reviews',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/cryptocurrency-reviews/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/education',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/education/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/giveaways',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/giveaways/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/news',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/news/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/best-crypto-deals',
        destination: '/the-best-deals-for-crypto',
        permanent: true,
      },
      {
        source: '/category/best-crypto-deals/',
        destination: '/the-best-deals-for-crypto',
        permanent: true,
      },
      // Tag redirects (with and without trailing slash)
      {
        source: '/tag/crypto-exchange',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/crypto-exchange/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/trading-indicators',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/trading-indicators/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/best-us-crypto-exchanges',
        destination: '/the-top-5-crypto-exchanges-for-us-residents-pros-cons-and-benefits',
        permanent: true,
      },
      {
        source: '/tag/best-us-crypto-exchanges/',
        destination: '/the-top-5-crypto-exchanges-for-us-residents-pros-cons-and-benefits',
        permanent: true,
      },
      // Author and service redirects (with and without trailing slash)
      {
        source: '/author/admin',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/author/admin/',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/services/',
        destination: '/about-us',
        permanent: true,
      },
      // Catch-all category redirects
      {
        source: '/category/:slug',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/:slug/',
        destination: '/blog',
        permanent: true,
      },
      // Catch-all tag redirects
      {
        source: '/tag/:slug',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/:slug/',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

export default nextConfig


