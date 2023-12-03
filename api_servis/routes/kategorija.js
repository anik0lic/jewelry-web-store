const express = require("express");
const { sequelize, Kategorija, Proizvod} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const kategorija = await Kategorija.findAll();
          return res.json(kategorija);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const kategorija = await Kategorija.findByPk(req.params.id);
          return res.json(kategorija);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
          const novi = await Kategorija.create(req.body);
          if(!res.json(novi)){
               const novi = {};
               novi.naziv = req.body.mojNaziv;
               const insertovani = await Kategorija.create(novi);
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
          const kategorija = await Kategorija.findByPk(req.params.id);
          kategorija.naziv = req.body.naziv;
          kategorija.save();
          return res.json(kategorija);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const kategorija = await Kategorija.findByPk(req.params.id);
          kategorija.destroy();
          return res.json( kategorija.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 module.exports = route;