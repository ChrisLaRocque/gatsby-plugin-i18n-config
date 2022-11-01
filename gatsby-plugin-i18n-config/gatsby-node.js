// node.pluginCreator.name to determine if FS or createPage. default-site-plugin = createPage, gatsby-plugin-page-creator = FS.
/**
 * Later todos:
 * 2. Allow delineation for pages made using `createPage` (do you want these pages locale-ified or not)
 * 3. Pass locale in some HOC or maybe just cookie?
 * 4. Create appropriate `createRedirects` for locales based on lang/country (would match Next's detection) - https://support.gatsbyjs.com/hc/en-us/articles/1500003051241-Working-with-Redirects-and-Rewrites
 * 5. Add alternate link tags to head of pages (x-default) - onPreRenderHTML or onRenderBody
 *
 */
exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    locales: Joi.array()
      .default(["en-US"])
      .description(`Array of UTS Locale Identifiers`),
    defaultLocale: Joi.string().description(`Locale for root pages`),
    createRedirects: Joi.boolean()
      .default(false)
      .description(`Create redirects based on user language.`),
  });
};
exports.onCreatePage = ({ page, actions }, pluginOptions) => {
  // Return early if page isn't from Filesystem or if we've already given it a locale
  if (
    page.path === "/404.html" ||
    !page.componentChunkName.includes("component---src-pages") || // The plugin option above is almost certainly the right way, but its not present in onCreatePage? Am I crazy? Anyway this will probably break!
    page.context.locale
  ) {
    return;
  }
  const { createPage, deletePage } = actions;
  for (let locale in pluginOptions.locales) {
    // If default locale, update context but don't modify path
    if (
      pluginOptions.defaultLocale &&
      pluginOptions.locales[locale] === pluginOptions.defaultLocale
    ) {
      deletePage(page);
      createPage({
        ...page,
        context: {
          ...page.context,
          locale: pluginOptions.locales[locale],
        },
      });
    } else {
      if (locale == 0) {
        // is this, in fact, our first rodeo?
        deletePage(page);
      }
      // Create net-new page at locale-specific path
      createPage({
        ...page,
        path: `/${pluginOptions.locales[locale]}${page.path}`,
        context: {
          ...page.context,
          locale: pluginOptions.locales[locale],
        },
      });
    }
  }
};
