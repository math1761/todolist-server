'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect("mongodb://admin:root@ds229438.mlab.com:29438/todo-ntm");

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.use((0, _helmet2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

var todoSchema = new _mongoose2.default.Schema({
    title: String
});
var todoModel = _mongoose2.default.model('Todo', todoSchema);

app.get('/', function (req, res, next) {
    res.send('homepage');
});

app.get('/api/todos', function (req, res) {

    todoModel.find().then(function (docs) {
        res.json(docs);
        res.end();
    });
});

app.post('/api/add', function (req, res) {
    var item = { title: req.body.title };

    var data = new todoModel(item);
    data.save();
    res.status(200).send('OK').end();
    res.redirect('/');
});

app.put('/api/update', function (req, res) {
    var id = { id: req.body.id };

    todoModel.findById(id, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            doc.title = req.body.title;
            doc.save();
            res.redirect('/');
        }
    });
});

app.delete('/api/delete', function (req, res) {
    var id = req.body.id;

    todoModel.findByIdAndRemove(id).exec();
});

app.listen(port, function () {
    return console.log('Example app listening on port 3000!');
});