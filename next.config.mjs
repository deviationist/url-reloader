/** @type {import('next').NextConfig} */
const nextConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["https://anjunabeats.us1.list-manage.com"],
      // ...
    },
  }
};

export default nextConfig;
