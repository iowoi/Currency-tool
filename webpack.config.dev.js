const webpack = require('webpack')
const { entry, output, module: mod, resolve } = require('./webpack.config.base')
const { plugins } = require('./postcss.config')

module.exports = {
	devtool: 'eval-source-map',
	entry,
	output,
	module: {
		rules: [...mod.rules, {
			test: /\.css$/,
			use: ['style-loader', {
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					alias: {
						'./fonts': 'slick-carousel/slick/fonts',
						'./ajax-loader.gif': 'slick-carousel/slick/ajax-loader.gif'
					}
				}
			}, {
				loader: 'postcss-loader',
				options: { plugins }
			}]
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}]
	},
	resolve,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
}
