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

### `locales`

Required. Array of [UTS Locale Identifiers](https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers).

### `defaultLocale`

Optional. Locale to serve for the 'root' version of the page. Given `src/pages/blog.js` and the following options:

```javascript
{
  locales: ['en-US', 'fr-CA'],
  // defaultLocale: 'en-US'
}
```

This plugin would create a page at `/en-US/blog/` and `/fr-CA/blog/`. However if the defaultLocale was un-commented and therefore set to 'en-US', the paths for those pages would instead be `/blog/` (still showing en-US content), and `/fr-CA/blog/`. This is a slight variation from the Next.js i18n, where a defaultLocale is required and they suggest a middleware to achieve this behavior. Here we only match Next's behavior if the defaultLocale is provided.

## Usage

### Routing

This plugin will automatically create locale-specific versions of each page in your `src/pages` directory.

### Context

Each page created by this plugin gets passed the `locale` as context, making it usable in queries or as props in the page.

### HTML `lang` attribute

This plugin adds the appropriate `lang` attribute to your page's `<html>` tag.

## Todo for readme

- How to translate different content (local MD, CMS stuff)

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
