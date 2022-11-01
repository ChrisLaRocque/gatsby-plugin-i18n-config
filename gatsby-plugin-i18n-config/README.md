# Yes

This plugin is inspired heavily from the internationalization config options provided by Next.js. The hope is you pass it a relatively simple set of locale information, and the plugin will use the `src/pages` directory of your Gatsby site to create duplicates of those pages at locale-specific paths.

## Installation

```shell
npm install gatsby-plugin-i18n-config
```

then

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-18n-config`,
      options: {
        locales: ["en-US", "fr"],
        defaultLocale: "en-US",
      },
    },
  ],
};
```

In the above example, with a single page at `src/pages/index.jsx` the plugin would generate 2 pages, one at `yoursite.com/` and a second at `yoursite.com/fr/`.

## Options

### `defaultLocale`

If included, the `defaultLocale`

## Todo for readme

- How to translate different content (local MD, CMS stuff)
- Usage (defaults, )

## References + links

[Next.js internationalization implementation](https://nextjs.org/docs/advanced-features/i18n-routing)
Define an `i18n` object in `next.config.js` specifically with a `locales` array for all the locales available on a site.
Next's i18n guy does a few handy things:

- Takes the `pages` directory, keeps the pages in there and considers them the `defaultLocale` in `locales`, then creates duplicates prefixed with each locale. They call this 'Sub-path Routing' (maybe other folks do too, I just have only seen the term here so far!)
- Adds the `lang` attribute to the HTML
- Detects the user's preferred locale based on the `Accept-Language` header and redirects accordingly
- Does cross-domain locale-based redirects
- Adds locale info to their router
- Sets a cookie `NEXT_LOCALE`