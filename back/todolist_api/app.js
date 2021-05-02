const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routerTodo = require('./routes/todolist');

const PORT = 5000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routerTodo);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server Waslisned at port : ${PORT}`);
});
