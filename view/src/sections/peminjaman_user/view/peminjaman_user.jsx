import { Box, Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import BookComponent from 'src/components/book/book';
import useItemStore from '../../../../state/item';
import useUserStore from '../../../../state/user';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid'
import { Alert, AlertTitle, Snackbar } from '@mui/material';

const PeminjamanUserViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const user = useUserStore((state) => state.user)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState(false)
  const [success,setsuccess] = useState(false)

  const selectedpeminjaman = peminjaman.filter((item) => item.userID === user.userID && item.status_peminjaman === 1)

  const handleModal = (peminjamanid) => {
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
        let res = await axios.put(`${import.meta.env.VITE_APP_URL_API}peminjaman/${peminjamanid}`,{status_peminjaman:2,tanggal_pengembalian:formatteddate})
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

  useEffect(() => {
    const fetchdata = async() => {
      try{
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
    console.log(selectedpeminjaman)
  })

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
        <Stack>
          <Typography variant='h4' mb={4}>
            Buku yang dipinjam
          </Typography>
          <Box className='flex flex-wrap flex-row ' gap={3}>
            {
              selectedpeminjaman.length != 0 ?
              selectedpeminjaman.map(item => 
                buku.map(items => 
                  item.bukuID === items.bukuID &&
                  <BookComponent 
                    title={items.judul}
                    img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                    penulis={items.penulis}
                    //id={items.bukuID}
                    slug={items.slug}
                    handlemodal={handleModal}
                    id={item.peminjamanID}
                  />
                )
              )
              :
              <Typography>Belum ada buku yang dipinjam </Typography>
            }
           
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default PeminjamanUserViewPage;