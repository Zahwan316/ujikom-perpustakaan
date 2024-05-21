import { Box, Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';

import useItemStore from '../../../../state/item';
import useUserStore from '../../../../state/user';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid'
import { Alert, AlertTitle, Snackbar } from '@mui/material';

import UlasanUserViewPage from 'src/sections/ulasanuser/view/ulasanuser'  ;
import BukuContentPeminjaman from '../bukucontent';
import ModalComponent from 'src/components/modal/modal';
import useStateStore from '../../../../state/state';
import PeminjamanUserModal from 'src/components/modal/content/peminjamanuser' ;
import UlasanForm from 'src/components/form/ulasan' ;
import useFormStore from '../../../../state/form';

const PeminjamanUserViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const user = useUserStore((state) => state.user)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState(false)
  const [success,setsuccess] = useState(false)
  const [pagetextpdf,setpagetextpdf] = useState()
  const [modal,setmodal] = useState(false)
  const [modal2,setmodal2] = useState(false)
  const [bukuid,setbukuid] = useStateStore((state) => [state.bukuid,state.setbukuid])
  const form = useFormStore((state) => state.form)
  const [ulasan,setulasan] = useItemStore((state) => [state.ulasan,state.setulasan])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const selectedpeminjaman = peminjaman.filter((item) => item.userID === user.userID && item.status_peminjaman === 1)
  const filteredpeminjaman = peminjaman && peminjaman.find(item => item.peminjamanID === bukuid) || false
  const selectedbuku = buku && buku.find(item => filteredpeminjaman.bukuID === item.bukuID)

  const handleModal = (peminjamanid) => {
    setmodal(false)
    Swal.fire({
      title:"Yakin",
      text:"Apakah anda ingin mengembalikan buku ini",
      icon:"warning",
      showCancelButton:true,
    }).then(async(result) => {
      if(result.isConfirmed){
        const now = new Date()
        const option = {year:"numeric",month:'2-digit',day:"2-digit"}
        const formatteddate = now.toLocaleDateString("en-CA",option)
        let res = await axios.put(`${import.meta.env.VITE_APP_URL_API}peminjaman/${bukuid}`,{status_peminjaman:2,tanggal_pengembalian:formatteddate})
        setupdater(uuidv4())
        setisload(true)
        setsuccess(true)
        setTimeout(() => {
          setisload(false)
          setsuccess(false)
        }, 1500);
      }
    })
  }

  const handleModal2 = () => {
    setmodal2(!modal2)
    setmodal(false)
  }

  const handleopenbook = async() => {
    try {

     window.location.href = `read/${selectedbuku.slug}`
  } catch (error) {
      Swal.fire({
        title:"error",
        icon:"error",
        text:"Kesalahan server"
      })
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setmodal2(false)
    const sendData = async() => {
      try{
        let res = await axios.post(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`,form)
        Swal.fire({
          title:"Berhasil",
          text:"Ulasan berhasil dikirim",
          icon:"success"
        }).then((result) => {
          if(result.isConfirmed){
            setmodal(true)
          }
        })
        setmodal(false)
        setisload(true)
        setupdater(uuidv4())
        setTimeout(() => {
          setisload(false)
        }, 500);
      }
      catch(e){
        console.log(e)
      }
    }
    sendData()
  }

  const handleMenuModal = (id) => {
   setmodal(!modal)
   setbukuid(id)
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
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
        let res_peminjaman = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
        setpeminjaman(res_peminjaman.data.data)

        let res_ulasan = await axios.get(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`)
        setulasan(res_ulasan.data.data)

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


  return(
    <>
      <Container>
        {
          success && 
            <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w 3/2'>
              <Alert variant='filled' severity='success' className='w-full'>
                <AlertTitle>Berhasil</AlertTitle>
                Buku berhasil dikembalikan
              </Alert>
            </Snackbar>
        }
        <Stack mb={4}>
          <Typography variant='h4' mb={4}>
            Buku yang dipinjam
          </Typography>
         <BukuContentPeminjaman 
           selectedpeminjaman={selectedpeminjaman}
           buku={buku}
           handleModal={handleMenuModal}
         />
      
        </Stack>

        {
          modal &&
          <ModalComponent 
            title="Menu Buku"
            handlemodal={handleMenuModal}
            size="xl"
            type='view'
            body={<PeminjamanUserModal
               buku={selectedbuku}
               handleReturnBook={handleModal}
               handleOpenBook={handleopenbook} 
               handleUlasBuku={handleModal2}
               perpus={perpus}
              />}
            
          />
        }

        {
          modal2 && 
          <ModalComponent 
            title="Ulas Buku"
            handlemodal={handleModal2}
            body={<UlasanForm id={selectedbuku.bukuID} />}
            handlesubmit={handleSubmit}
            />
        }

        <UlasanUserViewPage />
      </Container>
    </>
  )
}

export default PeminjamanUserViewPage;