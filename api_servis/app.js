const express = require('express');
const cors = require("cors");
const { sequelize, Proizvod, Kategorija, ProizvodMaterijal, Materijal, StavkaNarudzbine, Narudzbina } = require("./models");

const app = express();

const corsOptions = {
	origin: ['http://localhost:8000', 'http://127.0.0.1:8000']
};
app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

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

app.put("/promeni-cenu/:id", async (req,res)=>{
	console.log("assdgagdsahad");
	try{
		console.log("promena cene app put");
		console.log(req.body);
   	   	const proizvod = await Proizvod.findByPk(req.params.id);
		if (!proizvod) {
			console.log("null");
			return res.status(404).json({ error: "Usluga nije pronađena" });
		}
		proizvod.cena = req.body.cena; 
    	proizvod.save();
    	return res.json(proizvod); 
	} catch(err){
    	console.log(err);
    	res.status(500).json({ error: "Greska", data: err });
	}
});

app.listen({ port:9000 }, async () => {
	console.log("REST servis je pokrenut");
	await sequelize.sync({force:false});
	console.log("DB synced");
});
