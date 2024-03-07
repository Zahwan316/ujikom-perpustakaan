import React, { useState, useEffect } from 'react';
import { Box, Container, Stack } from '@mui/system';
import { Typography,Button } from '@mui/material';
import BookComponent from 'src/components/book/book';
const BukuContentPeminjaman = (props) => {
  const calculateRemainingDays = (tanggalPengembalian) => {
      // Menghitung timestamp (dalam milidetik) untuk tanggal hari ini
      const today = new Date();
      const todayTimestamp = today.getTime();
  
      // Menghitung timestamp untuk tanggal pengembalian
      const returnDate = new Date(tanggalPengembalian);
      const returnDateTimestamp = returnDate.getTime();
  
      // Menghitung selisih dalam milidetik
      const differenceInMilliseconds = returnDateTimestamp - todayTimestamp;
  
      // Menghitung jumlah hari dari selisih waktu
      const daysRemaining = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
      // Mengembalikan pesan berdasarkan jumlah hari yang tersisa
      if (daysRemaining === 0) {
          return "Hari ini";
      } else if (daysRemaining > 0) {
          return `${daysRemaining} hari lagi`;
      } else {
          return `${Math.abs(daysRemaining)} hari yang lalu`;
      }
  };

  useEffect(() => {
    console.log(calculateRemainingDays("2024-03-2"))
  })
  return(
    <>
      <Box className='flex flex-wrap flex-row ' gap={3}>
            {
              props.selectedpeminjaman.length != 0 ?
              props.selectedpeminjaman.map(item => 
                props.buku.map(items => 
                  item.bukuID === items.bukuID && items.soft_delete != 1 ?
                  <BookComponent 
                    title={items.judul}
                    img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                    penulis={items.penulis}
                    //id={items.bukuID}
                    slug={items.slug}
                    handlemodal={props.handleModal}
                    remaining={calculateRemainingDays(item.tanggal_pengembalian)}
                    id={item.peminjamanID}
                  />
                  :
                  ""
                )
              )
              :
              <Typography>Belum ada buku yang dipinjam </Typography>
            }
          
          </Box>
    </>
  )
}

export default BukuContentPeminjaman