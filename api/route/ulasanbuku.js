const express = require("express")
const router = express.Router()
const sequelize = require("../config")
const {DataTypes} = require("sequelize")
const ulasanbuku = require("../models/ulasanbuku")
const Ulasanbuku = ulasanbuku(sequelize,DataTypes)
const RandInt = () => {
    return Math.floor(Math.random() * 9999999)
}

router.route("/ulasanbuku")
    .get(async(req,res) => {
        try{
            const allItem = await Ulasanbuku.findAll()
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
            const create = await Ulasanbuku.create({
                ulasanID:RandInt(),
                ...req.body,
            })

            res.status(200).json({
                message:'Data berhasil dibuat',
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

router.route("/ulasanbuku/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Ulasanbuku.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
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
            const id =req.params.id
            const findItem = await Ulasanbuku.findByPk(id)
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
            let id =req.params.id
            const findItem = await Ulasanbuku.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:'Data berhasil diambil',
                    data:findItem,
                    method:req.method,
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