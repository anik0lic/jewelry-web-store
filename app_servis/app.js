const express = require('express');
const path = require('path');
const BP = require('body-parser');
const Joi = require('joi');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});


app.use('/novi-proizvod', BP.urlencoded({extended: false}));
app.post('/novi-proizvod', (req, res) => {
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().trim().required(),
        cena: Joi.number().greater(0).required()
    });

    const {error, succ} = shema.validate(req.body);

    if(error){
        res.send("Greska: " + error.details[0].message);
	    return;
    } else {
        req.body.opis.replace(/\r?\n|\r/g, '<br>');
        fs.appendFile('proizvodi.txt', 
                JSON.stringify(req.body) + "\n", 
                 function(err, succ){
                     res.send("Poruka je poslata, očekujte odgovor uskoro");
                 }
        );

    }
});

app.get("/proizvodi", (req, res) => {
    const proizvodi = [];

    fs.readFile('proizvodi.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({error: "Greška"});
          return;
        }
        else{
            const redovi = data.split('\n');
            for(let i = 0; i < redovi.length - 1; i++){
                let obj = JSON.parse(redovi[i]);
                proizvodi.push(obj);
            }
            res.json(proizvodi);
        }
      });
    })    


app.listen(8000, () => {
    console.log('Server is running at port 8000');
});