import { Box, Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Typography,Button } from '@mui/material';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useItemStore from '../../../../state/item';
import { Input } from 'postcss';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import useFormStore from '../../../../state/form';
import dayjs from 'dayjs';


const styles = StyleSheet.create({
  body:{
    padding:25,
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    color:'#000000',
    textAlign:'center',
    
  },
  text:{
    fontSize:14
  },
  perpus_title:{
    fontsize:18,
    textAlign:"center",
    color:'#000000',
    marginBottom:30,
  },
  text_bottom:{
    marginBottom:16,
    fontSize:14
  }
 
})

const PDFviewpage = (props) => {
  return(
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Laporan Buku Bulan {props.month}</Text>
        <Text style={styles.perpus_title}>Perpustakaan {props.perpus}</Text>
        
        <Text style={styles.text}>Jumlah buku yang pernah dipinjam : {props.data.length} buku</Text>
        <Text style={styles.text_bottom}>List orang yang pernah meminjam buku : </Text>
        {
          props.data.map((item,index) => 
            <>
              <Text style={styles.text}>
      
          
              </Text> 
              <Text style={styles.text}>
                Tanggal Peminjaman : 
                {item.tanggal_peminjaman}
              </Text> 
              <Text style={styles.text_bottom}>
                Buku yang dipinjam : 
                {
                  props.buku.map(items => 
                    item.bukuID === items.bukuID &&
                    items.judul
                  )
                }
              </Text>
            
            </>
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
  const [month,setmonth] = useState()
  const [filteredData, setFilteredData] = useState([]);
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [namaperpus,setnamaperpus] = useState("")

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                   "Juli", "Agustus", "September", "Oktober", "November", "December"];

  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const currentMonthEnd = new Date();
  currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);
  currentMonthEnd.setHours(23, 59, 59, 999);

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
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
          const data = res.data.data
          setnamaperpus(data[0].nama_perpustakaan)
        }
        const date = new Date()
        setmonth(monthNames[date.getMonth() ])
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  useEffect(() => {
    console.log(filteredData)
  })

  useEffect(() => {
    // const currentMonthStart = dayjs().startOf('month');
    // const currentMonthEnd = dayjs().endOf('month');

    // const filtered = peminjaman.filter((item) => {
    //   const date = dayjs(item.tanggal_peminjaman);
    //   return date.isSame(currentMonthStart, 'month') || date.isBetween(currentMonthStart, currentMonthEnd, 'month', '[]');
    // });
    const filtered = peminjaman.filter((item) => {
      const date = new Date(item.tanggal_peminjaman );
      return (
        date >= currentMonthStart && date <= currentMonthEnd
      );
    });
    setFilteredData(filtered);

    //setFilteredData(filtered);
  }, [peminjaman]);

  return(
    <>
      <Container>
        <Stack>
          <Typography variant='h4' mb={2}>
            Laporan
          </Typography>
        </Stack>
        <Box>
          <InputLabel className='mb-4'>Unduh laporan bulan ini</InputLabel>
          <PDFDownloadLink 
            document={
            <PDFviewpage 
              buku={buku}
              month={month}
              data={filteredData}
              user={user}

             />} fileName='laporan-peminjaman'>
          <Button variant='contained'>Unduh Laporan</Button>
            {({loading}) => (loading ? "Loading..." : "Download")}
          </PDFDownloadLink>
        </Box>
      </Container>
    </>
  )
}

export default LaporanViewPage