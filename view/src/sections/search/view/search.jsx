import { Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useItemStore from '../../../../state/item';
import BookComponent from 'src/components/book/book';
import axios from 'axios';

const SearchViewPage = () => {
  const {text} = useParams()
  const redirect = useNavigate()
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])

  const handleRedirectToSlug = (slug) => {
    redirect(`/buku/${slug}`)
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    console.log(text)
  })
  return(
    <>
      <Container>
        <Stack className='' mb={4}>
          <Typography variant="h4">
              Pencarian Anda
          </Typography>
        </Stack>
        <Stack flex flexWrap={"wrap"} flexDirection={"row"} gap={4}>
          {
            buku.map(items => 
              items.judul.toLowerCase().includes(text.toLowerCase()) &&
              <BookComponent 
                img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                title={items.judul}
                penulis={items.penulis}
                slug={items.slug}
                id={items.bukuID}
                redirect={handleRedirectToSlug}
              />    
            )
          }
        </Stack>
      </Container>
    </>
  )
}

export default SearchViewPage