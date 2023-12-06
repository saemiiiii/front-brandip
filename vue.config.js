// const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = ({
    transpileDependencies: [
        'vuetify'
    ],
    publicPath: "/",
    devServer: {
        allowedHosts: "all",
        compress: true,
        // disableHostCheck: true,
    },
    lintOnSave: false,
    configureWebpack: {
        plugins: [new NodePolyfillPlugin()],
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
    },
})
