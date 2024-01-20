import { Card, Table, TableBody, TableHead, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import TableComponent from 'src/components/table/table';

const AnggotaViewPage = () => {
  const tablehead = [
    "Perpus",
    "Username",
    "Email",
    "Nama Lengkap",
    "Alamat",
    "Role"

  ]

  return(
    <>
        <TableComponent 
        tablehead={tablehead}
        />
    
    </>
     

  )
}

export default AnggotaViewPage;