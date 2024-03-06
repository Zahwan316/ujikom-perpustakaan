const express = require("express")
const router = express.Router()
const {DataTypes} = require("sequelize")
const sequelize  = require("../config")
const perpus = require("../models/perpus")
const Perpus = perpus(sequelize,DataTypes)
const buku = require("../models/buku")
const Buku = buku(sequelize,DataTypes)
const peminjaman = require("../models/peminjaman")
const Peminjaman = peminjaman(sequelize,DataTypes)
const user = require("../models/user")
const User = user(sequelize,DataTypes)

const RandInt = () => {
    return Math.floor(Math.random() * 99999999)
}


router.route("/perpus")
    .get(async(req,res) => {
        try{
            const findAll = await Perpus.findAll()
            res.status(200).json({
                message:'data berhasil diambil',
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
            const create = await Perpus.create({
                ...req.body,
                perpus_id:RandInt()
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

router.route("/perpus/:id")
    .put(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Perpus.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body,
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
            const findItem = await Perpus.findByPk(id)
            const findItemBuku = await Buku.findAll({where:{perpus_id:id}})
            const findItemUser = await User.findAll({where:{perpus_id:id}})
            const findItemPeminjaman = await Peminjaman.findAll({where:{perpus_id:id}})
            if(findItem){
                findItem.destroy()
                if(findItemBuku){
                    Buku.destroy({where:{perpus_id:id}})
                }
                if(findItemPeminjaman){
                    Peminjaman.destroy({where:{perpus_id:id}})
                }
                if(findItemUser){
                    User.destroy({where:{perpus_id:id}})
                }
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
    .get(async(req,res)=>{
        try{    
            const id = req.params.id
            const findItem = await Perpus.findByPk(id)
            if(findItem){
                res.status(200).json({
                    message:'Data berhasil diedit',
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