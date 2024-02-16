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
  },
  text:{
    fontSize:14
  }
})

const PDFviewpage = (props) => {
  return(
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Laporan Buku Bulan {props.month}</Text>
        {
          props.data.map(item => 
            <>
              <Text style={styles.text}>
                {
                  propsdbuku.map(items => 
                    items.bukuID === item.bukuID &&
                    items.judul  
                  )
                }
              </Text> 
              <Text style={styles.text}>
                {item.tanggal_peminjaman}
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
        const date = new Date()
        setmonth(monthNames[date.getMonth() + 1])
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