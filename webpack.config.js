const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        mainPage: [path.join(__dirname, './src/js/mainPage.js'), path.join(__dirname, './src/sass/style.scss')],
        menuPage: [path.join(__dirname, './src/js/menuPage.js'), path.join(__dirname, './src/sass/style.scss')],
    },
    output: {
        filename: "[name].[contenthash:8].js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/inline'
                // generator: {
                //     filename: 'assets/img/[name][ext]'
                // }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'pages', 'MainPage.html'),
            chunks: ['mainPage']
            // chunks: [path.join(__dirname, './src/js/mainPage.js')]
        }),
        new HtmlWebpackPlugin({
            filename: 'SidePage.html',
            template: path.resolve(__dirname, 'src', 'pages', 'SidePage.html'),
            chunks: ['menuPage']
            // chunks: [path.join(__dirname, './src/js/menuPage.js')]
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: './src',
            watch: true
        },
        open: true,
        port: 9000,
    },
};