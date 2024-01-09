const express = require("express");
const route = express.Router();
const { sequelize, Narudzbina, StavkaNarudzbine} = require("../models");
const { authAdminToken, authUserToken } = require('./middleware'); 

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findAll({include:[
               {model: StavkaNarudzbine, as: "stavka"}
             ]});
          return res.json(narudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id, {include:[
               {model: StavkaNarudzbine, as: "stavka"}
             ]});
          return res.json(narudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", authUserToken, async (req, res) => {
    try{
          const novi = await Narudzbina.create(req.body);

          for(let i = 0; i < req.body.korpa.length; i++){
               const stavka = await StavkaNarudzbine.create({
                   narudzbina_id: novi.id,
                   proizvod_id: req.body.korpa[i].id,
                   komada: req.body.korpa[i].quantity,
               });
          }

          return;
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", authUserToken, async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          narudzbina.vreme_narucivanja = req.body.vreme_narucivanja;
          narudzbina.status = req.body.status;
          narudzbina.adresa = req.body.adresa;
          narudzbina.telefon = req.body.telefon;
          narudzbina.ime_prezime = req.body.ime_prezime;
          narudzbina.cena = req.body.cena;
          narudzbina.save();
          return res.json(narudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", authAdminToken, async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          narudzbina.destroy();
          return res.json( narudzbina.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

route.put("/status/:id", authAdminToken, async (req, res) => {

     try {
         const narudzbina = await Narudzbina.findByPk(req.params.id);
         narudzbina.status = req.body.status;
         narudzbina.save();
         return res.json(narudzbina);
 
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
     }
 });
 
 
 module.exports = route;