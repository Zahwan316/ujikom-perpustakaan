import { Card, Table, TableBody, TableHead, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TableComponent from 'src/components/table/table';
import useUserStore from '../../../../state/user';
import ModalComponent from 'src/components/modal/modal';
import AnggotaFormComponent from 'src/components/form/anggota';
import useFormStore from '../../../../state/form';

const AnggotaViewPage = () => {
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])
  const [modal,setmodal] = useState(false)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [typeform,settypeform] = useState()
  const [editedid,seteditedid] = useState()
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const [refuser,setrefuser] = useUserStore((state) => [state.ref_user,state.setrefuser])
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

  const getTypeBtn = (id,typeform) => {
    settypeform(typeform)
    seteditedid(id)
  }

  const handleCrud = async(method) => {
    try{
      let res;
      switch(method) {
        case "post":
           res = await axios.post(`${import.meta.env.VITE_APP_URL_API}user`,form)
           break;
        case "put":
           res = await axios.put(`${import.meta.env.VITE_APP_URL_API}user`,form)
           break;
        case "delete":
           res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}user`)
           break;
      }
    }
    catch(e){
      console.log(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(typeform === "add"){
      handleCrud("post")
    }
    else if(typeform === "edit"){
      handleCrud("put")
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
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    console.log(typeform)
  })

  return(
    <>
        <TableComponent 
          tablehead={tablehead}
          title="Anggota"
          page="anggota"
          handlemodal={handleModal}
          gettypebtn={getTypeBtn}
        />

        {
          modal &&
          <ModalComponent 
            handlemodal={handleModal}
            title="Tambah Anggota"
            body={<AnggotaFormComponent />}
            handlesubmit={handleSubmit}
          />

        }
    </>
  )
}

export default AnggotaViewPage;