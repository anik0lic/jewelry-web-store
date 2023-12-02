const express = require("express");
const { sequelize, Materijal} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const materijal = await Materijal.findAll();
          return res.json(materijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const materijal = await Materijal.findByPk(req.params.id);
          return res.json(materijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", async (req, res) => {
    try{
          const novi = await Materijal.create(req.body);
          if(!res.json(novi)){
               const novi = {};
               novi.naziv = req.body.mojNaziv;
               const insertovani = await Materijal.create(novi);
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
          const materijal = await Materijal.findByPk(req.params.id);
          materijal.naziv = req.body.naziv;
          materijal.save();
          return res.json(materijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", async (req, res) => {
    try{
          const materijal = await Materijal.findByPk(req.params.id);
          materijal.destroy();
          return res.json( materijal.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 module.exports = route;