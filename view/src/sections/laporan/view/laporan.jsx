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
import * as XLSX from "xlsx"

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
    fontSize:13
  },
  text_title:{
    fontSize:16,
    fontWeight:"bold",
    color:'#000000',
  },
  perpus_title:{
    fontsize:18,
    textAlign:"center",
    color:'#000000',
    marginBottom:30,
  },
  text_bottom:{
    marginBottom:16,
    fontSize:13
  },
  text_bottom_title:{
    marginBottom:16,
    fontSize:16,
    fontWeight:700,
    color:'#000000',
  }
 
})

const PDFviewpage = (props) => {
  return(
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Laporan Buku Bulan {props.month}</Text>
        <Text style={styles.perpus_title}>Perpustakaan {props.perpus.length != 0 && props.perpus[0].nama_perpus}</Text>
        
        <Text style={styles.text_title}>Jumlah buku yang pernah dipinjam : {props.data.length} buku</Text>
        <Text style={styles.text_bottom_title}>Buku yang sering dipinjam : </Text>
        {
          Object.keys(props.frequentBook).length != 0 &&
          props.frequentBook.map((item,index) => 
            props.buku.map(items => 
                item.bookid === items.bukuID &&
                <Text style={styles.text_bottom}>{index + 1}. Nama buku : {items.judul}</Text>
            )  
          )
        }
        <Text style={styles.text_bottom_title}>Daftar orang yang pernah meminjam buku : </Text>
        {
          props.data.map((item,index) => 
            <>
              <Text style={styles.text}> 
                {index + 1}.
                Nama Peminjam : 
                {
                  props.user.map(items => 
                    item.userID === items.userID &&
                    items.username  
                  )
                }
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

const GenerateExcelButton = ({ data, filename }) => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <Button variant='contained' color='primary' onClick={exportToExcel}>Unduh Laporan</Button>
  );
};

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

  const countBookIds = (peminjaman) => {
    const bookIdCounts = {};
    peminjaman.filter((item) => {
      const bookId = item.bukuID;
      if (bookIdCounts[bookId]) {
        bookIdCounts[bookId]++;
      } else {
        bookIdCounts[bookId] = 1;
      }
    });
    return bookIdCounts;
  };

  const sortBooksByMostBorrowed = (peminjaman) => {
    const bookIdCounts = countBookIds(peminjaman);
    const sortedBookIds = Object.keys(bookIdCounts).sort(
      (a, b) => bookIdCounts[b] - bookIdCounts[a]
    );
    return sortedBookIds.map((bookId) => {
      return { bookid: parseInt(bookId) };
    });
  };

  const sortdata = sortBooksByMostBorrowed(peminjaman)

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
    const filtered = peminjaman.filter((item) => {
      const date = new Date(item.tanggal_peminjaman );
      return (
        date >= currentMonthStart && date <= currentMonthEnd
      );
    });
    const relatedFiltered = filtered.map(item => {
      const filtereduser = user.find(items => items.userID === item.userID && items.nama_lengkap)
      const filteredbuku = buku.find(items => items.bukuID === item.bukuID && items.judul)
      const filteredperpustakaan = perpus.find(items => items.perpus_id === item.perpus_id && items.nama_perpus)
      return {
          PeminjamanID:item.peminjamanID,
          Nama_Peminjam:filtereduser.nama_lengkap,
          Judul_buku:filteredbuku.judul,
          Tanggal_Peminjaman:item.tanggal_peminjaman,
          Tanggal_Pengembalian:item.tanggal_pengembalian,
          Perpustakaan:filteredperpustakaan.nama_perpus,
          created_date:item.created_date,
          status_peminjaman:item.peminjaman === 1 ? "Dipinjam" : "Dikembalikan"
        }
      
    })
    setFilteredData(relatedFiltered);

    //setFilteredData(filtered);
  }, [peminjaman]);

  return(
    <>
      <Container className='bg-white p-8 rounded-2xl'>
        <Stack>
          <Typography variant='h4' mb={2}>
            Laporan
          </Typography>
        </Stack>
        <Box>
          <InputLabel className='mb-4'>Unduh laporan bulan ini</InputLabel>
          {/* <PDFDownloadLink 
            document={
            <PDFviewpage 
              buku={buku}
              month={month}
              data={filteredData}
              user={user}
              perpus={perpus}
              frequentBook={sortdata}
             />} fileName='laporan-peminjaman'>
          <Button variant='contained'>Unduh Laporan</Button>
            {({loading}) => (loading ? "Loading..." : "Download")}
          </PDFDownloadLink> */}
          <GenerateExcelButton data={filteredData} filename="Laporan Peminjaman" />
        </Box>
      </Container>
    </>
  )
}

export default LaporanViewPage