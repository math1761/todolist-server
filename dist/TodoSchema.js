'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.todoModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoSchema = new _mongoose2.default.Schema({
    title: String
});

var todoModel = exports.todoModel = _mongoose2.default.model('Todo', todoSchema);