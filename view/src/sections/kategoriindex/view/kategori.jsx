import IndexUserLayout from "src/layouts/dashboard/indexuser"
import { Typography,Button } from '@mui/material';
import { Box, Stack } from "@mui/system";
import useItemStore from "../../../../state/item";
import React, { useState, useEffect } from 'react';
import KategoriCardComponent from "src/components/card/kategori";
import axios from "axios";

const KategoriIndexViewPage = () => {
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])

  useEffect(() => {
    const fetchdata = async() => {
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
    fetchdata()
  },[])

  return(
   <IndexUserLayout>
    <Box className='min-h-96'>
      <Typography variant='h5' mb={2}>Kategori</Typography>
      <Stack flex flexDirection={"row"} flexWrap={"wrap"} gap={6}>
        {
          Object.keys(kategori).length !== 0?
          kategori.map(item => 
            <KategoriCardComponent
              nama={item.nama_kategori}
              img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
            />
          )
          :
          <Typography>Belum ada data</Typography>
        }
      </Stack>
    </Box>
   </IndexUserLayout>
  )
}

export default KategoriIndexViewPage