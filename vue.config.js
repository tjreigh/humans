/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');

const srcDir = path.resolve(__dirname, 'src');
const webDir = path.resolve(srcDir, 'web');

const utilDir = path.resolve(__dirname, srcDir, 'util');
const storeDir = path.resolve(__dirname, srcDir, webDir, 'stores');
const typesDir = path.resolve(__dirname, srcDir, 'types');

const includePaths = [webDir, utilDir, storeDir, typesDir];

// Safely check env string
const isDevEnv =
	process.env.NODE_ENV.trim()
		.substring(0, 3)
		.toLowerCase() === 'dev';

const webpackConfig = {
	base: {
		mode: 'production',
		entry: path.resolve(__dirname, webDir, 'main.ts'),
		devtool: 'hidden-source-map',
		// output: {
		// 	path: path.join(__dirname, 'dist'),
		// 	filename: 'bundle.js',
		// },
		resolve: {
			roots: [srcDir],
			modules: [srcDir],
			// Handled by babel-plugin-module-resolver
			alias: {
				'@web': webDir,
				'@util': path.resolve(__dirname, srcDir, 'util'),
				'@store': path.resolve(__dirname, webDir, 'stores'),
				'@typings': path.resolve(__dirname, srcDir, 'types'),
			},
		},
	},
	dev: {
		mode: 'development',
		devtool: 'eval-cheap-module-source-map',
	},
};

const configureWebpack = isDevEnv
	? merge(webpackConfig.base, webpackConfig.dev)
	: webpackConfig.base;

module.exports = {
	outputDir: path.join(__dirname, 'dist'),
	//publicPath: path.resolve(__dirname, webDir, 'public'),
	configureWebpack,
	chainWebpack: config => {
		config.module
			.rule('ts')
			.include.clear()
			.add(includePaths)
			.end()
			.exclude.add([/node_modules/, /src\/api/])
			.end();

		config.plugin('html').tap(options => {
			options[0].title = 'Humans of Legacy';
			options[0].template = path.resolve(__dirname, 'public', 'index.html');
			return options;
		});
	},
	css: {
		loaderOptions: {
			postcss: {
				plugins: [require('autoprefixer')],
			},
		},
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
		watchOptions: {
			poll: 1000,
			aggregateTimeout: 5000,
			ignored: ['node_modules/**', 'src/api/**'],
		},
		compress: true,
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://humans.tjdoescode.vercel.app',
			},
		},
		clientLogLevel: 'info',
	},
};
