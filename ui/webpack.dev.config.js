const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const bodyParser = require('body-parser');
const request = require('sync-request');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: path.resolve(__dirname) + '/src',
        compress: true,
        port: 9000,
        host: 'localhost',
        historyApiFallback: true,
        open: true,
        setup: (app) => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true
            }));

            app.get('/api/tasks', (req, res) => res.send([
                {id: 1, text: 'Забрать кофе', context: 'По пути с работы', priority: 1, timeEstimation: 15, done: false},
                {id: 2, text: 'Выбрать отель в Дубае', context: 'Дома', priority: 2, timeEstimation: 30, projectId: 2, done: false},
                {id: 3, text: 'Добавить проекты', context: 'Дома', priority: 1, timeEstimation: 30, projectId: 3, done: true},
                {id: 4, text: 'Добавить справочную информацию', context: 'Дома', priority: 3, timeEstimation: 2 * 60, projectId: 3, done: true}
            ]));
            app.get('/api/projects', (req, res) => res.send([
                {id: 2, title: 'Отдых в феврале'},
                {id: 3, title: 'Webnotes'},
            ]));
            // app.get('/api/projects', (req, res) => res.send([]));
            app.get('/api/notes', (req, res) => res.send([
                {id: 1, title: 'Идеи', text: "Это просто текст для заметки"},
                {id: 2, title: 'Webnotes план', text: "Это просто текст для заметки net.kuryshev.webnotes", projectId: 3},
                {id: 3, title: 'Webnotes стек технологий', text: "Это просто текст для заметки net.kuryshev.webnotes (2)", projectId: 3}
            ]));
            app.post('/api/task', (req, res) => {
                res.json(req.body.id || Math.floor(Math.random() * Math.floor(100000)));
            });
            app.post('/api/project', (req, res) => {
                res.json(req.body.id || Math.floor(Math.random() * Math.floor(100000)));
            });
            app.post('/api/note', (req, res) => {
                res.json(req.body.id || Math.floor(Math.random() * Math.floor(100000)));
            });
            app.delete('/api/task/**', (req, res) => res.send({success: true}));
            app.delete('/api/project/**', (req, res) => res.send({success: true}));
            app.delete('/api/note/**', (req, res) => res.send({success: true}));
            app.post('/oauth/token', (req, res) => res.send({access_token: "123"}))
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
                            require('babel-plugin-transform-class-properties'),
                            require('babel-plugin-transform-object-rest-spread')
                        ]
                    }
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ]
}
