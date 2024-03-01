import { Viewer } from "@react-pdf-viewer/core"
import '@react-pdf-viewer/core/lib/styles/index.css';
import { GlobalWorkerOptions } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import useItemStore from "../../../../state/item";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Typography,Button } from '@mui/material';

const ReadViewPage = () => {
  const {slug} = useParams()
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const selectedbuku = buku && buku.find(item => item.slug === slug)

  useEffect(() => {
    const fetchData = async() => {
      try{
        let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
        setbuku(res.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])
  return(
    <> 
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      {
        selectedbuku ?
        <Viewer fileUrl={`${import.meta.env.VITE_APP_URL_API}img/${selectedbuku.isi_buku}`} defaultScale={2} />
        :
        <Typography variant='h6'>Gagal mengambil data buku</Typography>
      }
    </Worker>
    </>
  )
}

export default ReadViewPage