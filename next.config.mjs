import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    browserDebugInfoInTerminal: true,
    // mdxRs: false,
  },
  typescript: { ignoreBuildErrors: process.env.SKIP_TYPE_CHECK === "true" },
};

export default withMDX(nextConfig);
