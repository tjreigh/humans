module.exports = {
  root: true,
  env: {
		node: true,
		es6: true
  },
  extends: [
		'standard',
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended',
	],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
		'comma-dangle': ['warn', 'always-multiline'],
		'no-unused-vars': 'warn',
		'space-before-function-paren': 'off',
		'spaced-comment': 'off',
  }
}
