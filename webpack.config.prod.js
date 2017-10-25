const fs = require('fs')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { entry, output, module: mod, resolve } = require('./webpack.config.base')
const { plugins } = require('./postcss.config')

const ExtractMainCss = new ExtractTextPlugin({
	filename: '../css/main.css'
})

const lang = process.env.BUILD_LANG || 'cn'
const htmlList = fs
	.readdirSync('./views')
	.filter(filename => filename.includes('pug') && !filename.includes('layout'))
	.filter(filename =>
		(lang === 'cn' ? !(new RegExp('-(en|jp).pug').test(filename)) : new RegExp(`-${lang}.pug`).test(filename))
	)
	.map(filename =>
		new HtmlWebpackPlugin({
			filename: `../../${filename.replace('pug', 'html').replace(`-${lang}.`, '.')}`,
			template: `views/${filename}`,
			minify: false,
			inject: false
		})
	)

output.publicPath = './assets/js/'
module.exports = {
	entry,
	output,
	module: {
		rules: [...mod.rules, {
			test: /\.css$/,
			use: ExtractMainCss.extract({
				fallback: 'style-loader',
				use: [{
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
			})
		}, {
			test: /\.scss$/,
			use: ExtractMainCss.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}, {
			test: /\.pug$/,
			use: [{
				loader: 'pug-loader',
				options: {
					pretty: true
				}
			}]
		}]
	},
	resolve,
	plugins: [
		...htmlList,
		new CopyWebpackPlugin([
			{ context: 'assets/img', from: '**/*', to: '../img' }
		]),
		new ExtractTextPlugin({
			filename: '../css/vendor.css'
		}),
		ExtractMainCss,
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor'], // 載入順序是最後一個優先
			minChunks: Infinity,
		})
	],
}
