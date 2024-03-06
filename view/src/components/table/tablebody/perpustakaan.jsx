import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import { IconButton, MenuItem, Popover, TableCell, TableRow } from '@mui/material';
import Iconify from 'src/components/iconify';

const PerpustakaanTableComponent = (props) => {
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  const [open,setopen] = useState({})

  const handleClose = (itemid) => {
    setopen((prev) => ({...prev,[itemid] : null}))
  }

  const handleOpenMenu = (e,itemid) => {
    setopen((prev) => ({...prev,[itemid]:e.currentTarget}))
  }
  useEffect(() => {
    console.log(perpus) 
  })
  return(
    <>
        {
            perpus.map((item,index) => 
              <TableRow>
                <TableCell>{index+ 1}</TableCell>
                <TableCell>{item.nama_perpus}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.no_hp}</TableCell>
                <TableCell align="right">
                    <IconButton onClick={(e) => handleOpenMenu(e,item.perpus_id)}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
                <Popover
                    open={Boolean(open[item.perpus_id])}
                    anchorEl={open[item.perpus_id]}
                    onClose={() => handleClose(item.perpus_id)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                    sx: { width: 140 },
                    }}
                >
                <MenuItem onClick={props.handleclick} typebtn="edit" id={item.perpus_id}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                    </MenuItem>

                    <MenuItem onClick={props.handleclick} typebtn="delete" id={item.perpus_id} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Hapus
                    </MenuItem>
                </Popover>
              </TableRow>
            )
        }
    </>
  )
}

export default PerpustakaanTableComponent