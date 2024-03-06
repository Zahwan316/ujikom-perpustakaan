import React, { useState, useEffect } from 'react';
import Label from '../label';
import { Button, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import useFormStore from '../../../state/form';
import useUserStore from '../../../state/user';
import useItemStore from '../../../state/item';

const AnggotaFormComponent = () => {
  const [page,setpage] = useState(1)
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const perpus = useItemStore((state) => state.perpus)
  const ref_user = useUserStore((state) => state.ref_user)

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  const handlePage = (e) => {
    const method = e.target.getAttribute("method")
    if(method === "+"){
      setpage((prev) => (prev + 1))
    }
    else if(method === "-"){
      setpage((prev) => (prev - 1))
    }
  }

  useEffect(() => {
    setform("perpus_id",perpus[0].perpus_id)
  },[])

  useEffect(() => {
    console.log(form)
  })

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
              onChange={handleForm}
              value={form.nama_lengkap}
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Username</InputLabel>
            <TextField 
              size="small"
              type='text'
              name='username'
              onChange={handleForm}
              value={form.username}
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Password</InputLabel>
            <TextField 
              size="small"
              type='password'
              name='password'
              onChange={handleForm}
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Email</InputLabel>
            <TextField 
              size="small"
              type='text'
              name='email'
              onChange={handleForm}
              value={form.email}
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
          name='no_hp'
          onChange={handleForm}
          value={form.no_hp}
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Alamat</InputLabel>
        <TextField 
          size="small"
          type='text'
          name='alamat'
          onChange={handleForm}
          value={form.alamat}
        />
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Role</InputLabel>
        <Select
          size="small"
          name='access_level'
          onChange={handleForm}
          value={form.access_level}
        >
          <MenuItem value="0">Pilih Role</MenuItem>
          {
            ref_user.map((item,index) => 
              <MenuItem key={index} value={item.user_ref_id}>{item.nama}</MenuItem>
            )
          }
        </Select>
      </Box>
      <Box className="flex flex-col mb-6">
        <InputLabel className='mb-2'>Perpustakaan</InputLabel>
        <Select
          size="small"
          name='perpus_id'
          onChange={handleForm}
          value={form.perpus_id || "0"}
          disabled
        >
          <MenuItem value="0">Pilih Perpustakaan</MenuItem>
          {
            perpus.map((item,index) => 
              <MenuItem key={index} value={item.perpus_id}>{item.nama_perpus}</MenuItem>
            )
          }
        </Select>
      </Box>
      <Button method="-" variant='contained' onClick={handlePage} >Sebelumnya</Button>
      </>
    }
     
      
    </>
  )
}

export default AnggotaFormComponent;