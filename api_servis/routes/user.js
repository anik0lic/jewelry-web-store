const express = require("express");
const route = express.Router();
const { sequelize, User} = require("../models");

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const users = await User.findAll();
          return res.json(users);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const users = await User.findByPk(req.params.id);
          return res.json(users);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 module.exports = route;