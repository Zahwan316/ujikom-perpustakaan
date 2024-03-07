import { Box, Container } from "@mui/system"
import TableComponent from "src/components/table/table"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import useItemStore from "../../../state/item";
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from "uuid"
import Swal from "sweetalert2";

const SampahBukuViewPage = () => {
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

  const [typeform,settypeform] = useState()
  const [editedid,seteditedid] = useState()
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [kategori,setkategori] = useItemStore((state) => [state.kategori,state.setkategori])
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()
  const navigate = useNavigate()

  const getTypeBtn = (editedid,typebtn) => {
    settypeform(typebtn)
    seteditedid(editedid)
  }

  const handleCrud = async(method,id,forminput) => {
    try{
      let res;
      switch(method){
        case "delete":
          res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}buku/${id}`)
          break;
        case "deleteall":
          res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}v2/buku/deleteall`)
          break;
        case "restore":
          res = await axios.put(`${import.meta.env.VITE_APP_URL_API}v2/buku/restore/${id}`,{soft_delete:0})
          break;
        case "restoreall":
          res = await axios.put(`${import.meta.env.VITE_APP_URL_API}v2/buku/restoreall`)
          break;
      }
      Swal.fire({
        title:"Berhasil",
        text:`Data berhasil ${typeform === "delete" || typeform === "deleteall" ? "dihapus" : "dipulihkan" }`,
        icon:"success"
      })
      setupdater(uuidv4())
      setisload(true)
      setTimeout(() => {
        setisload(false)
      }, 1500);
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(kategori).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}kategori`)
          setkategori(res.data.data)
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

    fetchdata()
  },[])

  useEffect(() => {
    const refetchdata = async() => {
      try{
        let res_buku = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
        setbuku(res_buku.data.data)
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
      <Container className='bg-white p-8 rounded-2xl'>
        <Box>
            <TableComponent 
              tablehead={tablehead}
              page="sampahbuku"
              title="Sampah Buku"
              gettypebtn={getTypeBtn}
              navigate={navigate}
              handleCrud={handleCrud}
            />
        </Box>
      </Container>
    </>
  )
}

export default SampahBukuViewPage