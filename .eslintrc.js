module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/eslint-config-prettier',
		'@vue/typescript/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'array-callback-return': 'error',
		'no-extra-bind': 'error',
		'no-fallthrough': 'error',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		eqeqeq: ['warn', 'smart'],
	},
};
