import React, { useState, useEffect } from 'react';
import TableComponent from 'src/components/table/table';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import ModalComponent from 'src/components/modal/modal';
import Swal from 'sweetalert2';
import useFormStore from '../../../../state/form';
import {v4 as uuidv4} from "uuid"
import KategoriForm from 'src/components/form/kategori';

const KategoriViewPage = () => {
  const tablehead = [
    "Nama Kategori"
  ]
  const [modal,setmodal] = useState(false)
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [typeform,settypeform] = useState()
  const [editedid,seteditedid] = useState()
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])

  const handleModal = () => {
    setmodal(!modal)
    typeform === "add" && resetform()
  }

  const getTypeBtn = (typebtn,id) => {
    settypeform(typebtn)
    seteditedid(id)
  }

  const handleCrud = async(method,id) => {
    try{
      let res;
      switch(method){
        case "post":
          res = await axios.post(`${import.meta.env.VITE_APP_URL_API}kategori`,form)
          break;
        case "put":
          res = await axios.put(`${import.meta.env.VITE_APP_URL_API}kategori/${id}`,form)
          break;
        case "delete":
          res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}kategori/${id}`,form)
          break;
      }
      Swal.fire({
        title:"Berhasil",
        text:`Data berhasil ${typeform == "add" ? "ditambahkan" : (typeform == "edit" ? "diedit" : "dihapus")}`,
        icon:"success",
        confirmButtonText:"OK"
      })
      setmodal(false)
      setupdater(uuidv4())
      setisload(true)
      resetform()
      setTimeout(() => {
        setisload(false)
      },500)
    }
    catch(e){
      Swal.fire({
        title:"Error",
        icon:"error",
        text:e.message
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    switch(typeform){
      case "add":
        handleCrud("post",null)
        break;
      case "edit":
        handleCrud("put",editedid)
    }
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(kategori).length === 0) {
            let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
            setkategori(res.data.data)
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
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
        }
        catch(e){
          console.log(e)
        }
    }
    if(isload){
      refetchdata()
    }
  },[updater])

  useEffect(() => {
    if(editedid){
      const refetchdata = async() => {
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori/${editedid}`)
        const data = res.data.data
        for(const key in data){
          setform(key,data[key])
        }
      }
      refetchdata()
    }
  },[editedid])

  return (
    <>
      <TableComponent
        tablehead={tablehead}
        page="kategori"
        title="Kategori"
        handlemodal={handleModal}
        gettypebtn={getTypeBtn}
        handleCrud={handleCrud}
      />

      {
        modal &&
        <ModalComponent 
          handlemodal={handleModal}
          title={typeform == "add" ? "Tambah Kategori" : "Edit Kategori"}
          handlesubmit={handleSubmit}
          body={<KategoriForm />}
        />
      }
    </>
  )
}

export default KategoriViewPage