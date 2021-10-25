let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/main.scss";'
            }
        }
    },
    configureWebpack: {
        plugins: [
          new HtmlWebpackPlugin({
            template: 'public/index.html',
            inlineSource: '.(js|css)$'
          }),
          new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
        ]
      }
};