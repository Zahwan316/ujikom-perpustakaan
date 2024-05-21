import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '../../../node_modules/@mui/material/';
import { Stack, Container, Box } from '@mui/system';

import React, { useState, useEffect } from 'react';
import AnggotaTableBody from './tablebody/anggota';
import Swal from 'sweetalert2';
import KategoriTableBody from './tablebody/kategori';
import BukuTableBody from './tablebody/buku';
import PeminjamanTableBody from './tablebody/peminjaman';
import PerpustakaanTableComponent from './tablebody/perpustakaan';
import SampahBukuTableBody from './tablebody/sampahbuku';

const TableComponent = (props) => {
  const [page,setpage] = useState(0)
  const [rowsPerPage,setrowsPerPage] = useState(10)
  

  const handleChangePage = (event,newPage) => {
    setpage(newPage)
  }
  
  const handleChangeRowsPerPage = (e) => {
    setrowsPerPage(parseInt(e.target.value,10))
    setpage(0)
  }
  const handleClick = (e) => {
    const typebtn = e.target.getAttribute("typebtn")
    const id = e.target.getAttribute("id")
    if(typebtn === "edit" || typebtn==="add"){
      props.handlemodal()
    }

    props.gettypebtn(typebtn,id)

    
    if(typebtn === "delete" || typebtn === "softdelete" || typebtn === "restore" || typebtn === "restoreall" || typebtn === "deleteall"){
      Swal.fire({
        title:"Apakah anda yakin?",
        text:`${typebtn === 'delete' || typebtn === 'softdelete' || typebtn==='deleteall' ? 'Data yang dihapus tidak dapat dikembalikan' : "Data akan segera dipulihkan"}`,
        icon:"warning",
        showCancelButton:true,
        confirmButtonColor:"#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:`Ya, ${typebtn === "delete" || typebtn === "softdelete" || typebtn === "deleteall" ? "Hapus!" : "Pulihkan! "}`
      }).then((result) => {
        if(result.isConfirmed){
          props.handleCrud(typebtn,id)
        }
      })
    }
  }

  return(
    <>
      <Container>
        <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"} mb={2}>
            <Typography variant="h4" className='w-1/2'>{props.title}</Typography>

            {
              props.page != "sampahbuku" ?
              <Button onClick={handleClick} variant='contained' typebtn="add">+ Tambah</Button>
              :
              <Box className='flex flex-row gap-2'>
                <Button variant='contained' color='error' typebtn='deleteall' onClick={handleClick}>Hapus Semua</Button>
                <Button variant='contained' color='primary' typebtn='restoreall' onClick={handleClick}>Pulihkan semua</Button>
                <Button variant='contained' color='secondary' onClick={() => props.navigate("/buku")}>Kembali</Button>
              </Box>
            }
        </Stack>

        {props.filter && props.filter}

        <TableContainer className='p-8'>
            <Table>
                <TableHead>
                    <TableRow>
                      {
                        props.tablehead.map((item,index) => 
                            <TableCell key={index}>{item}</TableCell>
                        )
                      }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.page === "anggota"  &&
                        <AnggotaTableBody
                          handleclick={handleClick}
                          
                        />
                    }

                    {
                      props.page === "kategori" &&
                      <KategoriTableBody
                        handleclick={handleClick}
                      />
                    }

                    {
                      props.page === "buku" &&
                      <BukuTableBody
                        handleclick={handleClick}
                      />
                    }

                    {
                      props.page === "peminjaman" && 
                      <PeminjamanTableBody 
                        handleclick={handleClick}
                        page={page}
                        rowsPerPage={rowsPerPage}
                      />
                    }

                    {
                      props.page === "perpustakaan" && 
                      <PerpustakaanTableComponent 
                        handleclick={handleClick}
                      />
                    }

                    {
                      props.page === "sampahbuku" &&
                      <SampahBukuTableBody 
                       handleclick={handleClick}
                      />
                    }
                </TableBody>
            </Table>  
            
        </TableContainer> 
      </Container>
    </>
  )
}

export default TableComponent