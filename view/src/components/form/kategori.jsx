import { FormLabel, Input, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../../state/form';

const KategoriForm = () => {
  const [form,setform] = useFormStore((state) => [state.form,state.setform])

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
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
    </>
  )
}

export default KategoriForm