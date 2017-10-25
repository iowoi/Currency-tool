const path = require('path')

module.exports = {
	plugins: [
		require('postcss-smart-import')({
			path: [
				path.resolve(__dirname, 'assets/css')
			]
		}),
		require('postcss-cssnext')({
			autoprefixer: false,
			warnForDuplicates: false
		}),
		require('rucksack-css'),
		require('autoprefixer')({
			browsers: [
				'last 4 versions',
				'ie > 8'
			]
		})
	]
}
