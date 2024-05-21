import { InputLabel, TextField } from '../../../node_modules/@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import useFormStore from '../../../state/form';

const KategoriForm = () => {
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const [img,setimg] = useState()

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  const handleGambar = (e) => {
    const file = e.target.files[0]
    if(file){
      setform("img",file)
      setimg(URL.createObjectURL(file))
    }
  }

  return(
    <>
      <Box className="flex flex-col">
        <InputLabel className='mb-2'>Nama Kategori</InputLabel>
        <TextField 
          size="small"
          type='text'
          onChange={handleForm}
          name="nama_kategori"
          value={form.nama_kategori}
        />
      </Box>
      <Box className="flex flex-col mb-4">
        <InputLabel className='mb-2'>Gambar</InputLabel>
        <TextField 
          type='file'
          onChange={handleGambar}
          name="img"
        />
      </Box>
      {
        img &&
        <Box className='w-full h-64'>
          <img src={img} className='w-full h-full object-contain' />
        </Box>

      }
    </>
  )
}

export default KategoriForm