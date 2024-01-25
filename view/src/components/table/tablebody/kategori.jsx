import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import { IconButton, MenuItem, Popover, TableCell, TableRow } from '@mui/material';
import Iconify from 'src/components/iconify';

const KategoriTableBody = (props) => {
  const kategori = useItemStore((state) => state.kategori)
 

  const [open,setopen] = useState({})

  const handleClose = (itemid) => {
    setopen((prev) => ({...prev,[itemid] : null}))
  }

  const handleOpenMenu = (e,itemid) => {
    setopen((prev) => ({...prev,[itemid]:e.currentTarget}))
  }


  return(
    <>
      {
        Object.keys(kategori).length != 0 ?
         kategori.map((item,index) => 
            <TableRow key={index}>
              <TableCell >{item.nama_kategori}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleOpenMenu(e,item.kategoriID)}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
              <Popover
                open={Boolean(open[item.kategoriID])}
                anchorEl={open[item.kategoriID]}
                onClose={() => handleClose(item.kategoriID)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { width: 140 },
                }}
              >
              <MenuItem onClick={props.handleclick} typebtn="edit" id={item.kategoriID}>
                  <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={props.handleclick} typebtn="delete" id={item.kategoriID} sx={{ color: 'error.main' }}>
                  <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                  Hapus
                </MenuItem>
              </Popover>
            </TableRow>
         )
         :
         <TableRow>
          <TableCell>Data masih kosong</TableCell>
         </TableRow>
      }
    </>
  )
}

export default KategoriTableBody