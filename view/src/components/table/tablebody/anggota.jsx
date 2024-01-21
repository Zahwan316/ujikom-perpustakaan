import { TableCell, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useUserStore from '../../../../state/user';

const AnggotaTableBody = () => {
  const [user,setuser] = useUserStore((state) => [state.user,state.setuser])

  

  return(
    <TableRow>
      <TableCell>lorem</TableCell>
    </TableRow>
  )
}

export default AnggotaTableBody