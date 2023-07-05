module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://10.134.49.32:9595',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                ws: true,
            },
            '/flask': {
                target: 'http://10.134.49.32:5000',
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
            },
            '/text': {
                target: 'http://10.134.48.17:8080',
                pathRewrite: {
                    '^/text': ''
                },
                changeOrigin: true,
                ws: true,
            }
        }
    }
}