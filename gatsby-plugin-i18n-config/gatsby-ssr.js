exports.onRenderBody = ({ setHtmlAttributes, pathname }, pluginOptions) => {
  const potentialLocale = pathname.split("/")[1]; // first element will always be an empty string, our plugin specifically is only appending to the start of the path so index 1 is safe for the moment (maybe!)
  const isLocalePage = pluginOptions.locales.includes(potentialLocale);
  const lang = isLocalePage ? potentialLocale : pluginOptions.defaultLocale;
  setHtmlAttributes({ lang });
};
