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

app.listen(port,() => {
    console.log(`listening at port ${port}`)
})