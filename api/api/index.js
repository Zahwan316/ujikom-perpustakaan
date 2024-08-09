const express = require('express');
const port = 3008
const app = express();
const cors = require("cors")
const Buku = require("../route/buku")
const Peminjaman = require("../route/peminjaman")
const Kategori = require("../route/kategoribuku")
const Ulasanbuku = require("../route/ulasanbuku")
const Koleksipribadi = require("../route/koleksipribadi")
const User = require("../route/user")
const Message = require("../route/message")
const Perpus = require("../route/perpus")
const fs = require("fs");
const mime = require("mime-types")
const Supabase = require("../supabase")
//const mime = require('mime');

const corsOptions = {
  origin: "*",
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/img', (req, res, next) => {
    res.setHeader('Content-Disposition', 'inline');
    
    next();
  });

app.get("/",(req,res) => {
    res.status(200).json({
        message:"This Index Page"
    })
})

app.get("/production",(req,res) => {
    res.status(200).json({
        message:"This Production Page"
    })
})

const options = {
    setHeaders:function(res,path,stat){
        res.setHeader('Content-Disposition',"inline")
    }
}

app.use(Buku)
app.use(Peminjaman)
app.use(Kategori)
app.use(Ulasanbuku)
app.use(Koleksipribadi)
app.use(User)
app.use(Perpus)
app.use(Message)

app.use("/img/:filename",async(req,res) => {
  try{
    const fileName = req.params.filename
    const { publicURL,error } = Supabase.storage.from('upload').getPublicUrl("222295.jpg");
  
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Error getting public URL" });
    }

    console.log(publicURL)
    
  
    if(publicURL){
      res.status(200).json({
        message:"Data berhasil diambil",
        data:publicURL
      })
    }
    else{
      res.status(404).json({
        message:"Data tidak ditemukan",
      })
    }

  }
  catch(e){
    console.log(e)
    res.status(404).json({
      message:"Kesalahan Server",
      
    })
  }
})

app.get('/pdf/:file', (req, res) => {
    const filename = req.params.file
    const filePath = `uploads/${filename}`; // Replace with the path to your PDF file
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
  
      const chunksize = (end-start)+1;
      const file = fs.createReadStream(filePath, {start, end});
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': mime.lookup(filePath),
        'Content-Disposition': 'inline; filename="' + filename + '"'
      };
  
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': mime.lookup(filePath)
      };
  
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  });

app.listen(port,() => {
    console.log(`listening at port ${port}`)
})
