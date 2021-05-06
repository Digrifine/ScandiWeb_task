const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');

let conf = {
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.js$|.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.m\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]_[sha1:hash:hex:7]',
							},
						},
					},
					MediaQueryPlugin.loader,
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.mp4$/,
				use: 'file-loader?name=videos/[name].[ext]',
			},
			{
				test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
				// More information here https://webpack.js.org/guides/asset-modules/
				type: 'asset',
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css',
		}),
		new MediaQueryPlugin({
			include: ['example'],
			queries: {
				'print, screen and (min-width: 75em)': 'desktop',
			},
		}),
	],
};

module.exports = (env, options) => {
	let isProd = options.mode === 'production';
	conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
	conf.target = isProd ? 'browserslist' : 'web';
	return conf;
};
