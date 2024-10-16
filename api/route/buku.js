const Sequelize = require("../config")
const express = require("express")
const buku = require("../models/buku")
const {DataTypes} = require("sequelize")
const router = express.Router()
const Buku = buku(Sequelize,DataTypes)
const multer = require("multer")
const ulasanbuku = require("../models/ulasanbuku")
const Ulasanbuku = ulasanbuku(Sequelize,DataTypes)
const peminjaman = require("../models/peminjaman")
const Peminjaman = peminjaman(Sequelize,DataTypes)
const supabase = require("../supabase")

// Konfigurasi Multer
/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder tempat menyimpan gambar
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Nama file unik
    },
  }); */

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

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
    .post(upload.fields([{name:"img",maxCount:1},{name:"isi_buku",maxCount:1}]),async(req,res) => {
        try{
            const findJudul = await Buku.findOne({where:{judul:req.body.judul}})
            if(findJudul){
                res.status(400).json({ 
                    message:'Buku sudah ada',
                    method:req.method 
                })
            }else{
                let createItem = await Buku.create({
                    bukuID:RandId(),
                    img:req.files['img'] && req.files['img'][0].filename,
                    isi_buku:req.files['isi_buku'] && req.files['isi_buku'][0].filename,
                    ...req.body,
                })

                const img = req.files['img'] && req.files['img'][0].filename
                const buku = req.files['isi_buku'] && req.files['isi_buku'][0].filename

                

                const { data, error } = await supabase.storage
                .from('your_bucket_name') // Ganti dengan nama bucket yang Anda buat di Supabase
                .upload({img,buku}, [img.buffer,buku.buffer], {
                  cacheControl: '3600',
                  upsert: false,
                  contentType: file.mimetype,
                });

                if (error) {
                    throw error;
                  }

                res.status(200).json({
                    message:'Data berhasil dibuat',
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

router.route("/buku/:id")
    .put(upload.fields([{name:"img",maxCount:1},{name:"isi_buku",maxCount:1}]),async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Buku.findByPk(id)
            console.log(req.file)
            if(findItem){
                findItem.update({
                    ...req.body,
                    img:req.files['img'] && req.files['img'][0].filename,
                    isi_buku:req.files['isi_buku'] && req.files['isi_buku'][0].filename,
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
            let findItemUlasanBuku = await Ulasanbuku.findOne({where:{bukuID:id}})
            let findItemPeminjamanBUku = await Peminjaman.findOne({where:{bukuID:id}})

            if(findItem){
                findItem.destroy()
                if(findItemUlasanBuku){
                    findItemUlasanBuku.destroy()
                }
                if(findItemPeminjamanBUku){
                    findItemPeminjamanBUku.destroy()
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

router.route("/v2/buku/softdelete/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Buku.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
                })

                res.status(200).json({
                    message:"Data berhasil dihapus sementara",
                    method:req.method
                })
            }else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
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

router.route("/v2/buku/deleteall")
    .delete(async(req,res) => {
        try{
            const findItem = await Buku.findAll({where:{soft_delete:1}})
            await Promise.all(
                findItem.map(async(item) => {
                    await item.destroy()
                })
            )
            res.status(200).json({
                message:"Semua data berhasil dihapus",
                method:req.method
            })
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

router.route("/v2/buku/restore/:id")
    .put(async(req,res) => {
        try{
            let id = req.params.id
            const findItem = await Buku.findByPk(id)
            if(findItem){
                findItem.update({
                    ...req.body
                })
                res.status(200).json({
                    message:"Data berhasil dipulihkan",
                    method:req.method
                })
            }
            else{
                res.status(404).json({
                    message:"Data tidak ditemukan",
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

router.route("/v2/buku/restoreall")
    .put(async(req,res) => {
        try{
            const findItem = await Buku.findAll({where:{soft_delete:1}})
             await Promise.all(
                findItem.map(async(item) => {
                    await item.update({soft_delete:0})
                })
             )
             res.status(200).json({
                message:"Semua data berhasil dipulihkan",
                method:req.method
            })
            
        }
        catch(e){
            res.status(400).json({
                message:e.message,
                method:req.method
            })
        }
    })

module.exports = router