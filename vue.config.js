module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.134.48.65:9595',
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}