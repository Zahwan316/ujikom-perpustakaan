const express = require("express")
const dotenv = require("dotenv")
dotenv.config({path:"../.env"})
require("dotenv").config()
const router = express.Router()
const sequelize = require("../config")
const {DataTypes} = require("sequelize")
const user = require("../models/user")
const User = user(sequelize,DataTypes)
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const jwttoken = process.env.JWT_SECRET_KEY
const RandInt = () => {
    return Math.floor(Math.random() * 99999999)
}

router.route("/user")
    .get(async(req,res) => {
        try{
            const allItem = await User.findAll()
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
            const createItem = await User.create({
                ...req.body,
                userID:RandInt()
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

router.route("/user/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await User.findByPk(id)
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
    .delete(async(req,res) =>{
        try{
            let id = req.params.id
            const findItem = await User.findByPk(id)
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
            const findItem = await User.findByPk(id)
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
            res.status(404).json({ 
                message:'Data tidak ditemukan',
                method:req.method 
            }) 	
        }
    })

router.route("/login")
    .post(async(req,res) => {
        try{
            const {username,password} = req.body
            const user = await User.findOne({where:{username}})
            if(!user){
                res.status(404).json({ 
                    message:'Akun tidak ditemukan',
                    method:req.method 
                }) 	
            }
            else{
                const validationpassword = await bcrypt.compare(password,user.password)
                if(validationpassword){
                    const token = jwt.sign({id:user.userID,username:user.username},jwttoken,{expiresIn:"1h"})
                    res.status(200).json({
                        message:'Login Berhasil',
                        token:token,
                        method:req.method,
                    })
                    
                }
                else{
                    res.status(404).json({ 
                        message:'Password atau Username Salah',
                        method:req.method 
                    }) 	
                }
            }
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })

router.route("/register")
    .post(async(req,res) => {
        try{
            const {username,password} = req.body
            const hashpass = await bcrypt.hash(password,10)
            const randint = Math.floor(Math.random() * 99999999)

            const user = await User.create({
                ...req.body,
                password:hashpass,
                userID:randint,
            })

            res.status(200).json({
                message:'Akun berhasil dibuat',
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