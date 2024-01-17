const Sequelize = require("../config")
const express = require("express")
const buku = require("../models/buku")
const {DataTypes} = require("sequelize")
const router = express.Router()
const Buku = buku(Sequelize,DataTypes)

const RandId = () => {
    return Math.floor(Math.random() * 9999999)
}

router.route("/buku")
    .get(async(req,res) => {
        try{
            let allItem = await Buku.findAll()

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
            let createItem = await Buku.create({
                bukuID:RandId(),
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

router.route("/buku/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Buku.findByPk(id)
    
            if(findItem){
                findItem.update({
                    ...req.body
                })

                res.status(200).json({
                    message:'Data berhasil diedit',
                    method:req.method,
                })
                
            }else{
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
            let findItem = await Buku.findByPk(id)

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
            let findItem = await Buku.findByPk(id)

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