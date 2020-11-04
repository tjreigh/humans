/* eslint-disable @typescript-eslint/no-var-requires */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/App.vue',
	devtool: 'eval-source-map',
	devServer: {
		contentBase: './public',
		hot: true,
		port: 5000,
	},
	output: {
		path: `${__dirname}/dist`,
		filename: 'build.js',
		publicPath: 'dist/',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			// ... other rules
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: { appendTsSuffixTo: [/\.vue$/] },
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		// make sure to include the plugin!
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
};
