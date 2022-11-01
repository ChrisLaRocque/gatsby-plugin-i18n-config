exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: "/create-page",
    component: require.resolve("./src/templates/create-page.jsx"),
  });
  createPage({
    path: "/another-one",
    component: require.resolve("./src/templates/another-one.jsx"),
  });
};
