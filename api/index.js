const express = require('express');
const port = 3008
const app = express();
const cors = require("cors")
const Buku = require("./route/buku")
const Peminjaman = require("./route/peminjaman")
const Kategori = require("./route/kategoribuku")
const Ulasanbuku = require("./route/ulasanbuku")
const Koleksipribadi = require("./route/koleksipribadi")
const User = require("./route/user")
const Message = require("./route/message")
const Perpus = require("./route/perpus")
const fs = require("fs");
const mime = require("mime-types")
//const mime = require('mime');

app.use(express.json())
app.use(cors())
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
        message:"success"
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
app.use("/img",express.static("uploads",options))


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
