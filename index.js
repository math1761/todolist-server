import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
mongoose.connect("mongodb://admin:root@ds229438.mlab.com:29438/todo-ntm");

const app = express();

const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const todoSchema = new mongoose.Schema({
    title: String
});
const todoModel = mongoose.model('Todo', todoSchema);

app.get('/', (req, res, next) => {
    res.send('homepage');
});

app.get('/api/todos', (req, res) => {

    todoModel.find()
        .then((docs) => {
            res.json(docs);
            res.end();
        });
});

app.post('/api/add', (req, res) => {
    let item = {title: req.body.title};

    let data = new todoModel(item);
    data.save();
    res.status(200).send('OK').end();
    res.redirect('/');
});

app.put('/api/update', (req, res) => {
    let id = {id: req.body.id};

    todoModel.findById(id, (err, doc) => {
        if (err) {
            console.log(err);
        }
        else {
            doc.title = req.body.title;
            doc.save();
            res.redirect('/');
        }
    })
});

app.delete('/api/delete', (req, res) => {
    let id = req.body.id;

    todoModel.findByIdAndRemove(id).exec();
});


app.listen(port, () => console.log('Example app listening on port 3000!'));
