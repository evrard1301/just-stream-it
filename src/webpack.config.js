import path from 'path';

export default {
    mode: 'production',
    
    entry: {
	app: './js/app.js'
    },
    
    devServer: {
	hot: true,
	static: '.'
    },
    
    output: {
	filename: '[name].bundle.js',
	path: path.resolve('./dist')
    },

    module: {
	rules: [
	    {
		test: /\.scss$/,
		use: [
		    "style-loader",
		    "css-loader",
		    "sass-loader"
		]
	    },
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader'
	    }
	]
    }   
};
