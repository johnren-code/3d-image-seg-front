module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.135.1.120:9595',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                ws: true,
            },
            '/file': {
                target: 'http://localhost:8888',
                pathRewrite: {
                    '^/file': ''
                },
                changeOrigin: true,
                ws: true,
            }
        }
    }
}