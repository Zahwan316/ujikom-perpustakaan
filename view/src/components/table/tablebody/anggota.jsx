import { IconButton, MenuItem, Popover, TableCell, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useUserStore from '../../../../state/user';
import useItemStore from '../../../../state/item';
import Iconify from 'src/components/iconify';
import useStateStore from '../../../../state/state';

const AnggotaTableBody = (props) => {
  const [user,setuser] = useItemStore((state) => [state.user,state.setuser])
  const refuser = useUserStore((state) => state.ref_user)
  const perpus = useItemStore((state) => state.perpus)
  const user_logged = useUserStore((state) => state.user)
  const filtereduser = user.filter(item => item.perpus_id === user_logged.perpus_id)
  const filterrole = useStateStore((state) => state.filterrole)
  let no = 1;

  const [open,setopen] = useState({})

  const handleClose = (itemid) => {
    setopen((prev) => ({...prev,[itemid] : null}))
  }

  const handleOpenMenu = (e,itemid) => {
    setopen((prev) => ({...prev,[itemid]:e.currentTarget}))
  }

  return(
      user_logged.access_level === 0 ?
      user.map((item,index) => {
        if(filterrole != "0" && filterrole != ""){
          if(item.access_level == filterrole){
            return(
              <TableRow key={index}>
                 <TableCell>{no++}</TableCell>
                <TableCell>
                  {
                    perpus.map((items,index) => 
                      items.perpus_id == item.perpus_id &&
                      items.nama_perpus
                    )
                  }
                </TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.nama_lengkap}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>
                  {
                    refuser.map((items) => 
                      items.user_ref_id == item.access_level &&
                      items.nama
                    )
                  }
                </TableCell>
                <TableCell align="right">
                    <IconButton onClick={(e) => handleOpenMenu(e,item.userID)}>
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  </TableCell>
                  <Popover
                    open={Boolean(open[item.userID])}
                    anchorEl={open[item.userID]}
                    onClose={() => handleClose(item.userID)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: { width: 140 },
                    }}
                  >
                  <MenuItem onClick={props.handleclick} typebtn="edit" id={item.userID}>
                      <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                      Edit
                    </MenuItem>
  
                    <MenuItem onClick={props.handleclick} typebtn="delete" id={item.userID} sx={{ color: 'error.main' }}>
                      <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                      Hapus
                    </MenuItem>
                  </Popover>
              </TableRow>
            )
          }
        }
        else{
          return(
            <TableRow key={index}>
              <TableCell>{no++}</TableCell>
            <TableCell>
              {
                perpus.map((items,index) => 
                  items.perpus_id == item.perpus_id &&
                  items.nama_perpus
                )
              }
            </TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.nama_lengkap}</TableCell>
            <TableCell>{item.alamat}</TableCell>
            <TableCell>
              {
                refuser.map((items) => 
                  items.user_ref_id == item.access_level &&
                  items.nama
                )
              }
            </TableCell>
            <TableCell align="right">
                <IconButton onClick={(e) => handleOpenMenu(e,item.userID)}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
              <Popover
                open={Boolean(open[item.userID])}
                anchorEl={open[item.userID]}
                onClose={() => handleClose(item.userID)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { width: 140 },
                }}
              >
              <MenuItem onClick={props.handleclick} typebtn="edit" id={item.userID}>
                  <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={props.handleclick} typebtn="delete" id={item.userID} sx={{ color: 'error.main' }}>
                  <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                  Hapus
                </MenuItem>
              </Popover>
            </TableRow>
          )
        }
        }
      )
      :
       filtereduser.map((item,index) => {
        if(filterrole != "0" && filterrole != ""){
          if(item.access_level == filterrole){
            return(
              <TableRow key={index}>
                 <TableCell>{no++}</TableCell>
                <TableCell>
                  {
                    perpus.map((items,index) => 
                      items.perpus_id == item.perpus_id &&
                      items.nama_perpus
                    )
                  }
                </TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.nama_lengkap}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>
                  {
                    refuser.map((items) => 
                      items.user_ref_id == item.access_level &&
                      items.nama
                    )
                  }
                </TableCell>
                <TableCell align="right">
                    <IconButton onClick={(e) => handleOpenMenu(e,item.userID)}>
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  </TableCell>
                  <Popover
                    open={Boolean(open[item.userID])}
                    anchorEl={open[item.userID]}
                    onClose={() => handleClose(item.userID)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: { width: 140 },
                    }}
                  >
                  <MenuItem onClick={props.handleclick} typebtn="edit" id={item.userID}>
                      <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                      Edit
                    </MenuItem>
  
                    <MenuItem onClick={props.handleclick} typebtn="delete" id={item.userID} sx={{ color: 'error.main' }}>
                      <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                      Hapus
                    </MenuItem>
                  </Popover>
              </TableRow>
            )
          }
        }
        else{
          return(
            <TableRow key={index}>
              <TableCell>{no++}</TableCell>
            <TableCell>
              {
                perpus.map((items,index) => 
                  items.perpus_id == item.perpus_id &&
                  items.nama_perpus
                )
              }
            </TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.nama_lengkap}</TableCell>
            <TableCell>{item.alamat}</TableCell>
            <TableCell>
              {
                refuser.map((items) => 
                  items.user_ref_id == item.access_level &&
                  items.nama
                )
              }
            </TableCell>
            <TableCell align="right">
                <IconButton onClick={(e) => handleOpenMenu(e,item.userID)}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
              <Popover
                open={Boolean(open[item.userID])}
                anchorEl={open[item.userID]}
                onClose={() => handleClose(item.userID)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { width: 140 },
                }}
              >
              <MenuItem onClick={props.handleclick} typebtn="edit" id={item.userID}>
                  <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                  Edit
                </MenuItem>

                <MenuItem onClick={props.handleclick} typebtn="delete" id={item.userID} sx={{ color: 'error.main' }}>
                  <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                  Hapus
                </MenuItem>
              </Popover>
            </TableRow>
          )
        }
        }
      )

  )
}

export default AnggotaTableBody