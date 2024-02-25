import React, { useState, useEffect } from 'react';
import useItemStore from '../../../../state/item';
import useUserStore from '../../../../state/user';
import { IconButton, MenuItem, Popover, TableCell, TableRow } from '@mui/material';
import Iconify from 'src/components/iconify';
import useStateStore from '../../../../state/state';

const PeminjamanTableBody = (props) => {
  const peminjaman = useItemStore((state) => state.peminjaman)
  const perpus = useItemStore((state) => state.perpus)
  const buku = useItemStore((state) => state.buku)
  const user = useItemStore((state) => state.user)
  const ref_peminjaman = useItemStore((state) => state.ref_peminjaman)
  const search = useStateStore((state) => state.search)

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
        peminjaman.length != 0 ?
         peminjaman.filter(item => !search || user.some((user) => user.userID === item.userID && user.nama_lengkap.toLowerCase().includes(search.toLowerCase()))).map((item,index) => 
          <TableRow key={index}>
            <TableCell key={index}>
              {
                perpus.map(items => 
                  items.perpus_id === item.perpus_id &&
                  items.nama_perpus    
                )
              }
            </TableCell>
            <TableCell>
              {
                buku.map(items => 
                  items.bukuID === item.bukuID &&
                  items.judul
                )
              }
            </TableCell>
            <TableCell>{item.tanggal_peminjaman}</TableCell>
            <TableCell>{item.tanggal_pengembalian || "Belum dikembalikan"}</TableCell>
            <TableCell>
                {
                  user.map(items => 
                    items.userID === item.userID &&
                    items.nama_lengkap
                  )
                }
            </TableCell>
            <TableCell>
              {
                ref_peminjaman.map(items => 
                  items.ref_peminjaman_id === item.status_peminjaman &&
                  items.nama
                )
              }
            </TableCell>
            <TableCell align="right">
                <IconButton onClick={(e) => handleOpenMenu(e,item.peminjamanID)}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
              <Popover
                open={Boolean(open[item.peminjamanID])}
                anchorEl={open[item.peminjamanID]}
                onClose={() => handleClose(item.peminjamanID)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { width: 140 },
                }}
              >
              <MenuItem onClick={props.handleclick} typebtn="edit" id={item.peminjamanID}>
                  <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={props.handleclick} typebtn="delete" id={item.peminjamanID} sx={{ color: 'error.main' }}>
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

export default PeminjamanTableBody

