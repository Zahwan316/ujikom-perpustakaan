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
const bcrypt = require("bcryptjs")
const jwttoken = process.env.JWT_SECRET_KEY
const RandInt = () => {
    return Math.floor(Math.random() * 99999999)
}
const refuser = require("../models/ref_user")
const Refuser = refuser(sequelize,DataTypes)
const peminjaman = require("../models/peminjaman")
const Peminjaman = peminjaman(sequelize,DataTypes)
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder tempat menyimpan gambar
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Nama file unik
    },
  });

const upload = multer({ storage: storage });

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
    .post(upload.single("img"),async(req,res) => {
        try{
            const hashpassword = await bcrypt.hash(req.body.password,10)
            console.log(hashpassword)
            const sameUser = await User.findOne({where:{
                email:req.body.email,
                no_hp:req.body.no_hp,
                username:req.body.username
            }})

            if(sameUser){
                res.status(400).json({
                    message:"Email atau Username sudah terdaftar",
                    method:req.method,
                })
            }else{
                const createItem = await User.create({
                    ...req.body,
                    userID:RandInt(),
                    password:hashpassword,
                    img:req.file && req.file.filename 
                })
                res.status(200).json({
                    message:"Data berhasil dibuat",
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

router.route("/user/:id")
    .put(upload.single("img"),async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await User.findByPk(id)
            if(findItem){
                if(req.body.password){
                    findItem.update({
                        ...req.body,
                        password: await bcrypt.hash(req.body.password,10),
                        img:req.file && req.file.filename
                    })
                    res.status(200).json({
                        message:'Data berhasil diedit',
                        method:req.method,
                    })
                }
                else{
                    findItem.update({
                        ...req.body,
                        img:req.file && req.file.filename
                    })
                    res.status(200).json({
                        message:'Data berhasil diedit',
                        method:req.method,
                    })
                }
                
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
            const findPeminjamanItem = await Peminjaman.findOne({where:{userID:id}})
            if(findItem){
                findItem.destroy()
                if(findPeminjamanItem){
                    findPeminjamanItem.destroy()
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
            const {email,password} = req.body
            const user = await User.findOne({where:{email}})
            if(!user){
                res.status(404).json({ 
                    message:'Akun tidak ditemukan',
                    method:req.method 
                }) 	
            }
            else{
                const validationpassword = await bcrypt.compare(password,user.password)
                if(validationpassword){
                    const token = jwt.sign({id:user.userID,username:user.username,email:user.email},jwttoken,{expiresIn:"1h"})
                    res.status(200).json({
                        message:'Login Berhasil',
                        token:token,
                        method:req.method,
                        access_level:user.access_level
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
            const sameuser = await User.findOne({where:{
                email:req.body.email,
                no_hp:req.body.no_hp,
                username:req.body.username
            }})

            if(sameuser) {
                res.status(400).json({
                    message:"Email atau Username sudah terdaftar",
                    method:req.method,
                })
            }else{
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

            
        }
        catch(e){
            res.status(400).json({
                 message:e.message,
                 method:req.method,
            })
            
        }
    })

router.route("/refuser")
    .get(async(req,res) => {
        try{
            let data = await Refuser.findAll()
            res.status(200).json({
                message:'Data berhasil diambil',
                data:data,
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

router.route("/auth/user/:token")
    .get(async(req,res) => {
        try{
            const token = req.params.token
            let data = {}
            jwt.verify(token,jwttoken,(err,decoded)=>{
                if(err){
                    res.status(400).json({
                        message:err,
                    })
                }
                else{
                    data=decoded
                }
            })
            if(data){
                const findItem = await User.findByPk(data.id)
                if(findItem){
                    res.status(200).json({
                        message:'Data berhasil diambil',
                        data:findItem,
                        method:req.method,
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


module.exports = router