import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppNewsUpdate from '../app-news-update';

import AppWidgetSummary from '../app-widget-summary';
import useItemStore from '../../../../state/item';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../../../../state/user';

// ----------------------------------------------------------------------

const AppView = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [user,setuser] = useItemStore((state) => [state.user,state.setuser])
  const [message,setmessage] = useItemStore((state) => [state.message,state.setmessage])
  const user_logged = useUserStore((state) => state.user)

  const filteredbuku = buku.filter((item) => item.perpus_id === user_logged.perpus_id )|| 0
  const filteredpeminjaman = peminjaman.filter((item) => item.perpus_id === user_logged.perpus_id)
  const filtereduser = user.filter((item) => item.perpus_id === user_logged.perpus_id)

  const filteredDate = (item) => {
    const date = new Date(item); // Ubah string tanggal menjadi objek Date
  const year = date.getFullYear(); // Ambil tahun
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ambil bulan
  const day = date.getDate().toString().padStart(2, '0'); // Ambil tanggal
  const hours = date.getHours().toString().padStart(2, '0'); // Ambil jam
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ambil menit
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Ambil detik

  // Bentuk kembali string dengan format yang diinginkan
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
  }

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(buku).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(perpus).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
        if(Object.keys(peminjaman).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
          setpeminjaman(res.data.data)
        }
        if(Object.keys(user).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
          setuser(res.data.data)
        }
        if(Object.keys(message).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}message`)
          setmessage(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

 

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Buku tersimpan"
            total={user_logged.access_level === 0 ? buku.length : (filteredbuku.length === 0 ? "0" : filteredbuku.length)}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Pengguna terdaftar"
            total={user_logged.access_level === 0 ? user.length : filtereduser.length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Transaksi Buku"
            total={user_logged.access_level === 0 ? peminjaman.length : filteredpeminjaman.length}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        {
          user_logged.access_level === 0 &&
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Perpus terdaftar"
              total={perpus.length}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>

        }

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={message.slice(message.length - 6,message.length - 1).sort((a,b) => b.created_date.localeCompare(a.created_date)).map((item, index) => ({
              id: item.message_id,
              title: item.title,
              description: item.text,
              image: `${item.title === "Meminjam Buku" ? '/assets/icons/borrow.svg' : '/assets/icons/return.svg'}`,
              postedAt: filteredDate(item.created_date),
            }))}
          />
        </Grid>

      
      </Grid>
    </Container>
  );
}

export default AppView
