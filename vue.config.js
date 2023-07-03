module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.135.0.107:9595',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                ws: true,
            },
            '/flask': {
                target: 'http://10.135.0.107:5000',
                pathRewrite: {
                    '^/flask': ''
                },
                changeOrigin: true,
                ws: true,
            },
            '/node': {
                target: 'http://localhost:8080',
                pathRewrite: {
                    '^/node': ''
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