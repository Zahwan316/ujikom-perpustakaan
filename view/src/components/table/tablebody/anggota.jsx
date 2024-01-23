import { TableCell, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useUserStore from '../../../../state/user';

const AnggotaTableBody = () => {
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])



  return(
      user.map((item,index) => 
        <TableRow key={index}>
          <TableCell>{item.perpus_id}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>{item.nama_lengkap}</TableCell>
          <TableCell>{item.alamat}</TableCell>
          <TableCell>{item.role}</TableCell>
        </TableRow>
      )
    
   
  )
}

export default AnggotaTableBody