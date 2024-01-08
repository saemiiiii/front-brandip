// const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = ({
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        allowedHosts: "all",
        client: {
            // webSocketURL: 'auto://0.0.0.0:0/wss'
            webSocketURL: 'auto://0.0.0.0:0/ws'
        },
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
