import useItemStore from "../../../../state/item"
import { IconButton, MenuItem, Popover, TableCell, TableRow } from '../../../../node_modules/@mui/material';
import Iconify from 'src/components/iconify';
import React, { useState, useEffect } from 'react';

const SampahBukuTableBody = (props) => {
  const buku = useItemStore((state) => state.buku)
  const kategori = useItemStore((state) => state.kategori)
  const perpus = useItemStore((state) => state.perpus)
  const [open,setopen] = useState({})
  let indextable = 1;
  const handleClose = (itemid) => {
    setopen((prev) => ({...prev,[itemid] : null}))
  }

  const handleOpenMenu = (e,itemid) => {
    setopen((prev) => ({...prev,[itemid]:e.currentTarget}))
  }

  useEffect(() => {
    console.log(buku)
  })
  return(
    <>
      {
        Object.keys(buku).length!= 0?
        buku.map((item,index) => 
          item.soft_delete === 1 &&
          <TableRow key={index}>
            <TableCell >{indextable++}</TableCell>
            <TableCell >{item.judul}</TableCell>
            <TableCell >{item.penulis}</TableCell>
            <TableCell >{item.penerbit}</TableCell>
            <TableCell >{item.tahun_terbit}</TableCell>
            <TableCell >
              {
                kategori.map(items => 
                  items.kategoriID === item.kategori_id &&
                  items.nama_kategori    
                )
              }
            </TableCell>
            <TableCell>
              {
                perpus.map(items => 
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
            <MenuItem onClick={props.handleclick} typebtn="restore" id={item.bukuID}>
            <svg className="mr-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path  fill="currentColor" d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0"></path></svg>
                  Pulihkan
            </MenuItem>
            <MenuItem onClick={props.handleclick} typebtn="delete" id={item.bukuID} sx={{ color: 'error.main' }}>
                <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                  Hapus
            </MenuItem>
            </Popover>
          </TableRow>
        )
        :
        <TableRow>
          <TableCell colSpan={10}>Tidak ada data</TableCell>
        </TableRow>
      }
    </>
  )
}

export default SampahBukuTableBody