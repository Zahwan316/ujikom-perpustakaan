import React, { useState, useEffect } from 'react';
import Label from '../label';
import { Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';

const AnggotaFormComponent = () => {
  return(
    <>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Nama Lengkap</InputLabel>
        <TextField 
          size="small"
          type='text'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Username</InputLabel>
        <TextField 
          size="small"
          type='text'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Password</InputLabel>
        <TextField 
          size="small"
          type='password'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Email</InputLabel>
        <TextField 
          size="small"
          type='text'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Nomor Telepon</InputLabel>
        <TextField 
          size="small"
          type='text'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Alamat</InputLabel>
        <TextField 
          size="small"
          type='text'
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Role</InputLabel>
        <Select
          value={"0"}
          size="small"
        >
          <MenuItem value="0">Pilih Role</MenuItem>
        </Select>
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Perpustakaan</InputLabel>
        <Select
          size="small"
          value={"0"}
        >
          <MenuItem value="0">Pilih Perpustakaan</MenuItem>
        </Select>
      </Box>
    </>
  )
}

export default AnggotaFormComponent;