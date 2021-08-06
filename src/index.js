const express = require('express');
const app = express();
const Cors = require('cors')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Cors())

//routes
app.use(require('./routes/index'));

app.listen(1337);
console.log('Server on port 1337');