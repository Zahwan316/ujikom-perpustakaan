import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack, Container } from '@mui/system';

import React, { useState, useEffect } from 'react';
import AnggotaTableBody from './tablebody/anggota';
import Swal from 'sweetalert2';

const TableComponent = (props) => {


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
        <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
            <Typography variant="h4" className='w-1/2'>{props.title}</Typography>

            <Button onClick={handleClick} variant='contained' typebtn="add">+ Tambah</Button>
        </Stack>

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
                </TableBody>
            </Table>  
        </TableContainer> 
      </Container>
    </>
  )
}

export default TableComponent