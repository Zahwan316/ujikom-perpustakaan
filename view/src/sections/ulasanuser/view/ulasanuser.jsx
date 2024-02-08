
import React, { useState, useEffect } from 'react';
import { Box, Container, Stack } from '@mui/system';
import { Typography,Button } from '@mui/material';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import useUserStore from '../../../../state/user';
import BookComponent from 'src/components/book/book';
import ModalComponent from 'src/components/modal/modal';
import UlasanForm from 'src/components/form/ulasan';

const UlasanUserViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])
  const [modal,setmodal] = useState(false)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()

  const handleModal = () => {
    setmodal(!modal)
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(peminjaman).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
          setpeminjaman(res.data.data)
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
        <Stack>
          <Typography variant='h4' mb={4}>
            Ulas buku
          </Typography>
          <Box className='flex flex-row flex-wrap' gap={4}>
            {
              peminjaman.map((item) => 
                item.status_peminjaman === 2 && item.userID === user.userID &&
                buku.map(items => 
                  items.bukuID === item.bukuID &&
                  <BookComponent 
                    img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                    title={items.judul}
                    id={item.bukuID}
                    penulis={items.penulis}
                    slug={items.slug}
                    handlemodal={handleModal}
                  />

                )
              )
            }
          </Box>
        </Stack>

      </Container>
      {
        modal &&
        <ModalComponent 
          title="Berikan ulasan"
          handlemodal={handleModal}
          body={<UlasanForm />}
        />
      }
    </>
  )
}

export default UlasanUserViewPage