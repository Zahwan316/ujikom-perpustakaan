import { Box, Container, Stack } from '@mui/system';
import { Typography,Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BookComponent from 'src/components/book/book';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import BtnGroup from 'src/components/button/buttongroup';
import ModalComponent from 'src/components/modal/modal';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../../../state/form';

const HomePageView = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [currkategori,setcurrkategori] = useState(0)
  const [ulasan,setulasan] = useItemStore((state => [state.ulasan,state.setulasan]))
  const [modal,setmodal] = useState(false)
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const navigate = useNavigate()

  const limitbuku = buku.slice(0,5)

  const grouprating = ulasan.reduce((acc,rating) => {
    if(!acc[rating.bukuID]){
      acc[rating.bukuID] = []
    }
    acc[rating.bukuID].push(rating)
    return acc
  },{})

 /*  const bukuwithrating = buku.map(buku => {
    const ratingbuku = grouprating[buku.bukuID]
    const totalrating = ratingbuku.reduce((acc,rating) => acc + rating.rating,0)
    const avgrating = ratingbuku.length ? totalrating / ratingbuku.length : 0
    return {...buku,avgrating}
  }) */

  const buttongroup = kategori.map(item => {return {value:item.kategoriID,label:item.nama_kategori}})
  
  const handleCurrKategori = (category) => {
    setcurrkategori(category)
  }

  const handlemodal = () => {
    setmodal(!modal)
  }

  const redirect = (slug) => {
    navigate(`/buku/${slug}`)
  }

  const redirectToKategoriPage = () => {
    navigate("/kategori")
  }

  const bukuOrderByKategori = buku.filter(item => currkategori != 0 ? item.kategori_id == currkategori : item)
  const bukuOrderByKategoriLimit = bukuOrderByKategori.slice(0,5)

  const redirectToRekomendasiPage = () => {
    navigate("/rekomendasi")
  }

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
        if(Object.keys(ulasan).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`)
          setulasan(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    console.log(form)
  })

  return(
    <>
      <Container>
        <Stack mb={6}>
          <Box className='flex justify-between' mb={4}>
            <Typography variant='h4'>
              Rekomendasi
            </Typography>
            <Button variant='contained' onClick={redirectToRekomendasiPage}>Lihat Semua</Button>
          </Box>
          <Box className='flex flex-row gap-6 '>
            {
              limitbuku.map(item => 
                <BookComponent 
                  img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
                  title={item.judul}
                  penulis={item.penulis}
                  id={item.id}
                  
                  slug={item.slug}
                  redirect={redirect}
                />
                )
            }
            
          </Box>
        </Stack>
        <Stack>
            <Box className='flex justify-between'>
              <Typography variant='h4' mb={2}>
                Kategori
              </Typography>
              <Button variant='contained' onClick={redirectToKategoriPage} >Lihat Semua</Button>
            </Box>
          <Box mb={4}>
            <BtnGroup 
              buttongroup={buttongroup}
              handlecategory={handleCurrKategori}
             />
          </Box>
          <Box className='flex flex-row gap-6 flex-wrap'>
            {
              bukuOrderByKategori.length != 0?
              bukuOrderByKategori.map(item => 
                <BookComponent 
                  img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
                  title={item.judul}
                  penulis={item.penulis}
                  handlemodal={handlemodal}
                  id={item.id}
                  redirect={redirect}
                  slug={item.slug}
                />
                )
                :
                <Typography variant='body1' mb={2}>
                  Masih kosong,stay tunes ya.....
                </Typography>
            }
            
          </Box>
        </Stack>
      </Container>
      {
        modal &&
        <ModalComponent
          handlemodal={handlemodal}
        />
      }
    </>
  )
}

export default HomePageView