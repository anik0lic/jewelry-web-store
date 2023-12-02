const express = require("express");
const { sequelize, Narudzbina} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findAll();
          return res.json(narudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          return res.json(narudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
          const novi = await Narudzbina.create(req.body);
          if(!res.json(novi)){
               const novi = {};
               novi.vreme_narucivanja = req.body.vreme;
               novi.status = req.body.mojStatus;
               novi.adresa = req.body.mojaAdresa;
               novi.telefon = req.body.mojTelefon;
               novi.ime_prezime = req.body.imeIPrezime;
               const insertovani = await Narudzbina.create(novi);
               return res.json(insertovani);
          }

          return;
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          narudzbina.vreme_narucivanja = req.body.vreme_narucivanja;
          narudzbina.status = req.body.status;
          narudzbina.adresa = req.body.adresa;
          narudzbina.telefon = req.body.telefon;
          narudzbina.ime_prezime = req.body.ime_prezime;
          narudzbina.save();
          return res.json(narudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          narudzbina.destroy();
          return res.json( narudzbina.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 module.exports = route;