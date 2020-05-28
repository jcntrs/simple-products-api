const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.PORT || 4000;

app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => {
    res.send('Hello World - Simple Product API');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor funcionando en puerto ${port}`)
});