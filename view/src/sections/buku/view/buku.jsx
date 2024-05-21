import React, { useState, useEffect } from 'react';
import TableComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import Swal from 'sweetalert2';
import useFormStore from '../../../../state/form';
import {v4 as uuidv4} from "uuid"
import ModalComponent from 'src/components/modal/modal';
import BukuForm from 'src/components/form/buku';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';


const BukuViewPage = () => {
  const tablehead = [
    "No",
    "Judul Buku",
    "Penulis",
    "Penerbit",
    "Tahun Terbit",
    "Kategori",
    "Perpustakaan",
    " "
  ]
  const [modal,setmodal] = useState(false)
  const [editedid,seteditedid] = useState()
  const [typeform,settypeform] = useState()
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const navigate = useNavigate()

  const handleModal = (e) => {
    setmodal(!modal)
    typeform === "add" && resetform()
    modal === false && resetform()
  }

  const gettypebtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  const handleCrud = async(method,id,forminput) => {
    try{
      let res;
      switch(method){
        case "post":
          res = await axios.post(`${import.meta.env.VITE_APP_URL_API}buku`,forminput,{
            headers: {
              'Content-Type':'multipart/form-data'
            }
          })
          break;
        case "put":
          res = await axios.put(`${import.meta.env.VITE_APP_URL_API}buku/${id}`,forminput,{
            headers: {
              'Content-Type':'multipart/form-data'
            }
          })
          break;
        case "delete":
          res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}buku/${id}`)
          break;
        case "softdelete":
          res = await axios.put(`${import.meta.env.VITE_APP_URL_API}v2/buku/softdelete/${id}`,{soft_delete:1})
          break;
      }
      setmodal(false)
      Swal.fire({
        icon:'success',
        title: 'Berhasil',
        text: `Data berhasil ${typeform === "add" ? "ditambahkan" : (typeform === "edit" ? "diedit" : "dihapus")}`
      })
      setupdater(uuidv4())
      setisload(true)
      setTimeout(() => {
        setisload(false)
      }, 500);
      resetform()
    }
    catch(e){
      setmodal(false)
      console.log(e)
      Swal.fire({
        title:"Error",
        text:e.response.data.message,
        icon:"error"
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formdata = new FormData()
    for(const key in form){
      formdata.append(key,form[key])
     
    }

    switch(typeform){
      case "add":
        handleCrud("post",null,formdata)
        break;
      case "edit":
        handleCrud("put",editedid,formdata)
        break;
    }
  }

  const redirectToSampah = () => {
    navigate("/sampahbuku")
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(kategori).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
        }
        if(Object.keys(perpus).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)

        }
      }
      catch(e){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        })
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    const refetchdata = async() => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
        setbuku(res.data.data)
        const res_kategori = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
        setkategori(res_kategori.data.data)
        const res_perpustakaan = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
        setperpus(res_perpustakaan.data.data)
      }
      catch(e){
        Swal.fire({
          title:"Error",
          message:e.message,
          icon:"error"
        })
      }
    }
    if(isload){
      refetchdata()
    }
  },[updater])

  useEffect(() => {
    const refetcdata = async() => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku/${editedid}`)
        const data = res.data.data
        for(const key in data){
          setform(key,data[key])
        }
      }
      catch(e){
        console.log(e)
      }
    }

    if(editedid){
      refetcdata()
    }
  },[editedid])


  return(
    <>
      <Container className='bg-white rounded-2xl p-8'>
        <TableComponent 
          title="Buku"
          tablehead={tablehead}
          page="buku"
          filter={<Button variant='contained' color="error" onClick={redirectToSampah}>Sampah</Button>}
          handleCrud={handleCrud}
          handlemodal={handleModal}
          gettypebtn={gettypebtn}
        />

        {
          modal && 
          <ModalComponent 
            title={typeform === "add" ? "Tambah Buku" : "Edit Buku"}
            handlesubmit={handleSubmit}
            handlemodal={handleModal}
            body={<BukuForm />}
          />
        }
      
      </Container>
    </>
  )
}

export default BukuViewPage