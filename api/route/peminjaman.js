const express = require('express');
const sequelize = require("../config")
const router = express.Router();
const peminjaman = require("../models/peminjaman");
const {DataTypes} = require("sequelize")
const Peminjaman = peminjaman(sequelize,DataTypes)
const ref_peminjaman = require("../models/ref_peminjaman")
const Ref_peminjaman = ref_peminjaman(sequelize,DataTypes)
const message = require("../models/message")
const Message = message(sequelize,DataTypes)
const user = require("../models/user")
const buku = require("../models/buku")
const User = user(sequelize,DataTypes)
const Buku = buku(sequelize,DataTypes)
const RandInt = () => {
    return Math.floor(Math.random() * 9999999)
}

router.route("/peminjaman")
    .get(async(req,res) => {
        try{
            let allData = await Peminjaman.findAll()
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
            let createItem = await Peminjaman.create({
                peminjamanID:RandInt(),
                ...req.body,
            })
            let user_data = await User.findByPk(req.body.userID)
            let buku_data = await Buku.findByPk(req.body.bukuID)

            let sendMessage = await Message.create({
                message_id:RandInt(),
                text:`${user_data.username} meminjam buku ${buku_data.judul}`,
                title:"Meminjam Buku"
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


router.route("/peminjaman/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            let findItem = await Peminjaman.findByPk(id)
            let user_data = await User.findByPk(findItem.userID)
            let buku_data = await Buku.findByPk(findItem.bukuID)

            if(req.body.status_peminjaman === 2){
                let sendMessage = await Message.create({
                    message_id:RandInt(),
                    text:`${user_data.username} sudah mengembalikan buku ${buku_data.judul}`,
                    title:"Mengembalikan Buku"
                })

            }

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
            let findItem = await Peminjaman.findByPk(id)

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
            let findItem = await Peminjaman.findByPk(id)

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

router.route("/ref_peminjaman")
    .get(async(req,res) => {
        try{
            const allItem = await Ref_peminjaman.findAll()
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

module.exports = router