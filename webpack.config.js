const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    devServer: {
        static: './dist/',
        // compress: true,
        // inline: true,
        // publicPath: '/dist/',
        open: true
	},
    resolve: {
        extensions: ['.ts', '.js']
    }
}