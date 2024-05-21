import { Box, } from '@mui/system';
import { Typography, Button, TextField } from '../../../node_modules/@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AccountPopover from 'src/layouts/dashboard/common/account-popover';
import useStateStore from '../../../state/state';
import React, { useState} from 'react';
import Iconify from 'src/components/iconify';
import InputAdornment from '@mui/material/InputAdornment';




const NavBarIndexComponent = () => {
  const navigate = useNavigate() 
  const token = Cookies.get("token")
  const [typelogin,settypelogin] = useStateStore((state) => [state.typelogin,state.settypelogin])
  const [search,setsearch] = useState("")

  const redirectToHome = () => {
    navigate("/")
  }

  const redirectToLogin = () => {
    navigate("/login")
    settypelogin("login")
  }

  const redirectToRegister = () => {
    navigate("/login")
    settypelogin("register")
  }

  const handleInput = (e) => { 
    setsearch(e.target.value)
  }

  const handleSearch = (e) => {
    if(e.key === "Enter"){
      navigate(`/search/${search}`)
    }
  }
  
  return(
    <nav className='flex flex-row items-center justify-between mb-8 fixed bg-white w-full h-20 px-48 z-50 shadow-sm'>
      <Box className='flex flex-row items-center gap-2' onClick={redirectToHome}>
        <img src={`${import.meta.env.VITE_APP_URL_API}img/smk.png`} className='w-12 h-12' />
        <Typography variant='h6' className='cursor-pointer' >Smea Digital</Typography>
      </Box>
      <Box className='w-3/4 flex flex-row gap-8 justify-between' >
        <Box className='w-4/6'>
         <TextField 
           placeholder="Cari nama buku...."
           sx={{fontWeight:"bold",borderRadius:"12px"}}
           className='w-full'
           size='small'
           onChange={handleInput}
           onKeyDown={handleSearch}
           InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
              </InputAdornment>
            ),
          }}
         />
        </Box>
        <Box className='flex gap-4 justify-end'>
          {
            token ?
            <AccountPopover />
            :
            <>
              <Button variant='outlined' onClick={redirectToLogin} sx={{borderRadius:"18px"}}>Masuk</Button>
              <Button variant='contained' onClick={redirectToRegister} sx={{borderRadius:"18px"}}>Daftar</Button>
            </>
          }
        </Box>
      </Box>
    </nav>
  )
}

export default NavBarIndexComponent;