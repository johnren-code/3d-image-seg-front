module.exports = {
    devServer: {
        proxy: {
            '': {
                target: 'http://10.134.49.33:9595',
                pathRewrite: {
                    '': ''
                },
                changeOrigin: true,
                ws: true,
            },
        }
    }
}