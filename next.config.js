const ReactComponentName = require("react-scan/react-component-name/webpack").default; 
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack: (config) => {
    config.plugins.push(ReactComponentName({})); 
    return config;
  },
});
