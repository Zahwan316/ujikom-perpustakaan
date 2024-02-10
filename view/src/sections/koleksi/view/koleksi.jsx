import { Stack, Container, Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import useItemStore from '../../../../state/item';
import BookComponent from 'src/components/book/book';
import axios from 'axios';
import useUserStore from '../../../../state/user';
import Swal from 'sweetalert2';

const KoleksiViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [koleksi,setkoleksi] = useItemStore((state) => [state.koleksi,state.setkoleksi])
  const user = useUserStore((item) => item.user)

  const filteredkoleksi = koleksi && koleksi.filter((item) => item.userID === user.userID)
  const handleOpenSwal = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Anda tidak akan dapat mengembalikan data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
        'success'
        )
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

  return(
    <>
      <Container>
        <Stack mb={4}>
          <Typography variant='h4'>Koleksi Buku Saya</Typography>
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
                />
              )
            )
            :
            <Typography variant='body1'>
              Anda belum memiliki koleksi buku
            </Typography>
          }
         
        </Stack>
      </Container>
    </>
  )
}

export default KoleksiViewPage