const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPlugin = require("html-webpack-plugin");

let conf = {
	entry: "./src/main.js",
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "bundle.js",
		publicPath: "/dist/",
	},
	module: {
		rules: [
			{
				test: /\.js$|.jsx$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.m\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[local]_[sha1:hash:hex:7]",
							},
						},
					},
				],
			},
			{
				test: /\.mp4$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
						},
						options: {
							publicPath: "assets",
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
						},
						options: {
							publicPath: "assets",
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "main.css",
		}),
	],
};

module.exports = (env, options) => {
	let isProd = options.mode === "production";
	conf.devtool = isProd ? false : "eval-cheap-module-source-map";
	conf.target = isProd ? "browserslist" : "web";
	return conf;
};
