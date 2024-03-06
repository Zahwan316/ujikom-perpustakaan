import { Box, Stack } from "@mui/system"
import { useNavigate, useParams } from "react-router-dom"
import IndexUserLayout from "src/layouts/dashboard/indexuser"
import { Typography,Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useItemStore from "../../../../state/item";
import BookComponent from "src/components/book/book";
import axios from "axios";


const SelectedKategoriViewPage = () => {
  const {kategoriname} = useParams()
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const findkategori = kategori && kategori.find(item => item.nama_kategori === kategoriname)
  const filterbuku = buku && buku.filter(item => item.kategori_id === findkategori.kategoriID)
  const navigate = useNavigate()

  const redirectToBuku = (slug) => {
    navigate(`/buku/${slug}`)
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(kategori).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
        }
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
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

  useEffect(() => {
    console.log(buku)
  })
  
  return(
    <IndexUserLayout>
      <Box className='min-h-96'>
        <Typography variant='h5' mb={2}>{kategoriname}</Typography>
        <Stack flex flexDirection={"row"} flexWrap={"wrap"} gap={4}>
          {
            Object.keys(filterbuku).length !== 0 ?
            filterbuku.map(item => 
                <BookComponent 
                title={item.judul}
                img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
                penulis={item.penulis}
                id={item.bukuID}
                slug={item.slug}
                perpus={perpus.map(items => items.perpus_id === item.perpus_id && items.nama_perpus)}
                redirect={redirectToBuku}
              /> 
            )
            :
            <Typography variant="body1" className="text-gray-400">Masih kosong,stay tunes ya....</Typography>
          }
        </Stack>
      </Box>
    </IndexUserLayout>
  )
}

export default SelectedKategoriViewPage