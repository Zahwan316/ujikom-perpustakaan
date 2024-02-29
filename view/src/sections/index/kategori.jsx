import { Box, Stack } from "@mui/system";
import { Typography,Button } from '@mui/material';
import KategoriCardComponent from "src/components/card/kategori";
import useItemStore from "../../../state/item";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const KategoriIndex = () => {
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const navigate = useNavigate()

  const redirectToKategori = () => {
    navigate('/kategori')
  }

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(kategori).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])
  return(
    <>
        <Box className='mb-8'>
          <Box mb={2} className='flex justify-between items-center'>
            <Typography  variant='h6'>Kategori</Typography>
            <Typography className="cursor-pointer" variant='body2' onClick={redirectToKategori}>Lihat Semua</Typography>
            
          </Box>
            <Stack flex flexDirection={"row"} gap={4}>
                {
                  kategori.slice(0,4).map(item => 
                    <KategoriCardComponent
                      nama={item.nama_kategori}
                      img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
                    />
                )
                }
            </Stack>
         </Box>
    </>
  )
}

export default KategoriIndex