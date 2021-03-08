module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            { 
                test: /\.(png|jpg)$/, 
                use: { 
                    loader: 'url-loader?limit=8192',
                    options: {
                      esModule: false,
                    },
                }
            }
        ]
    }
}