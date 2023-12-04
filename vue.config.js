// const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = ({
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        allowedHosts: "all",
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
