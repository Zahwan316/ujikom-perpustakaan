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

  function getRandomSubarray(arr, size) {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, size);
  }
  
  const limitbuku = buku.slice(buku.length - 6,buku.length - 1)


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


  const bukuOrderByKategori = buku.filter(item => currkategori != 0 ? item.kategori_id == currkategori : item)



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
        
      }
    }
    fetchdata()
  },[])


  return(
    <>
      <Container>
        <Stack mb={6}>
          <Box className='flex justify-between' mb={4}>
            <Typography variant='h4'>
              Rekomendasi
            </Typography>
           
          </Box>
          <Box className='flex flex-row gap-6 '>
            {
              limitbuku.map(item => 
                <BookComponent 
                  img={`${import.meta.env.IMG_URL}img/${item.img}`}
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
              
            </Box>
          <Box mb={4} className='flex flex-wrap gap-2'>
            <BtnGroup 
              buttongroup={buttongroup}
              handlecategory={handleCurrKategori}
             />
          </Box>
          <Box className='flex flex-row gap-6 flex-wrap'>
            {
              bukuOrderByKategori.length != 0?
              bukuOrderByKategori.map(item => 
                item.stok != 0 &&
                <BookComponent 
                  img={`${import.meta.env.IMG_URL}img/${item.img}`}
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