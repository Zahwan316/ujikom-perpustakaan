const express = require("express")
const router = express.Router()
const sequelize = require("../config")
const {DataTypes} = require("sequelize")
const koleksipribadi = require("../models/koleksipribadi")
const Koleksipribadi = koleksipribadi(sequelize,DataTypes)
const RandInt = () => {
    return Math.floor(Math.random() * 999999999)
}


router.route("/koleksipribadi")
    .get(async(req,res) =>{
        try{
            const allItem = await koleksipribadi.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:allItem,
                method:req.method,
            })
            
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })
    .post(async(req,res) => {
        try{
            const createItem = await koleksipribadi.create({
                koleksiID:RandInt(),
                ...req.body
            })
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })

router.route("/koleksipribadi/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Koleksipribadi.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
                })
                res.status(200).json({
                    message:'Data berhasil diedit',
                    method:req.method,
                })
                
            }
            else{
                res.status(404).json({ 
                    message:'Data tidak ditemukan',
                    method:req.method 
                }) 	
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })
    .delete(async(req,res) => {
        try{
            const id = req.paramas.id
            const findItem = await Koleksipribadi.findByPk(id)
            if(findItem){
                findItem.destroy()
                res.status(200).json({
                    message:'Data berhasil dihapus',
                    method:req.method,
                })
                
            }
            else{
                res.status(404).json({ 
                    message:'Data tidak ditemukan',
                    method:req.method 
                }) 	
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })
    .get(async(req,res) => {
        try{    
            const id = req.params.id
            const findItem = await Koleksipribadi.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:'Data berhasil diambil',
                    data:findItem,
                    method:req.method,
                })
                
            }
            else{
                res.status(404).json({ 
                    message:'Data tidak ditemukan',
                    method:req.method 
                }) 	
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })

module.exports = router