import { Stack, Container, Box } from '@mui/system';
import { Typography,Button } from '@mui/material';
import useFormStore from '../../../state/form';
import useUserStore from '../../../state/user';
import React, { useState, useEffect } from 'react';
import useItemStore from '../../../state/item';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DescriptionDetailBukuComponent = (props) => {
  const [form,setform,resetform] = useFormStore((state) => [state.formdetailbuku,state.setformdetailbuku,state.resetformdetailbuku])
  const user = useUserStore((state) => state.user)
  const [koleksi,setkoleksi] = useItemStore((state) => [state.koleksi,state.setkoleksi])
  const [updater,setupdate] = useState()
  const [isload,setisload] = useState(false)
  const [success,setsuccess] = useState(false)
  const [alerttype,setalerttype] = useState("")
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [limitbuku,setlimitbuku] = useState(false)
  const navigate = useNavigate()
  const Bookmarkicon = (<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg></i>)
  const selectedbookmark = koleksi.find(item => item.userID === user.userID && item.bukuID === props.buku.bukuID) || false
  const selectedpeminjamanlast = peminjaman.filter(item => item.userID === user.userID && item.bukuID === props.buku.bukuID) || false
  const selectedpeminjaman = selectedpeminjamanlast[selectedpeminjamanlast.length - 1] || false
 // const findPeminjamantest = peminjaman.find(item => item.bukuID === props.buku.bukuID && item.userID === user.userID )
  const BookHasOwnedByUser = peminjaman != [] && peminjaman.filter(item => item.userID === user.userID && item.status_peminjaman === 1)
  const CheckBookUser = peminjaman && peminjaman.find(item => item.userID === user.userID && item.status_peminjaman === 1 && item.bukuID === props.buku.bukuID) || false

  const handlebookmark = () => {
    if(Object.keys(user).length === 0){
      navigate("/login")
    }
    else{
      props.handlebookmark(form)
      setupdate(uuidv4())
      setisload(true)
      setsuccess(true)
      setalerttype("bookmark")
      setTimeout(() => {
        setisload(false)
        setsuccess(false)
      }, 1500);
    }
  }

  const handleRemoveBookmark = () => {
    props.handleremovebookmark(`v2/bookmark/user/${user.userID}/buku/${props.buku.bukuID}`,form)
    setupdate(uuidv4())
    setisload(true)
    setsuccess(true)
    setalerttype("bookmark")
    setTimeout(() => {
      setisload(false)
      setsuccess(false)
    }, 1500);
  }

  const hitungTanggalPengembalian = (tanggalPinjam, durasiPeminjaman) => {
    const tanggalPinjamObj = new Date(tanggalPinjam);
    const tanggalKembaliObj = new Date(tanggalPinjamObj.getTime() + durasiPeminjaman * 24 * 60 * 60 * 1000);
    return tanggalKembaliObj.toLocaleDateString('en-CA'); 
};

  const handlePinjamBuku = async() => {
    try{
      if(Object.keys(user).length === 0){
        navigate("/login")
      }
      else{
        Swal.fire({
          title:"Yakin",
          text:"Apakah anda ingin meminjam buku ini ?",
          icon:"warning",
          showCancelButton:true,
        }).then(async(result) => {
          if(result.isConfirmed){
            let res = await axios.post(`${import.meta.env.VITE_APP_URL_API}peminjaman`,form) 
            setupdate(uuidv4())
            setalerttype("pinjam")
            setisload(true)
            setsuccess(true)
         
            setTimeout(() => {
              setsuccess(false)
              setisload(false)
            }, 1500);
            setTimeout(async() => {
              // const findPeminjaman = peminjaman.find(item => item.bukuID === props.buku.bukuID && item.userID === user.userID && item.status_peminjaman === 1)
              // console.log(findPeminjaman)
              // const settanggalkembali = hitungTanggalPengembalian(findPeminjaman.tanggal_peminjaman,props.buku.durasi_buku)
              // const res_update = await axios.put(`${import.meta.env.VITE_APP_URL_API}peminjaman/${findPeminjaman.peminjamanID}`,{tanggal_pengembalian:settanggalkembali})
            },3000)
          }
        })
      }
    }
    catch(e){
      console.log(e)
    }
  }

  const checkobjvalue = (obj,key,value) => {
    const keys = Object.keys(obj)
    for(const k of keys){
      if(k === key && obj[k] === value){
        return true
      }
    }
    return false
  }

  const handleBacaBuku = () => {
    window.location.href = `/read/${props.buku.slug}`
  }

  useEffect(() => {
    console.log(BookHasOwnedByUser)
  },[BookHasOwnedByUser])

  useEffect(() => {
    if(props.perpus && props.perpus.length > 0){
      const now = new Date()
      const option = {year:"numeric",month:'2-digit',day:"2-digit"}
      const formatteddate = now.toLocaleDateString("en-CA",option)
      if(props.buku ){
        setform("bukuID",props.buku.bukuID)
        setform('userID',user.userID)
        setform('perpus_id',user.perpus_id)
        setform('status_peminjaman',1)
        setform('tanggal_peminjaman',formatteddate)
      }

    }
  },[props.buku,user,props.perpus])

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(koleksi).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}bookmark`)
          setkoleksi(res.data.data)
        }
        if(Object.keys(peminjaman).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
          setpeminjaman(res.data.data)
        }
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    const refetchdata = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}bookmark`)
        setkoleksi(res.data.data)

        let res_peminjaman = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
        setpeminjaman(res_peminjaman.data.data)

        let res_buku = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
        setbuku(res_buku.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    
    if(isload){
      refetchdata()
    
    }
  },[updater])

  useEffect(() => {
    const updateDataKembali = async() => {
      const findPeminjaman = peminjaman.find(item => item.bukuID === props.buku.bukuID && item.userID === user.userID && item.status_peminjaman === 1)
      console.log(findPeminjaman)
      console.log(props.buku.bukuID)
      const settanggalkembali = hitungTanggalPengembalian(findPeminjaman.tanggal_peminjaman,props.buku.durasi_buku)
      const res = await axios.put(`${import.meta.env.VITE_APP_URL_API}peminjaman/${findPeminjaman.peminjamanID}`,{tanggal_pengembalian:settanggalkembali})
    }
    if(isload){
      updateDataKembali()
    }
  },[peminjaman,updater])

  useEffect(() => {
   // console.log(checkobjvalue(selectedpeminjaman,"status_peminjaman",2))
   //console.log(hitungTanggalPengembalian(BookHasOwnedByUser[0].tanggal_peminjaman,props.buku.durasi_buku))
  console.log(CheckBookUser)
  })

  return(
    <>
        {
          success &&
          <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w 3/2'>
              <Alert variant='filled' severity='success' className='w-full'>
                <AlertTitle>Berhasil</AlertTitle>
                {
                  alerttype === "bookmark" &&
                  Object.keys(selectedbookmark).length !== 0 ?
                  'Buku berhasil ditambahkan ke dalam favorit'
                  :
                  (alerttype === "pinjam" &&
                  Object.keys(selectedpeminjaman).length !== 0 ?
                   'Buku berhasil dipinjam' : 'Buku berhasil dikembalikan')
                }
                {/* {
                  alerttype === "pinjam" &&
                  Object.keys(selectedpeminjaman).length !== 0?
                  'Buku berhasil dipinjam'
                  :
                  'Buku berhasil dikembalikan'
                } */}
              </Alert>
          </Snackbar>
        }
        <Box className='w-2/3 '>
            <Box mb={4}>
              <Typography variant='h3'>
                {props.buku && props.buku.judul}
              </Typography>
              <Typography variant='h6'>
                {props.buku && props.buku.penulis}
              </Typography>
              <Typography variant='body2' >
                {props.buku && props.buku.penerbit}
              </Typography>
              <Typography variant='body2' mb={2}>
                {props.buku && perpus.map(item => item.perpus_id === props.buku.perpus_id && item.nama_perpus)}
              </Typography>
              {/* <Typography>
                Stok : {props.buku && props.buku.stok}
              </Typography> */}
            </Box>
            <Box>
                <Box className='flex gap-3 mb-4'>
                  {/* {
                    CheckBookUser &&
                    <Button variant='contained' onClick={handleBacaBuku} color='success'>Baca Buku</Button>
                  } */}
                  {
                    selectedpeminjaman != undefined &&
                    Object.keys(BookHasOwnedByUser).length > 3 ?
                    <Button variant='contained' color='warning' >Buku yang dipinjam sudah dalam batas maksimal </Button>                   
                    : 
                    selectedpeminjaman.status_peminjaman === 2 || Object.keys(selectedpeminjaman).length === 0 ?
                    <Button variant='contained' onClick={handlePinjamBuku} >Pinjam</Button>
                    :    
                    <Button variant='contained' color='secondary' >Buku sedang dipinjam</Button>  
                           
                  }

                    {
                      selectedbookmark != undefined &&
                      Object.keys(selectedbookmark).length === 0 ?
                      <Button variant='contained' onClick={handlebookmark} startIcon={Bookmarkicon }>Tambahkan ke favorit</Button>
                      :
                      <Button variant='contained' onClick={handleRemoveBookmark}>Buku ini sudah masuk ke favorit</Button>
                    }
                </Box>
                <Box>
                  <Typography>
                    {props.buku && props.buku.sinopsis}
                  </Typography>
                </Box>
            </Box>
          </Box>
    </>
  )
}

export default DescriptionDetailBukuComponent