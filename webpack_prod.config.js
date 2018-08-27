const webpack = require('webpack');
const path = require('path')

module.exports = {
	mode: 'production',
	entry: './client/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{ 
				test: /\.css$/, 
				use: [
					'style-loader',
					'css-loader' 
				]                
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/public',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
