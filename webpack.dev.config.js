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
                {id: 1, text: 'Забрать кофе', context: 'По пути с работы', priority: 1, timeEstimation: 15, done: false},
                {id: 2, text: 'Выбрать отель в Дубае', context: 'Дома', priority: 2, timeEstimation: 30, projectId: 2, done: true},
                {id: 3, text: 'Добавить проекты', context: 'Дома', priority: 1, timeEstimation: 30, projectId: 3, done: true},
                {id: 4, text: 'Добавить справочную информацию', context: 'Дома', priority: 2, timeEstimation: 2 * 60, projectId: 3}
            ]));
            // app.get('/api/projects', (req, res) => res.send([
            //     {id: 2, title: 'Отдых в феврале'},
            //     {id: 3, title: 'Webnotes'},
            // ]));
            app.get('/api/projects', (req, res) => res.send([]));
            app.get('/api/notes', (req, res) => res.send([
                {id: 1, title: 'Идеи', text: "Это просто текст для заметки"},
                {id: 2, title: 'Webnotes план', text: "Это просто текст для заметки webnotes", projectId: 3},
                {id: 3, title: 'Webnotes стек технологий', text: "Это просто текст для заметки webnotes (2)", projectId: 3}
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
            app.delete('/api/task', (req, res) => res.sendStatus(200));
            app.delete('/api/project', (req, res) => res.sendStatus(200));
            app.delete('/api/note', (req, res) => res.sendStatus(200));
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
