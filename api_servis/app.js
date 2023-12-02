const express = require('express');
const { sequelize, Proizvod, Kategorija, ProizvodMaterijal, Materijal, StavkaNarudzbine, Narudzbina } = require("./models");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const proizvodRoutes = require("./routes/proizvod.js");
app.use("/proizvod", proizvodRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija", kategorijaRoutes);

const materijalRoutes = require("./routes/materijal.js");
app.use("/materijal", materijalRoutes);

const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);


app.listen({ port:9000 }, async () => {
	console.log("REST servis je pokrenut");
	await sequelize.sync({force:false});
	console.log("DB synced");
});
