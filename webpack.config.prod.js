const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'swc-loader',
                        options: {
                            env: { mode: 'usage' },
                            jsc: {
                                parser: {
                                    syntax: 'typescript',
                                    tsx: true,
                                    dynamicImport: true,
                                },
                                transform: {
                                    react: {
                                        runtime: 'automatic',
                                        refresh: false,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
};