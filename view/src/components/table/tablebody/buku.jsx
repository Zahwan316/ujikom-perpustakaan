import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import { IconButton, MenuItem, Popover, TableCell, TableRow } from '@mui/material';
import Iconify from 'src/components/iconify';

const BukuTableBody = (props) => {
  const buku = useItemStore((state) => state.buku)
  const perpustakaan = useItemStore((state) => state.perpus)
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
        Object.keys(buku).length != 0 ?
         buku.map((item,index) => 
           <TableRow key={index} >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.judul}</TableCell>
              <TableCell>{item.penulis}</TableCell>
              <TableCell>{item.penerbit}</TableCell>
              <TableCell>{item.tahun_terbit}</TableCell>
              <TableCell>
                {
                  kategori.map(items => 
                    items.kategoriID === item.kategori_id &&
                    items.nama_kategori  
                  )
                }
              </TableCell>
              <TableCell>
                {
                  perpustakaan.map(items => 
                    items.perpus_id === item.perpus_id &&
                    items.nama_perpus
                  )
                }
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleOpenMenu(e,item.bukuID)}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
              <Popover
                open={Boolean(open[item.bukuID])}
                anchorEl={open[item.bukuID]}
                onClose={() => handleClose(item.bukuID)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { width: 140 },
                }}
              >
              <MenuItem onClick={props.handleclick} typebtn="edit" id={item.bukuID}>
                  <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={props.handleclick} typebtn="softdelete" id={item.bukuID} sx={{ color: 'error.main' }}>
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

export default BukuTableBody