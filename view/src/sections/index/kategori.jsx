import { Box, Stack } from "@mui/system";
import { Typography,Button, Skeleton } from '@mui/material';
import KategoriCardComponent from "src/components/card/kategori";
import useItemStore from "../../../state/item";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const KategoriIndex = () => {
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const navigate = useNavigate()

  /* const isFilledKategori = kategori.filter(item => {
    return buku.some(items => item.kategoriID == items.kategori_id)
  }) */

  const getKategoriBuku = () => {
    const kategoriWithBuku = kategori.filter(item => {
      return buku.some(items => item.kategoriID == items.kategori_id)
    })

    const kategoriWithoutBuku = kategori.filter(items => {
      return !kategoriWithBuku.some(item => item.kategoriID === items.kategoriID)
    })

    return kategoriWithBuku.concat(kategoriWithoutBuku)
  }

  const isFilledKategori = getKategoriBuku()

  const redirectToKategori = () => {
    navigate('/kategori')
  }

  useEffect(() => {
    console.log(getKategoriBuku())
  })

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(kategori).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
        }
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
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
                  Object.keys(isFilledKategori).length === 0 ?
                  <>
                    <Skeleton variant='rectangular' width={270} height={120} animation={"wave"} />
                    <Skeleton variant='rectangular' width={270} height={120} animation={"wave"} />
                    <Skeleton variant='rectangular' width={270} height={120} animation={"wave"} />
                    <Skeleton variant='rectangular' width={270} height={120} animation={"wave"} />
                  </>
                  :
                  isFilledKategori.slice(0,4).map(item => 
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