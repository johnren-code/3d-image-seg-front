module.exports = {
    devServer: {
        proxy: {
            '': {
                target: 'http://10.134.48.5:9595',
                pathRewrite: {
                    // '^/api': ''
                },
                changeOrigin: true,
                ws: true,
            }
        }
    }
}