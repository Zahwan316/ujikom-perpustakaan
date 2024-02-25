import { Box, Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import BookComponent from 'src/components/book/book';
import useItemStore from '../../../../state/item';
import useUserStore from '../../../../state/user';
import axios from 'axios';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid'
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs } from 'react-pdf';

const PeminjamanUserViewPage = () => {
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const user = useUserStore((state) => state.user)
  const [updater,setupdater] = useState()
  const [isload,setisload] = useState(false)
  const [success,setsuccess] = useState(false)
  const [pagetextpdf,setpagetextpdf] = useState()

  const selectedpeminjaman = peminjaman.filter((item) => item.userID === user.userID && item.status_peminjaman === 1)

  const readPdf = async(isi_buku) => {
    const awaittask = pdfjs.getDocument(isi_buku)
    const pdf = await awaittask.promise 

    const numpages = pdf.getPage
    const pagetext = []
    for(let pagenum = 1;pagenum <= numpages;pagenum++){
      const page = await pdf.getPage(pagenum)
      const text = await page.getTextContent()
      const textitem = text.items.map(item => item.str)
      pagetext.push(textitem.join(" "))
    }
    return pagetext
  }

  const fetchPdf = async(url) => {
    try{
      const response = await fetch(url)
      const blob = await response.blob()
      return blob
    }
    catch(e){
      console.log(e)
      throw e
    }
  }

  const handleModal = (peminjamanid) => {
    Swal.fire({
      title:"Yakin",
      text:"Apakah anda ingin mengembalikan buku ini",
      icon:"warning",
      showCancelButton:true,
    }).then(async(result) => {
      if(result.isConfirmed){
        const now = new Date()
        const option = {year:"numeric",month:'2-digit',day:"2-digit"}
        const formatteddate = now.toLocaleDateString("en-CA",option)
        let res = await axios.put(`${import.meta.env.VITE_APP_URL_API}peminjaman/${peminjamanid}`,{status_peminjaman:2,tanggal_pengembalian:formatteddate})
        setupdater(uuidv4())
        setisload(true)
        setsuccess(true)
        setTimeout(() => {
          setisload(false)
          setsuccess(false)
        }, 1500);
      }
    })
  }

  const handleopenbook = async(id) => {
    try {
      const mainbuku = buku.find(item => item.bukuID === id);
      const response = await fetch(`${import.meta.env.VITE_APP_URL_API}img/${mainbuku.isi_buku}`);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = async () => {
          const arrayBuffer = reader.result;
          const typedArray = new Uint8Array(arrayBuffer);
          const pdf = await pdfjs.getDocument(typedArray).promise;
          let text = '';
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              text += textContent.items.map(item => item.str).join(' ');
          }
          setPdfText(text);
      };
      reader.readAsArrayBuffer(blob);
  } catch (error) {
      console.error('Gagal mengunduh file PDF:', error);
  }
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(buku).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}buku`)
          setbuku(res.data.data)
        }
        if(Object.keys(peminjaman).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
          setpeminjaman(res.data.data)
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
        let res_peminjaman = await axios.get(`${import.meta.env.VITE_APP_URL_API}peminjaman`)
        setpeminjaman(res_peminjaman.data.data)
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
    console.log(pagetextpdf)
  })

  return(
    <>
      <Container>
        {
          success && 
            <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w 3/2'>
              <Alert variant='filled' severity='success' className='w-full'>
                <AlertTitle>Berhasil</AlertTitle>
                Buku berhasil dikembalikan
              </Alert>
            </Snackbar>
        }
        <Stack>
          <Typography variant='h4' mb={4}>
            Buku yang dipinjam
          </Typography>
          <Box className='flex flex-wrap flex-row ' gap={3}>
            {
              selectedpeminjaman.length != 0 ?
              selectedpeminjaman.map(item => 
                buku.map(items => 
                  item.bukuID === items.bukuID &&
                  <BookComponent 
                    title={items.judul}
                    img={`${import.meta.env.VITE_APP_URL_API}img/${items.img}`}
                    penulis={items.penulis}
                    //id={items.bukuID}
                    slug={items.slug}
                    handlemodal={handleModal}
                    id={item.peminjamanID}
                  />
                )
              )
              :
              <Typography>Belum ada buku yang dipinjam </Typography>
            }
           
          </Box>
          <Box>
            <HTMLFlipBook
               width={550}
               height={733}
               size="stretch"
               minWidth={315}
               maxWidth={1000}
               minHeight={400}
               maxHeight={1533}
               maxShadowOpacity={0.5}
               showCover={true}
               mobileScrollSupport={true}
            >
            
             <div className="demoPage bg-gray-400">Page 1</div>
             <div className="demoPage">Page 2</div>
             <div className="demoPage">Page 3</div>
             <div className="demoPage">Page 4</div>
              </HTMLFlipBook>
          </Box>
          <Box>
            <iframe 
              src={`https://docs.google.com/gview?url=${import.meta.env.VITE_APP_URL_API}img/474.64-win11-win10-release-notes.pdf&embedded=true`}
            />
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default PeminjamanUserViewPage;