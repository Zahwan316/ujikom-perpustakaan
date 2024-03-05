
import React, { useState, useEffect } from 'react';
import { Box, Container, Stack } from '@mui/system';
import { Typography,Button } from '@mui/material';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import useUserStore from '../../../../state/user';
import BookComponent from 'src/components/book/book';
import ModalComponent from 'src/components/modal/modal';
import UlasanForm from 'src/components/form/ulasan';
import useFormStore from '../../../../state/form';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from "uuid"

const UlasanUserViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])
  const [ulasan,setulasan] = useItemStore((state) => [state.ulasan,state.setulasan])
  const [modal,setmodal] = useState(false)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [bukuid,setbukuid] = useState()
  const form = useFormStore((state) => state.form)
  const peminjamanfilter = peminjaman.filter((item) => item.userID === user.userID)
  const [displayedBooks, setDisplayedBooks] = useState(new Set());

  const handleModal = (id) => {
    setmodal(!modal)
    setbukuid(id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const sendData = async() => {
      try{
        let res = await axios.post(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`,form)
        Swal.fire({
          title:"Berhasil",
          text:"Ulasan berhasil dikirim",
          icon:"success"
        })
        setmodal(false)
        setisload(true)
        setupdater(uuidv4())
        setTimeout(() => {
          setisload(false)
        }, 500);
      }
      catch(e){
        console.log(e)
      }
    }
    sendData()
  }

  useEffect(() => {
    const refetchData = async() => {
      try{
        let res_ulasan = await axios.get(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`)
        setulasan(res_ulasan.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    if(isload){
      refetchData()
    }
  },[updater])

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

  useEffect(() => {
    console.log(bukuid)
  })

  return(
    <>
      <Container>
        <Stack>
          <Typography variant='h4' mb={4}>
            Buku yang pernah dipinjam
          </Typography>
          <Box className='flex flex-row flex-wrap' gap={4}>
            {
              peminjamanfilter.length != 0 ?
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
              :
              <Typography variant='body1'>
                Anda belum meminjam buku
              </Typography>
            }
          </Box>
        </Stack>

      </Container>
      {
        modal &&
        <ModalComponent 
          title="Berikan ulasan"
          handlemodal={handleModal}
          body={<UlasanForm id={bukuid} />}
          id={bukuid}
          handlesubmit={handleSubmit}
        />
      }
    </>
  )
}

export default UlasanUserViewPage