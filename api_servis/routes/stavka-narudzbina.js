const express = require("express");
const { sequelize, Proizvod, Narudzbina, StavkaNarudzbine} = require("../models");
const { authAdminToken, authUserToken } = require('./middleware'); 
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const stavkanarudzbina = await StavkaNarudzbine.findAll({include:[
               {model: Proizvod, as: "proizvod"},
               {model: Narudzbina, as: "narudzbina"}
             ]});
          return res.json(stavkanarudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const stavkanarudzbina = await StavkaNarudzbine.findByPk(req.params.id, {include:[
               {model: Proizvod, as: "proizvod"},
               {model: Narudzbina, as: "narudzbina"}
             ]});
          return res.json(stavkanarudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", authUserToken, async (req, res) => {
    try{
          const novi = await StavkaNarudzbine.create(req.body);
          if(!res.json(novi)){
               const novi = {};
               novi.proizvod_id = req.body.proizvod;
               novi.narudzbina_id = req.body.narudzbina;
               const insertovani = await StavkaNarudzbina.create(novi);
               return res.json(insertovani);
          }

          return;
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", authUserToken, async (req, res) => {
    try{
          const stavkanarudzbina = await StavkaNarudzbine.findByPk(req.params.id);
          stavkanarudzbina.proizvod_id = req.body.proizvod_id;
          stavkanarudzbina.narudzbina_id = req.body.narudzbina_id;
          stavkanarudzbina.save();
          return res.json(stavkanarudzbina);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", authAdminToken, async (req, res) => {
    try{
          const stavkanarudzbina = await StavkaNarudzbine.findByPk(req.params.id);
          stavkanarudzbina.destroy();
          return res.json( stavkanarudzbina.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 module.exports = route;