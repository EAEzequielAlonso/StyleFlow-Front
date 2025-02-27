/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "rightpeoplegroup.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
};