// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
//   webpack: {
//     configure: (webpackConfig, { env }) => {
//       // 禁用文件名哈希值
//       webpackConfig.output.filename = "static/js/[name].js";
//       webpackConfig.output.chunkFilename = "static/js/[name].chunk.js";

//       // 禁用 CSS 文件名哈希值
//       const miniCssExtractPlugin = webpackConfig.plugins.find(
//         (plugin) => plugin instanceof MiniCssExtractPlugin
//       );
//       if (miniCssExtractPlugin) {
//         miniCssExtractPlugin.options.filename = "static/css/[name].css";
//         miniCssExtractPlugin.options.chunkFilename =
//           "static/css/[name].chunk.css";
//       }

//       return webpackConfig;
//     },
//   },
// };
