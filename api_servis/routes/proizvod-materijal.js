const express = require("express");
const { sequelize, Proizvod, Materijal, ProizvodMaterijal} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const proizvodmaterijal = await ProizvodMaterijal.findAll({include:[
               {model: Proizvod, as: "proizvod"},
               {model: Materijal, as: "materijal"}
             ]});
          return res.json(proizvodmaterijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const proizvodmaterijal = await ProizvodMaterijal.findByPk(req.params.id, {include:[
               {model: Proizvod, as: "proizvod"},
               {model: Materijal, as: "materijal"}
             ]});
          return res.json(proizvodmaterijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 route.post("/", async (req, res) => {
    try{
          const novi = await ProizvodMaterijal.create(req.body);
          if(!res.json(novi)){
               const novi = {};
               novi.proizvod_id = req.body.proizvod;
               novi.materijal_id = req.body.materijal;
               const insertovani = await ProizvodMaterijal.create(novi);
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
          const proizvodmaterijal = await ProizvodMaterijal.findByPk(req.params.id);
          proizvodmaterijal.proizvod_id = req.body.proizvod_id;
          proizvodmaterijal.materijal_id = req.body.materijal_id;
          proizvodmaterijal.save();
          return res.json(proizvodmaterijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const proizvodmaterijal = await ProizvodMaterijal.findByPk(req.params.id);
          proizvodmaterijal.destroy();
          return res.json( proizvodmaterijal.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 module.exports = route;