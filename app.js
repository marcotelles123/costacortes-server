var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
const server = http.Server(app);

try {
    mongoose.connect('mongodb+srv://sa:P@ssw0rd@cluster0-etowf.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (e) {
    console.log('Error happend while connecting to the DB: ', e.message)
}
app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);