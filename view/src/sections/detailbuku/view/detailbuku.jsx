import { Stack, Container, Box } from '@mui/system';
import { Typography,Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DescriptionDetailBukuComponent from '../description';
import UlasanDetailBukuComponent from '../ulasan';
import { useParams } from 'react-router-dom';
import useItemStore from '../../../../state/item';
import axios from 'axios';

const DetailBukuView = () => {
  const {slug} = useParams()
  const [buku, setBuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [ulasan,setUlasan] = useItemStore((state) => [state.ulasan,state.setulasan])
  const [user,setuser] = useItemStore((state) => [state.user,state.setuser])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])

  const detailbuku = buku && buku.find(item => item.slug === slug)
  const detailulasan = ulasan && ulasan.filter((item) => item.bukuID === detailbuku.bukuID)

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setBuku(res.data.data)
        }
        if(Object.keys(ulasan).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`)
          setUlasan(res.data.data)
        }
        if(Object.keys(user).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
          setuser(res.data.data)
        }
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
        if(Object.keys(kategori).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    console.log(detailulasan)
  })

  return(
    <>
      <Container>
        <Stack direction={"row"} gap={8} mb={6}>
          <Box className='w-72'>
            <img 
              src={`${import.meta.env.VITE_APP_URL_API}img/${detailbuku && detailbuku.img}`}
              className='rounded-md w-full h-full'
             />
          </Box>
          <DescriptionDetailBukuComponent
           buku={detailbuku} 
          />
        </Stack>
        <UlasanDetailBukuComponent 
          buku={detailbuku} 
          ulasan={detailulasan} 
          user={user}
        />
      </Container>
    </>
  )
}

export default DetailBukuView;