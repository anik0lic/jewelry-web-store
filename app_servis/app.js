const express = require('express');
const path = require('path');
const BP = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.post("/novi-proizvod", (req, res) => {
    res.send(req.body);
});
app.use('/novi-proizvod', BP.urlencoded({extended: false}));

app.listen(8000, () => {
    console.log('Server is running at port 8000');
});