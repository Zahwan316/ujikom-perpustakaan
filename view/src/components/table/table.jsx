import { Button, Card, MenuItem, Select,TableFooter, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography ,TablePagination} from '@mui/material';
import { Stack, Container } from '@mui/system';

import React, { useState, useEffect } from 'react';
import AnggotaTableBody from './tablebody/anggota';
import Swal from 'sweetalert2';
import KategoriTableBody from './tablebody/kategori';
import BukuTableBody from './tablebody/buku';
import PeminjamanTableBody from './tablebody/peminjaman';

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
    if(typebtn != "delete"){
      props.handlemodal()
    }
    props.gettypebtn(typebtn,id)

    if(typebtn === "delete"){
      Swal.fire({
        title:"Apakah anda yakin?",
        text:"Data yang dihapus tidak dapat dikembalikan",
        icon:"warning",
        showCancelButton:true,
        confirmButtonColor:"#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:"Ya, Hapus!"
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
           
            <Button onClick={handleClick} variant='contained' typebtn="add">+ Tambah</Button>
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
                </TableBody>
            </Table>  
            
        </TableContainer> 
      </Container>
    </>
  )
}

export default TableComponent