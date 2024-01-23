import React, { useState, useEffect } from 'react';
import Label from '../label';
import { Button, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';

const AnggotaFormComponent = () => {
  const [page,setpage] = useState(1)

  const handlePage = (e) => {
    const method = e.target.getAttribute("method")
    if(method === "+"){
      setpage((prev) => (prev + 1))
    }
    else if(method === "-"){
      setpage((prev) => (prev - 1))
    }
  }

  return(
    <>
    {
      page === 1 &&
      <>
         <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Nama Lengkap</InputLabel>
            <TextField 
              size="small"
              type='text'
              name='nama_lengkap'
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Username</InputLabel>
            <TextField 
              size="small"
              type='text'
              name='username'
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Password</InputLabel>
            <TextField 
              size="small"
              type='password'
              name='password'
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Email</InputLabel>
            <TextField 
              size="small"
              type='text'
              name='email'
            />
      </Box>
      <Button method="+" variant='contained' onClick={handlePage} >Selanjutnya</Button>
      </>
    }
    {
      page === 2 &&
      <>
        <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Nomor Telepon</InputLabel>
        <TextField 
          size="small"
          type='text'
          name='nomor_telepon'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Alamat</InputLabel>
        <TextField 
          size="small"
          type='text'
          name='alamat'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Role</InputLabel>
        <Select
          value={"0"}
          size="small"
          name='access_level'
        >
          <MenuItem value="0">Pilih Role</MenuItem>
        </Select>
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Perpustakaan</InputLabel>
        <Select
          size="small"
          value={"0"}
          name='perpustakaan_id'
        >
          <MenuItem value="0">Pilih Perpustakaan</MenuItem>
        </Select>
      </Box>
      <Button method="-" variant='contained' onClick={handlePage} >Sebelumnya</Button>
      </>
    }
     
      
    </>
  )
}

export default AnggotaFormComponent;