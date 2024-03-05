import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import useFormStore from '../../../state/form';
import useItemStore from '../../../state/item';
import { Input, fromJSON } from 'postcss';

const BukuForm = () => {
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  const perpustakaan = useItemStore((state) => state.perpus)
  const kategori = useItemStore((state) => state.kategori)
  const [page,setpage] = useState(1)
  const [img,setimg] = useState()
  const [pdf,setpdf] = useState()
  const sortedkategori = kategori.sort((a,b) => {return a.nama_kategori.localeCompare(b.nama_kategori)})

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  const handleSlug = () => {
    let nama = form.judul
    const slug = nama.replace(/\s+/g,'-')
    setform("slug",slug)
  }

  const handlePage = (e) => {
    const method = e.target.getAttribute("method")
    if(method === "+"){
      setpage((prev) => prev + 1)
    }else if(method === "-"){
      setpage((prev) => prev - 1)
    }
  }

  const handleImg = (e) => {
    const file = e.target.files[0]
    if(file){
      setimg(file)
      setform("img",file)
    }
  }

  const handlePdf = (e) => {
    const file = e.target.files[0]
    if(file){
      setpdf(file)
      setform("isi_buku",file)
    }
  }

  console.log(sortedkategori)

  return(
    <>
      {
        page === 1 &&
        <>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Judul</InputLabel>
            <TextField  
              size='small'
              type='text'
              name="judul"
              onChange={(e) => {handleForm(e),handleSlug()}}
              value={form.judul}
              onBlur={handleSlug}
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Penulis</InputLabel>
            <TextField
              size='small'
              type='text'
              name="penulis"
              onChange={handleForm}
              value={form.penulis}
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Sinopsis / Tentang</InputLabel>
            <TextField
              size='small'
              type='text'
              name="sinopsis"
              onChange={handleForm}
              value={form.sinopsis} 
              multiline
              rows={5}
            />
          </Box>
         
          <Button onClick={handlePage} method="+" variant='contained'>Selanjutnya</Button>
        </>
      }
      {
        page === 2 &&
        <>
         <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Penerbit</InputLabel>
            <TextField
              size='small'
              type='text'
              name="penerbit"
              onChange={handleForm}
              value={form.penerbit}
            />
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Tahun Terbit</InputLabel>
            <TextField
              size='small'
              type='date'
              name="tahun_terbit"
              onChange={handleForm}
              value={form.tahun_terbit}
            />
          </Box>
        <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Kategori</InputLabel>
            <Select
              size='small'
              name="kategori_id"
              onChange={handleForm}
              value={form.kategori_id || "0"}
            >
              <MenuItem value="0">Pilih Kategori</MenuItem>
              {
                kategori.map((item,index) => 
                  <MenuItem key={index} value={item.kategoriID}>{item.nama_kategori}</MenuItem>
                )
              }
            </Select>
          </Box>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Stok</InputLabel>
            <TextField
              size='small'
              type='number'
              name="stok"
              onChange={handleForm} 
              value={form.stok}
            />
          </Box>
          
          <Button onClick={handlePage} method="-" variant='contained' sx={{marginRight:"1em"}}>Sebelumnya</Button>
          <Button onClick={handlePage} method="+" variant='contained'>Selanjutnya</Button>
        </>
      }
      {
        page === 3 &&
        <>
          <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Perpustakaan</InputLabel>
            <Select
              size='small'
              name="perpus_id"
              onChange={handleForm}
              value={form.perpus_id || "0"}
            >
              <MenuItem value="0">Pilih Perpustakaan</MenuItem>
              {
                perpustakaan.map((item,index) => 
                  <MenuItem key={index} value={item.perpus_id}>{item.nama_perpus}</MenuItem>
                )
              }
            </Select>
           </Box>
           <Box className="flex flex-col mb-6">
            <InputLabel className='mb-2'>Durasi Peminjaman (hari)</InputLabel>
            <TextField  
              size='small'
              type='number'
              name="durasi_buku"
              onChange={(e) => {handleForm(e),handleSlug()}}
              value={form.durasi_buku}
              onBlur={handleSlug}
            />
          </Box>
           <Box className='flex flex-col mb-6'>
              <InputLabel className='mb-2'>Isi Buku</InputLabel>
              <TextField 
                size='small'
                onChange={handlePdf}
                type='file'
                inputProps={{ accept: 'application/pdf' }}
              />
           </Box>
           <Box className="mb-8">
            <InputLabel className='mb-2'>Cover Buku</InputLabel>
            <TextField type='file' onChange={handleImg} inputProps={{ accept: 'image/*' }}  />
            {
              img && 
              <>
                <img src={URL.createObjectURL(img)} className='mt-4 border rounded-lg h-64  w-full object-contain' />
              </>
            }
           </Box>
            <Button onClick={handlePage} method="-" variant='contained'>Sebelumnya</Button>
        </>
      }
      
      
    </>
  )
}

export default BukuForm