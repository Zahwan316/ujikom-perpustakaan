import { Box, Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useItemStore from '../../../../state/item';
import { Input } from 'postcss';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from 'jspdf';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import useFormStore from '../../../../state/form';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = StyleSheet.create({
  body:{
    padding:25,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000000',
    textAlign:'center',
    marginBottom:30,
  }
})

const PDFviewpage = (props) => {
  //const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])

  return(
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Laporan Buku</Text>
        {
          props.buku.map(item => 
            <Text>
              {item.judul}
            </Text>
            )
        }
      </Page>
    </Document>
  )
}

const LaporanViewPage = () => {
  const [selectedoption,setselectedoption] = useState("0")
  const [user,setuser] = useItemStore((state) => [state.user,state.setuser])
  const [buku,setbuku] = useItemStore((state) => [state.buku,state.setbuku])
  const [peminjaman,setpeminjaman] = useItemStore((state) => [state.peminjaman,state.setpeminjaman])
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])

  const handleSelectedOption = (e) => {
    setselectedoption(e.target.value)
  }

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  useEffect(() => {
    resetform()
  },[selectedoption])

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(Object.keys(user).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}user`)
          setuser(res.data.data)
        }
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
    fetchData()
  },[])

  useEffect(() => {
    console.log(form)
  })

  return(
    <>
      <Container>
        <Stack>
          <Typography variant='h4' mb={2}>
            Laporan
          </Typography>
        </Stack>
        <Box mb={4}>
          <InputLabel className='mb-2'>Pilih Laporan Yang Akan Diunduh</InputLabel>
          <Select
            size='small'
            defaultValue={0}
            onChange={handleSelectedOption}
          >
            <MenuItem value="0">Pilih Laporan</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="buku">Buku</MenuItem>
          </Select>
        </Box>
        {
          selectedoption != "0" &&
           <Box className="mb-6">
             {
                selectedoption === "user" &&
                <Box className="mb-4">
                <InputLabel className='mb-2'>Nama User</InputLabel>
                <Select
                    defaultValue={0}
                    size="small"
                    name="userID"
                    onChange={handleForm}
                >
                    <MenuItem value="0">Pilih User</MenuItem>
                    {
                    user.map((item,index) => 
                        <MenuItem key={index} value={item.userID}>{item.nama_lengkap}</MenuItem>
                    )
                    }
                </Select>
                </Box>
             }
             {
                selectedoption === "buku" &&
                <Box className="mb-4">
                <InputLabel className='mb-2'>Judul Buku</InputLabel>
                <Select
                    defaultValue={0}
                    size="small"
                    name="bukuID"
                    onChange={handleForm}
                >
                    <MenuItem value="0">Pilih Buku</MenuItem>
                    {
                      buku.map((item,index) => 
                        <MenuItem key={index} value={item.bukuID}>{item.judul}</MenuItem>
                      )
                    }
                </Select>
              </Box>

             }
             <Box className="mb-4">
               <InputLabel className='mb-2'>Dari Tanggal</InputLabel>
               <TextField type='date' size='small' name='tanggal_mulai' onChange={handleForm} value={form.tanggal_mulai} />
             </Box>
             <Box className="mb-4">
               <InputLabel className='mb-2'>Sampai Tanggal</InputLabel>
               <TextField type='date' size='small' name="tanggal_akhir" onChange={handleForm} value={form.tanggal_akhir} />
             </Box>
           </Box>
        }
        {
          selectedoption != "0" &&
          <>
            <PDFDownloadLink document={<PDFviewpage buku={buku} />} fileName='FORM'>
            <Button variant='contained'>Unduh Laporan</Button>
              {({loading}) => (loading ? "Loading..." : "Download")}
            </PDFDownloadLink>
          </>
        }
      </Container>
    </>
  )
}

export default LaporanViewPage