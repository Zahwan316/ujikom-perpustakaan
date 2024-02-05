import { Box, Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import BookComponent from 'src/components/book/book';
import useItemStore from '../../../../state/item';
import useUserStore from '../../../../state/user';
import axios from 'axios';

const PeminjamanUserViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const user = useUserStore((state) => state.user)

  const selectedpeminjaman = peminjaman.filter((item) => item.userID === user.userID)

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
    console.log(selectedpeminjaman)
  })

  return(
    <>
      <Container>
        <Stack>
          <Typography variant='h4' mb={4}>
            Buku yang dipinjam
          </Typography>
          <Box className='flex flex-wrap flex-row ' gap={3}>
            {
              selectedpeminjaman.map(item => 
                buku.map(items => 
                  item.bukuID === items.bukuID &&
                  <BookComponent 
                    title={items.judul}
                    img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                    penulis={items.penulis}
                    id={items.bukuID}
                    slug={items.slug}
                  />
                )
              )
            }
           
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default PeminjamanUserViewPage;