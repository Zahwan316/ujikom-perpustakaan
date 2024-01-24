import { Card, Table, TableBody, TableHead, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TableComponent from 'src/components/table/table';
import useUserStore from '../../../../state/user';
import ModalComponent from 'src/components/modal/modal';
import AnggotaFormComponent from 'src/components/form/anggota';
import useFormStore from '../../../../state/form';
import useItemStore from '../../../../state/item';
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2';

const AnggotaViewPage = () => {
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])
  const [refuser,setrefuser] = useUserStore((state) => [state.ref_user,state.setrefuser])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [modal,setmodal] = useState(false)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [typeform,settypeform] = useState()
  const [editedid,seteditedid] = useState()
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const tablehead = [
    "Perpus",
    "Username",
    "Email",
    "Nama Lengkap",
    "Alamat",
    "Role"
  ]

  const handleModal = () => {
    setmodal(!modal)
  }

  const getTypeBtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  const handleCrud = async(method,id) => {
    try{
      let res;
      switch(method) {
        case "post":
           res = await axios.post(`${import.meta.env.VITE_APP_URL_API}user`,form)
           break;
        case "put":
           res = await axios.put(`${import.meta.env.VITE_APP_URL_API}user/${  id}`,form)
           break;
        case "delete":
           res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}user/${id}`)
           break;
      }
      Swal.fire({
        title:"Berhasil",
        text:`Data berhasil ${typeform == "add" ? "ditambahkan" : (typeform == "edit" ? "diperbarui" : "dihapus")}`,
        icon:"success"
      })
      setmodal(false)
      setupdater(uuidv4())
      setisload(true)
      setTimeout(() => {
        setisload(false)
      }, 500);
    }
    catch(e){
      console.log(e)
      Swal.fire({
        title:"Gagal",
        text:e.message,
        icon:"error"
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(typeform === "add"){
      handleCrud("post")
    }
    else if(typeform === "edit"){
      handleCrud("put",editedid )
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(user).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
          setuser(res.data.data)
        } 
        if(Object.keys(refuser).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}refuser`)
          setrefuser(res.data.data)
        }
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    console.log(editedid)
  })

  useEffect(() => {
    const refetchdata = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
        setuser(res.data.data)
        let res_refuser = await axios.get(`${import.meta.env.VITE_APP_URL_API}refuser`)
        setrefuser(res_refuser.data.data)
        let res_perpus = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
        setperpus(res_perpus.data.data)
      }
      catch(e){
        console.log(e)
        Swal.fire({
          title:"Gagal",
          text:"Data gagal diperbarui",
          icon:"error"
        })
      }
    }
    if(isload){
      refetchdata()
    }
  },[updater])

  useEffect(() => {
    const refetch_data = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user/${editedid}`)
        const data = res.data.data
        for(const key in data){
          setform(key,data[key])
        }
       
      }
      catch(e){
        console.log(e)
      }
    }

    refetch_data()
  },[editedid])

  return(
    <>
        <TableComponent 
          tablehead={tablehead}
          title="Anggota"
          page="anggota"
          handlemodal={handleModal}
          gettypebtn={getTypeBtn}
          handleCrud={handleCrud}
        />

        {
          modal &&
          <ModalComponent 
            handlemodal={handleModal}
            title={typeform === "add" ? "Tamba Data" : "Edit Data "}
            body={<AnggotaFormComponent />}
            handlesubmit={handleSubmit}
          />

        }
    </>
  )
}

export default AnggotaViewPage;