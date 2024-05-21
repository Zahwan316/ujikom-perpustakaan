import { MenuItem, Select} from '@mui/material';
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
import useStateStore from '../../../../state/state';

const AnggotaViewPage = () => {
  const [user,setuser] = useItemStore((state) => [state.user,state.setuser])
  const [refuser,setrefuser] = useUserStore((state) => [state.ref_user,state.setrefuser])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const user_logged = useUserStore((state) => state.user)
  const [modal,setmodal] = useState(false)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [typeform,settypeform] = useState()
  const [editedid,seteditedid] = useState()
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [filterrole,setfilteredrole] = useStateStore((state) => [state.filterrole,state.setfilterrole])
  
  const tablehead = [
    "No",
    "Perpus",
    "Username",
    "Email",
    "Nama Lengkap",
    "Alamat",
    "Role",
    " "
  ]

  const handleModal = () => {
    setmodal(!modal)
    modal != false && resetform()
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
      resetform()
      setmodal(false)
      setupdater(uuidv4())
      setisload(true)
      setTimeout(() => {
        setisload(false)
      }, 500);
    }
    catch(e){
      console.log(e)
      setmodal(false)
      Swal.fire({
        title:"Gagal",
        text:e.response.data.message,
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

  const handleFilteredRole = (e) => {
    const {target,value} = e.target
    setfilteredrole(value)
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
          if(key != "password"){
            setform(key,data[key])
          }
        }
       
      }
      catch(e){
        console.log(e)
      }
    }
    if(editedid){
      refetch_data()
    }
  },[editedid])

  return(
    <>
      <Container className='bg-white p-8 rounded-2xl'>
        <TableComponent 
          tablehead={tablehead}
          title="Pengguna"
          page="anggota"
          handlemodal={handleModal}
          gettypebtn={getTypeBtn}
          handleCrud={handleCrud}
          filterrole={filterrole}
          filter={<> 
            <Select
              size="small"
              onChange={handleFilteredRole}
              value={filterrole}
              name="Filter Role"
              defaultValue={"0"}
            >
              <MenuItem value="0">Semua</MenuItem>
              <MenuItem value="1">Admin</MenuItem>
              <MenuItem value="2">Petugas</MenuItem>
              <MenuItem value="3">Peminjam</MenuItem>
            </Select> 
          </>}
        />
      </Container>
           
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