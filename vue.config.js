module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9595',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                ws: true,
            },
            '/flask': {
                target: 'http://127.0.0.1:5000',
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
            '/text': {
                target: 'http://10.134.48.12:8080',
                pathRewrite: {
                    '^/text': ''
                },
                changeOrigin: true,
                ws: true,
            },
            '/test': {
                target: 'http://10.134.48.247:8080',
                pathRewrite: {
                    '^/test': ''
                },
                changeOrigin: true,
                ws: true,
            }
        }
    }
}