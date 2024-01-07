const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authAdminToken(req, res, next) {
    console.log('aaaa');
    const cookies = getCookies(req);
    const token = cookies['token'];
    
    if (!token) {
      return res.redirect(301, '/admin/login');
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(jwt.decode(token));
      console.log(jwt.decode(token).role);
      if (err || !user || !user.role) {
        console.log('uso');
        return res.redirect(301, '/admin/login');
      }
      console.log('uso2');
      req.user = user;
      next();
    });
  }

app.get('/admin/login', (req, res) => {
    res.sendFile('login.html', { root: './static/admin' });
});

app.get('/admin', authAdminToken, (req, res) => {
    console.log('index.html');
    // res.sendFile('index.html', { root: './static/admin' });
});

app.use('/user', express.static(path.join(__dirname, 'static', 'user')));
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'user', 'index.html'));
});

app.use('/admin', express.static(path.join(__dirname, 'static', 'admin')));
app.get('/admin/*', authAdminToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'admin', `${req.params[0]}.html`));
});

app.use(express.static(path.join(__dirname, 'static', 'user')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'user', 'index.html'));
});

// app.use(express.static(path.join(__dirname, 'static')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static', 'index.html'));
// });


// app.use('/novi-proizvod', BP.urlencoded({extended: false}));
// app.post('/novi-proizvod', (req, res) => {
//     const shema = Joi.object().keys({
//         naziv: Joi.string().trim().min(5).max(25).required(),
//         opis: Joi.string().trim().min(1).required(),
//         kategorija: Joi.string().trim().required(),
//         cena: Joi.number().greater(0).required()
//     });

//     const {error, succ} = shema.validate(req.body);

//     if(error){
//         res.send("Greska: " + error.details[0].message);
// 	    return;
//     } else {
//         req.body.opis.replace(/\r?\n|\r/g, '<br>');
//         fs.appendFile('proizvodi.txt', 
//                 JSON.stringify(req.body) + "\n", 
//                  function(err, succ){
//                      res.send("Poruka je poslata, očekujte odgovor uskoro");
//                  }
//         );

//     }
// });

// app.get("/proizvodi", (req, res) => {
//     const proizvodi = [];

//     fs.readFile('proizvodi.txt', 'utf8', (err, data) => {
//         if (err) {
//           console.error('Error reading file:', err);
//           res.status(500).send({error: "Greška"});
//           return;
//         }
//         else{
//             const redovi = data.split('\n');
//             for(let i = 0; i < redovi.length - 1; i++){
//                 let obj = JSON.parse(redovi[i]);
//                 proizvodi.push(obj);
//             }
//             res.json(proizvodi);
//         }
//       });
//     })    


app.listen(8000, () => {
    console.log('Server is running at port 8000');
});