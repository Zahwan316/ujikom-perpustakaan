import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import useItemStore from '../../../../state/item';
import BookComponent from 'src/components/book/book';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPageView = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const navigate = useNavigate()

  const redirectLogin = () => {
    navigate('/login')
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

  return(
    <>
      <Container className='p-4 px-8 w-full' maxWidth="xl">
        <Box className='mb-8'>
          <ul className='flex justify-between items-center'>
            <Box>
              <li>
                <Typography variant='h3'>Smea Perpus</Typography>
              </li>
            </Box>
            <Box className='flex flex-row gap-8 items-center'>
              <li>
                <Typography variant='body'>Home</Typography>
              </li>
              <li>
                <Button variant='contained' onClick={redirectLogin}>Login</Button>
              </li>
            </Box>
          </ul>
        </Box>   
        <Box className='w-100 h-3/4  p-4 flex items-center justify-between mb-16'>
          <Box className='w-2/6'>
            <Typography variant='h2' mb={1}>
                Smea Perpus
            </Typography>
            <Typography variant='subtitle1' mb={3}>
            Selamat datang di Perpustakaan Berbasis Website kami, tempat di mana pengetahuan bertemu kenyamanan. Kami berkomitmen untuk memberikan pengalaman peminjaman buku yang mudah, nyaman, dan efisien kepada semua pengguna kami.
            </Typography>
            <Button variant='contained' size='lg' onClick={redirectLogin}>Login Sekarang</Button>
          </Box>
          <Box className=' w-3/5 h-3/4'>
            <img src="assets/images/5836.png" className='w-full h-full ' />
          </Box>
        </Box>
        <Box className='w-100 h-2/3  p-4 flex flex-col mb-12'>
         
          <Box className='flex flex-row'>
            <Box className='w-2/3'>
              <img src="assets/images/551.png" className='h-full w-full' />
            </Box>
            <Box className='w-2/5 flex justify-center flex-col'>
              <Typography variant='h3' mb={1}>Tentang Kami</Typography>
              <Typography variant='body1'>Kami adalah perpustakaan modern yang mengadaptasi teknologi internet untuk memudahkan akses ke koleksi buku yang beragam. Meskipun kami mempertahankan koleksi fisik yang luas, kami juga menyediakan layanan peminjaman buku secara online, memungkinkan anggota kami untuk menikmati kenyamanan membaca di mana saja dan kapan saja.</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant='h4' mb={4} sx={{textAlign:"center"}}>Buku populer versi kami</Typography>
          <Box className='flex flex-row justify-center gap-16'>
            {
              buku.slice(0,3).map(item => 
                <BookComponent 
                  title={item.judul}
                  img={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`}
                  penulis={item.penulis}
                />
            )
            }
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default LandingPageView