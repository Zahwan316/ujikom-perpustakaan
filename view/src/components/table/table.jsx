import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack, Container } from '@mui/system';

import React, { useState, useEffect } from 'react';
import AnggotaTableBody from './tablebody/anggota';

const TableComponent = (props) => {
  const handleClick = () => {
    props.handlemodal()
  }

  return(
    <>
      <Container>
        <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
            <Typography variant="h4" className='w-1/2'>{props.title}</Typography>

            <Button onClick={handleClick} variant='contained'>+ Tambah</Button>
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
                        <AnggotaTableBody />
                    }
                </TableBody>
            </Table>  
        </TableContainer> 
      </Container>
    </>
  )
}

export default TableComponent