const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/main.scss";`,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/simple-twitter/" : "/",
};
