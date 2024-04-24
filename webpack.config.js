const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: [path.join(__dirname, './src/js/index.js'), path.join(__dirname, './src/sass/style.scss')],
    output: {
        filename: "[name].[contenthash:8].js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash:8][ext]',
        clean: true
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
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'pages', 'MainPage.html'),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: 5000,
        open: true
    }
};