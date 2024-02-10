import { Box, Container, Stack } from "@mui/system"
import { Typography,Button } from '@mui/material';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useFormStore from "../../../../state/form";
import useUserStore from "../../../../state/user";
import React, { useState, useEffect } from 'react';
import useItemStore from "../../../../state/item";
import axios from "axios";
import { Form } from "react-router-dom";
import ModalComponent from "src/components/modal/modal";
import {v4 as uuidv4} from "uuid"
import Swal from "sweetalert2";

const SettingViewPage = () => {
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])
  const [modal,setmodal] = useState(false)
  const [isload,setisload] = useState()
  const [updater,setupdater] = useState()
  const [img,setimg] = useState()

  const handlesubmit = (e) => {
    e.preventDefault()

    const sendData = async() => {
      try{
        const res = await axios.put(`${import.meta.env.VITE_APP_URL_API}user/${user.userID}`,form,{
            headers: {
              'Content-Type':'multipart/form-data'
            }
        })
        setisload(true)
        setupdater(uuidv4())
        Swal.fire({
            icon:"success",
            title:"Berhasil",
            text:"Data berhasil diubah"
        })
        setTimeout(() => {
          setisload(false)
        },500)
      }
      catch(e){
        console.log(e)
      }
    }

    Swal.fire({
      title:"Apakah anda yakin?",
      text:"Data yang diubah tidak dapat dikembalikan",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText:"Ya, ubah data!"
    }).then((result) => {
        if(result.isConfirmed){
          sendData()
        }
    })
  }

  const handleform = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  const handlefile = (e) => {
    const file = e.target.files[0]
    if(file){
        setform("img",file)
        setimg(file)
    }
  }

  const openfile = (e) => {
    document.getElementById("img-input").click()
  }

  useEffect(() => {
    for(const key in user){
      if(key !== "password"){
        setform(key,user[key])  
      }
    }
  },[user])

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(perpus).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => { 
    const refetchdata = async() => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user/${user.userID}`)
        setuser(res.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    refetchdata()
  },[updater])

  useEffect(() => {
    return () => {
      resetform()
    }
  },[])

  useEffect(() => {
    console.log(form)
  })

  return(
    <>
      <Container>
        <Typography variant="h4" mb={4}>Profile</Typography>
        <Stack flex flexDirection={"row"}>
          <form onSubmit={handlesubmit} className="flex flex-row" >
            <Box className="w-2/6 h-64">
                <input type='file' id='img-input' onChange={handlefile} className="hidden"/>
                <img src={`${user.img ? `${import.meta.env.VITE_APP_URL_API}img/${user.img}` : (img ? URL.createObjectURL(img) : "/assets/images/noimage.jpg") }`} className="rounded-lg h-64 w-64" onClick={openfile}/>
            </Box>
            <Box className="w-2/3">
                <Box className='flex flex-wrap gap-4'>
                <Box className='flex flex-col mb-6'>
                    <InputLabel className="mb-2">Nama Lengkap</InputLabel>
                    <TextField 
                    type='text'
                    size='small'
                    name='nama_lengkap'
                    value={form.nama_lengkap}
                    onChange={handleform}
                    />
                </Box>
                <Box className='flex flex-col mb-6'>
                    <InputLabel className="mb-2">Username</InputLabel>
                    <TextField 
                    type='text'
                    size='small'
                    name="username"
                    value={form.username}
                    onChange={handleform}
                    />
                </Box>
                <Box className='flex flex-col mb-6'>
                    <InputLabel className="mb-2">Email</InputLabel>
                    <TextField 
                    type='email'
                    size='small'
                    name='email'
                    value={form.email}
                    onChange={handleform}
                    />
                </Box>
                <Box className='flex flex-col mb-6'>
                    <InputLabel className="mb-2">Password</InputLabel>
                    <TextField 
                    type='password'
                    size='small'
                    name='password'
                   
                    onChange={handleform}
                    />
                </Box>
                <Box className='flex flex-col mb-6'>
                    <InputLabel className="mb-2">Nomor Telepon</InputLabel>
                    <TextField 
                    type='text'
                    size='small'
                    name='no_hp'
                    value={form.no_hp}
                    onChange={handleform}
                    />
                </Box>
                <Box className='flex flex-col mb-6'>
                    <InputLabel className="mb-2">Perpustakaan</InputLabel>
                    <Select
                    size='small'
                    name='perpus_id'
                    defaultValue={form.perpus_id}
                    value={form.perpus_id}
                    onChange={handleform}
                    >
                    {
                        perpus.map((item,index) => (
                        <MenuItem key={index} value={item.perpus_id}>{item.nama_perpus}</MenuItem>
                        ))
                    }
                    </Select>
                </Box>
                </Box>

                <Box className='flex flex-col mb-6'>
                <InputLabel className="mb-2">Alamat</InputLabel>
                <TextField 
                    type='text'
                    size='small'
                    multiline
                    rows={4}
                    name='alamat'
                    value={form.alamat}
                    onChange={handleform}
                />
                </Box>
                
                <Button variant="contained" type='submit'>Simpan Perubahan</Button>
            </Box>
          </form>
        </Stack>
      </Container>
    </>
  )
}

export default SettingViewPage