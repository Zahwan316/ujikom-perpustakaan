const express = require("express")
const sequelize = require("../config")
const {DataTypes} = require("sequelize")
const router = express.Router()
const kategoribuku = require("../models/kategoribuku")
const Kategoribuku = kategoribuku(sequelize,DataTypes)
const RandInt = () => {
    return Math.floor(Math.random() * 9999999)
}

router.route("/kategori")
    .get(async(req,res) => {
        try{
            let findAll = await Kategoribuku.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:findAll,
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
            const create = await Kategoribuku.create({
                kategoriID:RandInt(),
                ...req.body
            })

            res.status(200).json({
                message:"Data bergasil dibuat",
                method:req.method
            })
        }
        catch(e){
            res.status(404).json({ 
                message:'Data tidak ditemukan',
                method:req.method 
            }) 	
        }
    })

router.route("/kategori/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Kategoribuku.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
                })
                res.status(200).json({
                    message:"Data berhasil diubah",
                    method:req.method
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
                method:req.method
            })
        }
    })
    .delete(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Kategoribuku.findByPk(id)
            if(findItem){
                findItem.destroy()
                res.status(200).json({
                    message:"Data berhasil dihapus",
                    method:req.method
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
                method:req.method
            })
        }
    })
    .get(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Kategoribuku.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:"Data berhasil diambil",
                    data:findItem,
                    method:req.method
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
                method:req.method
            })
        }
    })

module.exports = router


