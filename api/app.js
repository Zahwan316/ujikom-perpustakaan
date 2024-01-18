const express = require('express');
const port = 3008
const app = express();
const cors = require("cors")
const Buku = require("./route/buku")
const Peminjaman = require("./route/peminjaman")
const Kategori = require("./route/kategoribuku")
const PeminjamanDetail = require("./route/peminjaman_detail")
const Ulasanbuku = require("./route/ulasanbuku")
const Koleksipribadi = require("./route/koleksipribadi")
const User = require("./route/user")
const Perpus = require("./route/perpus")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.get("/",(req,res) => {
    res.status(200).json({
        message:"success"
    })
})
app.use(Buku)
app.use(Peminjaman)
app.use(Kategori)
app.use(PeminjamanDetail)
app.use(Ulasanbuku)
app.use(Koleksipribadi)
app.use(User)
app.use(Perpus)

app.listen(port,() => {
    console.log(`listening at port ${port}`)
})