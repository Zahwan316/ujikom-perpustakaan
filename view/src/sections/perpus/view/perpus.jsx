import { Box, Container } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PerpusFormComponent from 'src/components/form/perpus';
import ModalComponent from 'src/components/modal/modal';
import TableComponent from 'src/components/table/table';
import Swal from 'sweetalert2';
import useFormStore from '../../../../state/form';
import useItemStore from '../../../../state/item';
import {v4 as uuidv4} from "uuid"

const PerpusViewPage = () => {
  const tablehead = [
    "No",
    "Nama Perpustakaan",
    "Alamat",
    "Nomor Telepon",
    " "
  ]
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState(false)
  const [modal,setmodal] = useState(false)
  const [editedid,seteditedid] = useState()
  const [typeform,settypeform] = useState("")
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])

  const handleModal = () => {
    setmodal(!modal)
  }

  const getTypeBtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  const handleCrud = async(method,id,forminput) => {
    try{
      let res;
      switch(method){
        case "post":
          res = await axios.post(`${import.meta.env.VITE_APP_URL_API}perpus`,forminput)
          break;
        case "put":
          res = await axios.put(`${import.meta.env.VITE_APP_URL_API}perpus/${id}`,forminput)
          break;
        case "delete":
          res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}perpus/${id}`)
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

    if(typeform === "add"){
        handleCrud("post",null,form)
    }
    else if(typeform === "edit"){
        handleCrud("put",editedid,form)
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      try{
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
    const refetchdata = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus/${editedid}`)
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
      refetchdata()
    }
  },[editedid])

  useEffect(() => {
    const refetchdata = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
        setperpus(res.data.data)
      }
      catch(e){
        console.log(e)
      }
    }

    if(isload){
      refetchdata()
    }
  },[updater])

 

  return(
    <>
      <Container className='bg-white rounded-lg p-8'>
        <Box>
          <TableComponent 
            tablehead={tablehead}
            page="perpustakaan"
            title="Perpustakaan"
            gettypebtn={getTypeBtn}
            handlemodal={handleModal}
            handleCrud={handleCrud}
          />
        </Box>

        {
            modal &&
              <ModalComponent 
                handlemodal={handleModal}
                body={<PerpusFormComponent />}
                handlesubmit={handleSubmit}
                title={typeform === "add" ? "Tambah Perpustakaan" : "Edit Perpustakaan"}
              />
        }
      </Container>
    </>
  )
}

export default PerpusViewPage