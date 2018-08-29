const webpack = require('webpack');
const path = require('path')

module.exports = {
	mode: 'development',
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
	],
	devServer: {
		contentBase: './public',
		compress: true,
		port: 9000,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': {target: 'http://localhost:3000'}
		}
	}
};
