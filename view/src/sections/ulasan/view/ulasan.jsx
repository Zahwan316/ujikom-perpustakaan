import { Button, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';

import React, { useState, useEffect } from 'react';
import BookComponent from 'src/components/book/book';
import useItemStore from '../../../../state/item';
import axios from 'axios';

const UlasanViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(kategori).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
        }
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
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
        <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"} mb={5}>
            <Typography variant="h4" className='w-1/2'>Ulasan</Typography>
            <Button variant='contained' typebtn="add">+ Ulas</Button>
        </Stack>
        <Stack flexWrap={"wrap"} direction={"row"} gap={"2em"}>
          <BookComponent
            img="./assets/images/zee.jpg"
            title="Zee"
            penulis="Azizi Shafa Ashadel"
            rating="8"
          />
          {
            buku.map((item,index) =>
              <BookComponent
                key={index}
                img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
                title={item.judul}
                penulis={item.penulis}
                rating={item.rating}
              />
            )
          }
         
        </Stack>
      </Container>
    </>
  )
}

export default UlasanViewPage