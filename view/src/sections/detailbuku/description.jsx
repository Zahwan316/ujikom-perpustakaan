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

  const Bookmarkicon = (<i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg></i>)

  const handlebookmark = () => {
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

  const handlePinjamBuku = async() => {
    try{
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
        }
      })
    }
    catch(e){
      console.log(e)
    }
  }

  const selectedbookmark = koleksi.find(item => item.userID === user.userID && item.bukuID === props.buku.bukuID) || false
  const selectedpeminjamanlast = peminjaman.filter(item => item.userID === user.userID && item.bukuID === props.buku.bukuID) || false
  const selectedpeminjaman = selectedpeminjamanlast[selectedpeminjamanlast.length - 1] || false

  const checkobjvalue = (obj,key,value) => {
    const keys = Object.keys(obj)
    for(const k of keys){
      if(k === key && obj[k] === value){
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if(props.perpus && props.perpus.length > 0){
      const now = new Date()
      const option = {year:"numeric",month:'2-digit',day:"2-digit"}
      const formatteddate = now.toLocaleDateString("en-CA",option)
      if(props.buku ){
        setform("bukuID",props.buku.bukuID)
        setform('userID',user.userID)
        setform('perpus_id',perpus[0].perpus_id)
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
   // console.log(checkobjvalue(selectedpeminjaman,"status_peminjaman",2))
    console.log(selectedpeminjaman.status_peminjaman)
    console.log(selectedpeminjaman)
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
                  'Buku berhasil ditambahkan ke dalam koleksi pribadi'
                  :
                  'Buku berhasil dihapus dari koleksi pribadi'

                }
                {
                  alerttype === "pinjam" &&
                  Object.keys(selectedpeminjaman).length !== 0?
                  'Buku berhasil dipinjam'
                  :
                  'Buku berhasil dikembalikan'
                }
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
              <Typography variant='body2'>
                {props.buku && props.buku.penerbit}
              </Typography>
            </Box>
            <Box>
                <Box className='flex gap-3 mb-4'>
                  {
                    selectedpeminjaman != undefined &&
                    selectedpeminjaman.status_peminjaman === 2 || Object.keys(selectedpeminjaman).length === 0 ?
                    <Button variant='contained' onClick={handlePinjamBuku} >Pinjam</Button>
                    :
                    <Button variant='contained' >Buku sedang dipinjam</Button>
                  }

                    {
                      selectedbookmark != undefined &&
                      Object.keys(selectedbookmark).length === 0 ?
                      <Button variant='contained' onClick={handlebookmark} startIcon={Bookmarkicon }>Bookmark</Button>
                      :
                      <Button variant='contained' onClick={handleRemoveBookmark}>Buku sudah di bookmark</Button>
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