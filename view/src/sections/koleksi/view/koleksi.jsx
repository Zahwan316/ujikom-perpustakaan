import { Stack, Container, Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import useItemStore from '../../../../state/item';
import BookComponent from 'src/components/book/book';
import axios from 'axios';
import useUserStore from '../../../../state/user';
import Swal from 'sweetalert2';
import useFormStore from '../../../../state/form';
import {v4 as uuidv4} from "uuid"
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const KoleksiViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [koleksi,setkoleksi] = useItemStore((state) => [state.koleksi,state.setkoleksi])
  const user = useUserStore((item) => item.user)
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [clickedswal,setclickedswal] = useState()
  const [isloadedid,setisloadedid] = useState()
  const [swalid,setswalid] = useState()
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [success,setsuccess] = useState(false)
  const navigate = useNavigate()

  const filteredkoleksi = koleksi && koleksi.filter((item) => item.userID === user.userID)
  const handleOpenSwal = (id) => {
    setswalid(id)
    setclickedswal(uuidv4())
    setisloadedid(true)
    setTimeout(() => {
      setisloadedid(false)
    }, 500);

    Swal.fire({
      title: 'Peringatan !',
      text: "Apakah anda ingin meminjam atau menghapus buku ini dari koleksi ?",
      icon: 'warning',
      showCancelButton: true,
      showDenyButton:true,
      showConfirmButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonText:"Tutup",
      denyButtonColor: '#d33',
      confirmButtonText: 'Saya ingin pinjam',
      denyButtonText:"Hapus dari koleksi"
    }).then( async(result) => {
      if (result.isConfirmed) {
       // const res = await axios.post(`${import.meta.env.VITE_APP_URL_API}peminjaman`,form)
      }
      else if(result.isDenied){
        const deletedata = async() => {
          try{
            const res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}bookmark/${id}`)
            setsuccess(true)
            setupdater(uuidv4())
            setisload(true)
            setTimeout(() => {
              setisload(false)
              setsuccess(false)
            }, 1500);
          }
          catch(e){
            console.log(e)
          }
        }
        deletedata()
      }
    })
  }

  const redirect = (slug) => {
    navigate(`/buku/${slug}`)
  }

  useEffect(() => {
    if(isloadedid){
        const findkoleksi = koleksi.find((item) => item.koleksiID === swalid)
        const now = new Date()
        const option = {year:"numeric",month:'2-digit',day:"2-digit"}
        const formatteddate = now.toLocaleDateString("en-CA",option)
        setform("userID",user.userID)
        setform("bukuID",2)
        setform("perpus_id",user.perpus_id)
        setform("tanggal_peminjaman",formatteddate)
        setform("status_peminjaman",1)
        console.log(form)
    }
  },[clickedswal])

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(koleksi).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}bookmark`)
          setkoleksi(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    if(isload){
      const refetchdata = async() => {
        try{
          const res_koleksi = await axios.get(`${import.meta.env.VITE_APP_URL_API}bookmark`)
          setkoleksi(res_koleksi.data.data)
        }
        catch(e){
          console.log(e)
        }
      }
      refetchdata()
    }
  },[updater])

  useEffect(() => {
    console.log(isloadedid)
  })

  return(
    <>
      <Container>
      {
          success && 
            <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w 3/2'>
              <Alert variant='filled' severity='success' className='w-full'>
                <AlertTitle>Berhasil</AlertTitle>
                Buku berhasil dihapus dari favorit
              </Alert>
            </Snackbar>
        }
        <Stack mb={4}>
          <Typography variant='h4'>Buku favorit saya</Typography>
        </Stack>
        <Stack direction={'row'} flexWrap={'wrap'} gap={3}>
          {
            Object.keys(filteredkoleksi).length != 0 ?
            filteredkoleksi.map((item) => 
              buku.map(items => 
                items.bukuID === item.bukuID &&
                <BookComponent 
                  key={item.bukuID} 
                  title={items.judul}
                  slug={items.slug}
                  img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                  penulis={items.penulis}
                  id={item.koleksiID}
                  redirect={redirect}
                  // handlemodal={handleOpenSwal}
                />
              )
            )
            :
            <Typography variant='body1'>
              Anda belum memiliki favorit buku
            </Typography>
          }
         
        </Stack>
      </Container>
    </>
  )
}

export default KoleksiViewPage