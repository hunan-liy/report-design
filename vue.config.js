// const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { NODE_ENV } = process.env;
module.exports = {
  // transpileDependencies: true,
  // lintOnSave: false,
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  chainWebpack: (config) => {
    config
      // 开发环境
      .when(
        NODE_ENV === "development",
        // sourcemap不包含列信息
        (config) => config.devtool("cheap-source-map")
      )
      // 非开发环境
      .when(NODE_ENV !== "development", (config) => {
        config.optimization.minimizer("terser").tap((args) => {
          let { terserOptions } = args[0];
          let { compress } = terserOptions || {};

          args[0].terserOptions.compress = {
            ...compress,
            drop_console: true, // 注释console.*
            drop_debugger: true, // remove debugger
            pure_funcs: ["console.log"], // 移除 console.log
          };
          args[0].sourceMap = false;

          return args;
        });
      });

    config.resolve.alias
      .set("@", path.resolve("examples"))
      .set("@packages", path.resolve("packages"));
    config.module
      .rule("js")
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        return options;
      });
  },
};
