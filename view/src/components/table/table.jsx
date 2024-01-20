import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack, Container } from '@mui/system';

import React, { useState, useEffect } from 'react';

const TableComponent = (props) => {
  return(
    <>
      <Container>
        <Stack>
            <Typography variant="h4">Anggota</Typography>
        </Stack>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                {
                    props.tablehead.map((item) => 
                        <TableCell>{item}</TableCell>
                        )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.page === "anggota"  
                        
                    }
                </TableBody>
            </Table>  
        </TableContainer> 
      </Container>
    </>
  )
}

export default TableComponent