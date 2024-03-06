import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../../state/form';
import useItemStore from '../../../state/item';
import useUserStore from '../../../state/user';

const PeminjamanForm = () => {
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const perpus = useItemStore((state) => state.perpus)
  const buku = useItemStore((state) => state.buku)
  const user = useItemStore((state => state.user))
  const ref_peminjaman = useItemStore((state) => state.ref_peminjaman)
  const sortedbuku = buku.sort((a,b) => {return a.judul.localeCompare(b.judul)})

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  useEffect(() => {
    setform("perpus_id",perpus[0].perpus_id)
  },[])

  useEffect(() => {
    console.log(form)
  })
  return(
    <>
      <Box className="mb-6 flex flex-col">
        <InputLabel className='mb-2'>Nama Peminjam</InputLabel>
        <Select
          size='small'
          name="userID"
          onChange={handleForm}
          value={form.userID || "0"}
        >
          <MenuItem value="0">Pilih Nama Peminjam</MenuItem>
          {
            user.map((item,index) => (
              <MenuItem key={index} value={item.userID}>{item.nama_lengkap}</MenuItem>
            ))
          }
        </Select>
      </Box>
      <Box className="mb-6 flex flex-col">
        <InputLabel className='mb-2'>Nama Buku</InputLabel>
        <Select
          size="small"
          name="bukuID"
          onChange={handleForm}
          value={form.bukuID || "0"}
        >
            <MenuItem value="0">Pilih Nama Buku</MenuItem>
            {
              sortedbuku.map((item,index) => (
                item.stok != 0 &&
                <MenuItem key={index} value={item.bukuID}>{item.judul}</MenuItem>
              ))
            }
        </Select>

      </Box>
      <Box className="mb-6 flex flex-col">
        <InputLabel className='mb-2'>Status Peminjaman</InputLabel>
        <Select
          size="small"
          name="status_peminjaman"
          onChange={handleForm}
          value={form.status_peminjaman || "0"}
        >
          <MenuItem value="0">Pilih Status</MenuItem>
          {
            ref_peminjaman.map((item,index) => (
              <MenuItem key={index} value={item.ref_peminjaman_id}>{item.nama}</MenuItem>
            ))
          }
        </Select>
      </Box>
      <Box className="mb-6 flex flex-col">
        <InputLabel className='mb-2'>Tanggal Peminjaman</InputLabel>
        <TextField 
             size='small'
             name="tanggal_peminjaman"
             type='date'
             onChange={handleForm}
             value={form.tanggal_peminjaman}
        />
      </Box>
      {
        form.status_peminjaman === 2 &&
        <Box className="mb-6 flex flex-col">
            <InputLabel className='mb-2'>Tanggal Dikembalikan</InputLabel>
            <TextField 
                size='small'
                name="tanggal_pengembalian"
                type='date'
                onChange={handleForm}
                value={form.tanggal_pengembalian}
            />
        </Box>
      }
     
      <Box className="mb-6 flex flex-col">
        <InputLabel className='mb-2'>Perpustakaan</InputLabel>
        <Select
          size="small"
          name="perpus_id"
          onChange={handleForm}
          value={form.perpus_id || "0"}
          disabled
        >
          <MenuItem value="0">Pilih Nama Perpustakaan</MenuItem>
          {
            perpus.map((item,index) => (
              <MenuItem key={index} value={item.perpus_id}>{item.nama_perpus}</MenuItem>
            ))
          }
        </Select>
      </Box>
    </>
  )
}

export default PeminjamanForm