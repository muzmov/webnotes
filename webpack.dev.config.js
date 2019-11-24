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
                {id: 1, text: 'Забрать кофе', context: 'По пути с работы', priority: 1, timeEstimation: 15},
                {id: 2, text: 'Выбрать тур во Вьетнам', context: 'Дома', priority: 2, timeEstimation: 5 * 60},
                {id: 3, text: 'Проверить логирование на ммв', context: 'На работе', priority: 1, timeEstimation: 30},
                {id: 4, text: 'Сделать мониторинг', context: 'На работе', priority: 2, timeEstimation: 2 * 60}
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
