import { Box, Stack } from '@mui/system';
import { Typography, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import NavBarIndexComponent from '../nav';
import BookComponent from 'src/components/book/book';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import KategoriIndex from '../kategori';
import FooterIndex from '../footer';
import IndexUserLayout from 'src/layouts/dashboard/indexuser';

const IndexViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [ulasan,setulasan] = useItemStore((state) => [state.ulasan,state.setulasan])
  const [bukusitem,setbukus] = useState()
  const navigate = useNavigate()
 
  const redirectToBuku = (slug) => {
    navigate(`/buku/${slug}`)
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(peminjaman).length === 0){
            let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
            setpeminjaman(res.data.data)
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
  })

  useEffect(() => {
    const bukus = []
    // Hitung jumlah total rating untuk setiap buku
    const ratingPerBuku = {};
    ulasan.map(peminjaman => {
      const { bukuID, rating } = peminjaman;
      if (ratingPerBuku[bukuID]) {
        ratingPerBuku[bukuID] += rating;
      } else {
        ratingPerBuku[bukuID] = rating;
      }
    });

    // Temukan buku dengan rating terbanyak
    let maxRatingBukuID = null;
    let maxRating = -1;
    Object.keys(ratingPerBuku).map(bukuID => {
      if (ratingPerBuku[bukuID] > maxRating) {
        maxRating = ratingPerBuku[bukuID];
        maxRatingBukuID = bukuID;
      }
    });

    for(const key in ratingPerBuku) {
      bukus.push({"bukuID":key,"rating":ratingPerBuku[key]});
    }
    setbukus(bukus)
    /* console.log('Jumlah total rating per buku:', ratingPerBuku);
    console.log('Buku dengan rating terbanyak:', maxRatingBukuID);
    console.log('Bukus : ', bukus); */
  }, [ulasan]);

  useEffect(() => {
    //console.log(ulasan);
  })

  return(
   <IndexUserLayout>
    <Box className='px-8'>
          <Box className='mb-8'>
            <Box className='w-full h-64 mb-8'>
              <img src='assets/images/banner2.png' className='w-full h-full object-fill' />
            </Box>
            <KategoriIndex />
            <Typography mb={2} variant='h6'>Buku Populer</Typography>
            <Stack flex flexDirection={"row"} gap={4}>
             {
                bukusitem != undefined &&
                bukusitem.slice(0,4).map(item => 
                  buku.map(items => 
                    items.bukuID == item.bukuID &&
                     <BookComponent 
                      img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                      title={items.judul}
                      penulis={items.penulis}
                      redirect={redirectToBuku}
                      id={items.bukuID}
                      slug={items.slug}
                    />
                    )
                )
             }
            </Stack>
          </Box>
          <Box>
            <Typography variant='h6' mb={2}>Semua Buku</Typography>
            <Stack flex flexDirection={"row"} gap={4} flexWrap={"wrap"}>
             {
                  buku.map(items => 
                    items.stok !== 0 &&
                     <BookComponent 
                      img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                      title={items.judul}
                      penulis={items.penulis}
                      redirect={redirectToBuku}
                      id={items.bukuID}
                      slug={items.slug}
                    />
                    )  
             }
            </Stack>
          </Box>
    </Box>
   </IndexUserLayout>
  )
}

export default IndexViewPage