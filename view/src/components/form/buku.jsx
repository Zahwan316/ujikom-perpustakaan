import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../../state/form';
import useItemStore from '../../../state/item';

const BukuForm = () => {
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const perpustakaan = useItemStore((state) => state.perpus)
  const kategori = useItemStore((state) => state.kategori)

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  console.log(form)

  return(
    <>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Judul</InputLabel>
        <TextField
          size='small'
          type='text'
          name="judul"
          onChange={handleForm}
          value={form.judul}
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Penulis</InputLabel>
        <TextField
          size='small'
          type='text'
          name="penulis"
          onChange={handleForm}
          value={form.penulis}
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Penerbit</InputLabel>
        <TextField
          size='small'
          type='text'
          name="penerbit"
          onChange={handleForm}
          value={form.penerbit}
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Tahun Terbit</InputLabel>
        <TextField
          size='small'
          type='date'
          name="tahun_terbit"
          onChange={handleForm}
          value={form.tahun_terbit}
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Kategori</InputLabel>
        <Select
          size='small'
          name="kategori_id"
          onChange={handleForm}
          value={form.kategori_id || "0"}
        >
          <MenuItem value="0">Pilih Kategori</MenuItem>
          {
            kategori.map((item,index) => 
              <MenuItem key={index} value={item.kategoriID}>{item.nama_kategori}</MenuItem>
            )
          }
        </Select>
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Perpustakaan</InputLabel>
        <Select
          size='small'
          name="perpus_id"
          onChange={handleForm}
          value={form.perpus_id || "0"}
        >
          <MenuItem value="0">Pilih Perpustakaan</MenuItem>
          {
            perpustakaan.map((item,index) => 
              <MenuItem key={index} value={item.perpus_id}>{item.nama_perpus}</MenuItem>
            )
          }
        </Select>
      </Box>
    </>
  )
}

export default BukuForm