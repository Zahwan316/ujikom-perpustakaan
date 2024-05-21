import React, { useState, useEffect } from 'react';
import TableComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';
import axios from 'axios';
import useFormStore from '../../../../state/form';
import ModalComponent from 'src/components/modal/modal';
import PeminjamanForm from 'src/components/form/peminjaman';

import { Box, Container } from '@mui/system';
import { TextField } from '@mui/material';
import useStateStore from '../../../../state/state';

const PeminjamanViewPage = () => {
  const tablehead = [
    "No",
    "Nama Perpus",
    "Judul Buku",
    "Tanggal Pinjam",
    "Tanggal Kembali",
    "Nama Peminjam",
    "Status",
    " "
  ]
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [refpeminjaman,setrefpeminjaman] = useItemStore((state) => [state.ref_peminjaman,state.setref_peminjaman])
  const [message,setmessage] = useItemStore((state) => [state.message,state.setmessage])
  const [user,setuser] = useItemStore((state) => [state.user,state.setuser])
  const [modal,setmodal] = useState(false)
  const [editedid,seteditedid] = useState()
  const [typeform,settypeform] = useState()
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [search,setsearch] = useStateStore((state) => [state.search,state.setsearch])

  const handleModal = () => {
    setmodal(!modal)
    modal === false && resetform()
  }

  const getTypeBtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  const handleSearch = (e) => {
    setsearch(e.target.value)
  }

  const handleCrud = async(method,id) => {
    try{
      let res;
      switch(method){
        case "post": 
          res = await axios.post(`${import.meta.env.VITE_APP_URL_API}peminjaman`,form)
          break;
        case "put":
          res = await axios.put(`${import.meta.env.VITE_APP_URL_API}peminjaman/${id}`,form)
          break;
        case "delete":
          res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}peminjaman/${id}`)
          break;
      }
      Swal.fire({
        icon:"success",
        title:"Berhasil",
        text:`Data berhasil ${typeform === "add" ? "ditambahkan" : (typeform === "edit" ? "diedit" : "dihapus")}`
      })
      setmodal(false)
      resetform()
      setupdater(uuidv4())
      setisload(true)
      setTimeout(() => {
        setisload(false)
      }, 500);
    }
    catch(e){
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.message
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(typeform === "add"){
      handleCrud("post")
    }
    else if(typeform === "edit"){
      handleCrud("put",editedid)
    }
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(peminjaman).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
          setpeminjaman(res.data.data)
        }
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
        if(Object.keys(refpeminjaman).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}ref_peminjaman`)
          setrefpeminjaman(res.data.data)
        }
        if(Object.keys(user).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
          setuser(res.data.data)
        }
        if(Object.keys(message).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}message`)
          setmessage(res.data.data)
        }
      }
      catch(e){
        console.log(e)
        Swal.fire({
          title:"Error",
          text:e.message,
          icon:"error"
        })
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    const refetchdata = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
        setpeminjaman(res.data.data)
        
        let res_buku = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
        setbuku(res_buku.data.data)
        
        let res_perpus = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
        setperpus(res_perpus.data.data)

        let res_message = await axios.get(`${import.meta.env.VITE_APP_URL_API}message`)
        setmessage(res_message.data.data)
      }
      catch(e){
        console.log(e)
        Swal.fire({
          title:"Error",
          text:e.message,
          icon:"error"
        })
      }
    }
    refetchdata()
  },[updater])

  useEffect(() => {
    const refetchdata = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman/${editedid}`)
        const data = res.data.data
        for(const key in data){
          setform(key,data[key])
        }
      }
      catch(e){
        console.log(e)
        Swal.fire({
          title:"Error",
          text:e.message,
          icon:"error"
        })
      }
    }
    if(editedid){
      refetchdata()
    }
  },[editedid])


  return(
    <>
    <Container className='bg-white rounded-2xl p-8'>
      <TableComponent 
        tablehead={tablehead}
        gettypebtn={getTypeBtn}
        handlemodal={handleModal}
        title="Buku Yang Dipinjam"
        handleCrud={handleCrud}
        page="peminjaman"
        filter={ <Box>
          <TextField 
            size='small'
            placeholder='Cari nama peminjam'
            onChange={handleSearch}
          />
        </Box>}
      />
  
      {
        modal &&
        <ModalComponent 
          handlemodal={handleModal}
          handlesubmit={handleSubmit}
          title={typeform === "add" ? "Tambah data" : "Edit data"}
          body={<PeminjamanForm />}
        />
      }

    </Container>
     
    </>
  )
}

export default PeminjamanViewPage