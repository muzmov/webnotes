const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const bodyParser = require('body-parser');
const request = require('sync-request');

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
        setup: (app) => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true
            }));

            app.get('/api/tasks', (req, res) => res.send([
                {id: 1, text: 'Забрать кофе', context: 'По пути с работы', priority: 1, timeEstimation: 15},
                {id: 2, text: 'Выбрать тур во Вьетнам', context: 'Дома', priority: 2, timeEstimation: 5 * 60},
                {id: 3, text: 'Проверить логирование на ммв', context: 'На работе', priority: 1, timeEstimation: 30},
                {id: 4, text: 'Сделать мониторинг', context: 'На работе', priority: 2, timeEstimation: 2 * 60}
            ]));
            app.post('/api/task', (req, res) => {
                console.log(req.body)
                res.json(req.body.id || Math.floor(Math.random() * Math.floor(100000)));
            });
            app.delete('/api/task', (req, res) => res.sendStatus(200));
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
