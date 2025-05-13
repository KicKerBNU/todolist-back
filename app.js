const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const errorController = require('./controllers/error');
const { mongoConnect } = require('./util/database');
const todoRoutes = require('./routes/todoRoutes');
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Todo routes
app.use('/api/todos', todoRoutes);

app.use((req, res, next) => {
    next();
});

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});

