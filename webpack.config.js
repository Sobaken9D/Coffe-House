const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        mainPage: [path.join(__dirname, './src/js/mainPage.js'), path.join(__dirname, './src/sass/style.scss')],
        menuPage: [path.join(__dirname, './src/js/menuPage.js'), path.join(__dirname, './src/sass/style.scss')],
    },
    output: {
        filename: "[name].js",
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
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'MainPage.html',
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
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/img/slider", to: "assets/img/slider" },
                { from: "src/img/menu", to: "assets/img/menu" },
            ],
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: './src',
            watch: true
        },
        open: true,
        port: 8000,
    },
};