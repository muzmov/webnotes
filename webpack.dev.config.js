const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/ui/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: path.resolve(__dirname) + '/src/ui',
        compress: true,
        port: 9000,
        host: 'localhost',
        open: true,
        before: (app) => {
            app.get('/api/notes', (req, res) => res.send([
                {id: '1', text: 'note 1'},
                {id: '2', text: 'note 2'}
            ]));
        }
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            require('babel-plugin-transform-class-properties')
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/ui/index.html'
        })
    ]
}
