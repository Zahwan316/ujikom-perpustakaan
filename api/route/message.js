const sequelize = require("../config")
const message = require("../models/message")
const {DataTypes} = require("sequelize")
const express = require("express")
const router = express.Router()
const Message = message(sequelize,DataTypes)

router.route("/message")
    .get(async(req,res) => {
        try{
            const alldata = await Message.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:alldata,
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

router.route("/message/:id")
    .get(async(req,res) => {
        try{
            const id = req.params.id
            const findItem = await Message.findByPk(id)
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