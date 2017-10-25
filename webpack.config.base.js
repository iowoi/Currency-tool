const { resolve } = require('path')

const isProd = process.argv.includes('-p')
const bootstrapLoader = isProd ? 'bootstrap-loader/extractStyles' : 'bootstrap-loader'
const outputLang = process.env.BUILD_LANG || 'cn'

module.exports = {
	entry: {
		vendor: ['./assets/js/icons.js', 'handlebars/dist/handlebars', 'bignumber.js', 'lodash', 'jquery', bootstrapLoader, 'gridstack', 'sortablejs', 'cleave.js', 'jquery-placeholder'],
		main: isProd ? './assets/js/index.js' : [
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			'./assets/js/index.js'
		]
	},
	output: {
		path: resolve(__dirname, isProd ? `dist/${outputLang}/assets/js` : 'dist/assets/js'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: require.resolve('jquery'),
			use: [
				{ loader: 'expose-loader', options: 'jQuery' },
				{ loader: 'expose-loader', options: '$' }
			]
		}, {
			test: require.resolve('handlebars/dist/handlebars'),
			use: [
				{ loader: 'expose-loader', options: 'Handlebars' }
			]
		}, {
			test: require.resolve('sortablejs'),
			use: [
				{ loader: 'expose-loader', options: 'Sortable' }
			]
		}, {
			test: require.resolve('cleave.js'),
			use: [
				{ loader: 'expose-loader', options: 'Cleave' }
			]
		}, {
			test: /bootstrap-sass\/assets\/javascripts\//,
			use: 'imports-loader?jQuery=jquery'
		}, {
			test: /\.(ttf|eot|otf|woff)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
			use: [{
				loader: 'file-loader',
				options: isProd ? {
					name: '[name].[ext]',
					publicPath: '',
					outputPath: '../fonts/'
				} : {
					name: '[path][name].[ext]'
				}
			}]
		}, {
			test: /\.svg$/,
			use: [{
				loader: 'file-loader',
				options: isProd ? {
					name: '[name].[ext]',
					publicPath: '',
					outputPath: '../svg/'
				} : {
					name: '[path][name].[ext]'
				}
			}]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: [{
				loader: 'file-loader',
				options: isProd ? {
					name: '[name].[ext]',
					publicPath: '',
					outputPath: '../img/'
				} : {
					name: '[path][name].[ext]'
				}
			}]
		}]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.css'],
	}
}
