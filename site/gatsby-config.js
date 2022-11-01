module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-i18n-config",
      options: {
        locales: ["en-US", "fr", "nl-NL"],
        defaultLocale: "en-US",
      },
    },
  ],
};
