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
    const cookies = getCookies(req);
    const token = cookies['token'];
    console.log("aaaa");
    
    if (!token) {
      console.log('No token')
      return res.redirect(301, '/admin/login');
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      console.log(jwt.decode(token));
      console.log(jwt.decode(token).role);
      if (err || !payload || payload.role === 0) {
        return res.redirect(301, '/admin/login');
      }
      req.user = payload;
      next();
    });
  }

app.get('/admin/login', (req, res) => {
  console.log("bbbbb");
    res.sendFile('login.html', { root: './static/admin' });
});

app.get('/admin', authAdminToken, (req, res) => {
  console.log("aaaa");
    res.sendFile('index.html', { root: './static/admin' });
});

app.use('/user', express.static(path.join(__dirname, 'static/user/dist')));
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/user/dist/index.html'));
});

app.use('/admin', express.static(path.join(__dirname, 'static', 'admin')));
app.get('/admin/*', authAdminToken, (req, res) => {
  console.log("cccc");
  res.sendFile(path.join(__dirname, 'static', 'admin', `${req.params[0]}.html`));
});

app.use(express.static(path.join(__dirname, 'static/user/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/user/dist/index.html'));
});

app.listen(8000, () => {
    console.log('Server is running at port 8000');
});