import { Button, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';

import React, { useState, useEffect } from 'react';
import BookComponent from 'src/components/book/book';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import ModalComponent from 'src/components/modal/modal';
import UlasanModalContent from 'src/components/modal/content/ulasan';
import useUserStore from '../../../../state/user';

const UlasanViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [user,setuser] = useItemStore((state) => [state.user,state.setuser])
  const [modal,setmodal] = useState(false)
  const [ulasan,setulasan] = useItemStore((state) => [state.ulasan,state.setulasan])
  const [editedid,seteditedid] = useState()
  const user_logged = useUserStore((state) => state.user)
  const filteredbuku = buku.filter((item) => item.perpus_id === user_logged.perpus_id)

  const handleModal = (id) => {
    setmodal(!modal)
    handleGetId(id)
  }

  const handleGetId = (id) => {
    seteditedid(id)
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
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
        if(Object.keys(ulasan).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`)
          setulasan(res.data.data)
        }
        if(Object.keys(user).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
          setuser(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    const fetchdata = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`)
        setulasan(res.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    if(editedid){
      fetchdata()
    }
  },[editedid])

  useEffect(() => {
    console.log(editedid)
    console.log(ulasan)
  })

  return(
    <>
      <Container>
        <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"} mb={5}>
            <Typography variant="h4" className='w-1/2'>Ulasan</Typography>
    
        </Stack>
        <Stack flexWrap={"wrap"} direction={"row"} gap={"2em"}>
          {/* <BookComponent
            img="./assets/images/zee.jpg"
            title="Zee"
            penulis="Azizi Shafa Ashadel"
            rating="8"
          /> */}
          {
            user_logged.access_level === 0 ?
            buku.map((item,index) =>
              <BookComponent
                key={index}
                img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
                title={item.judul}
                penulis={item.penulis}
                rating={item.rating}
                id={item.bukuID}
                handlemodal={handleModal}
                
              />
            )
            :
            filteredbuku.map((item,index) =>
            <BookComponent
              key={index}
              img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
              title={item.judul}
              penulis={item.penulis}
              rating={item.rating}
              id={item.bukuID}
              handlemodal={handleModal}
              
            />
          )
          }
         
        </Stack>
      </Container>
      {
        modal &&
        <ModalComponent 
          title="Semua Ulasan"
          handlemodal={handleModal}
          size="lg"
          body={<UlasanModalContent setmodal={setmodal} id={editedid} />}
          type="view"
        />
      }
    </>
  )
}

export default UlasanViewPage