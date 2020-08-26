// vue.config.js
module.exports = {
    devServer: {
      open:true,
      host:'localhost',
      port:8080,
      https:false,
      proxy: {
        '/apis': {
          target: 'https://oa1.youthol.tech/', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/apis': ''
          }
        }
      }
    },
    publicPath: "./",
    assetsDir: "static",
    outputDir: 'dist',
  }