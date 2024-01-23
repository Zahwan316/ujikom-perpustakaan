import { Card, Table, TableBody, TableHead, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TableComponent from 'src/components/table/table';
import useUserStore from '../../../../state/user';
import ModalComponent from 'src/components/modal/modal';
import AnggotaFormComponent from 'src/components/form/anggota';

const AnggotaViewPage = () => {
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])
  const [modal,setmodal] = useState(false)
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

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(user).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
          setuser(res.data.data)
        } 
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    console.log(modal)
  })

  return(
    <>
        <TableComponent 
          tablehead={tablehead}
          title="Anggota"
          page="anggota"
          handlemodal={handleModal}
        />

        {
          modal &&
          <ModalComponent 
            handlemodal={handleModal}
            title="Tambah Anggota"
            body={<AnggotaFormComponent />}
          />

        }
    </>
  )
}

export default AnggotaViewPage;