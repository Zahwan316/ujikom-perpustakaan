const express = require("express")
const {DataTypes} = require("sequelize")
const Sequelize = require("../config")
const kategoribukurelasi = require("../models/kategoribuku_relasi")
const Kategoribukurelasi = kategoribukurelasi(Sequelize,DataTypes)
const router = express.Router()

router.route("/kategoribukurelasi")
    .get(async(req,res) => {
        try{
            const allData = await Kategoribukurelasi.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:allData,
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
            const create = await Kategoribukurelasi.create({
                ...req.body
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

router.route("/kategoribukurelasi/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Kategoribukurelasi.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
                })
                res.status(200).json({
                    message:'data berhasil diedit',
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
            let id = req.params.id
            const findItem = await Kategoribukurelasi.findByPk(id)
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
            let id = req.params.id
            const findItem = await Kategoribukurelasi.findByPk(id)
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