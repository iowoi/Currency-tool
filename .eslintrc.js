const { resolve } = require('path')

module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true,
		commonjs: true,
		jest: true,
		jquery: true
	},
	extends: 'airbnb-base',
	plugins: [
		'import'
	],
	globals: {
		Handlebars: true,
		Sortable: true,
		Cleave: true
	},
	rules: {
		'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
		'comma-dangle': 0,
		'consistent-return': 0,
		curly: ['error', 'multi-or-nest'],
		'default-case': 0,
		'func-names': ['error', 'never'],
		'global-require': 0,
		'import/no-extraneous-dependencies': ['error', {
			devDependencies: ['**/*.test.js', '**/*.spec.js', '*.config.js', '*.config.*.js', '**/*.bundle.js', 'app.js']
		}],
		'import/no-webpack-loader-syntax': 0,
		indent: ['error', 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 1
		}],
		'key-spacing': ['error', { mode: 'minimum' }],
		'max-len': ['error', 120, {
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true
		}],
		'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
		'no-alert': 0,
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-multi-spaces': ['error', {
			exceptions: {
				VariableDeclarator: true,
				ImportDeclaration: true
			}
		}],
		'no-multiple-empty-lines': ['error', {
			max: 3,
			maxBOF: 1
		}],
		'no-plusplus': 0,
		'no-return-await': 0,
		'no-tabs': 0,
		'no-unused-expressions': ['error', { allowTernary: true }],
		semi: ['error', 'never']
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: {
					resolve: {
						alias: {
							'~': resolve(__dirname, 'assets/js'),
							'~init': resolve(__dirname, 'assets/js/init'),
							'~pages': resolve(__dirname, 'assets/js/pages'),
							'~plugins': resolve(__dirname, 'assets/js/plugins'),
							'~components': resolve(__dirname, 'assets/js/components')
						}
					}
				}
			}
		}
	}
}
