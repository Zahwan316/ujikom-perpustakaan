const express = require("express")
const router = express.Router()
const {DataTypes} = require("sequelize")
const Sequelize = require("../config")
const peminjaman_detail = require("../models/peminjaman_detail")
const Peminjaman_detail = peminjaman_detail(Sequelize,DataTypes)
const RandInt = () => {
    return Math.floor(Math.random() * 9999999)
}

router.route("/peminjaman_detail")
    .get(async(req,res) => {
        try{
            const findAll = await Peminjaman_detail.findAll()
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
            const create = await Peminjaman_detail.create({
                peminjaman_detail_id:RandInt(),
                ...req.body
            })

            res.status(200).json({
                message:'Data berhasil ditambahkan',
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

router.route("/peminjaman_detail/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Peminjaman_detail.findByPk(id)
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
            const id = req.params.id
            const findItem = await Peminjaman_detail.findByPk(id)
            if(findItem){
                findItem.destroy()
                res.status(200).json({
                    message:'Data berhasil dihapus',
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
    .get(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Peminjaman_detail.findByPk(id)
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