import { Box, Stack } from '@mui/system';
import { Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBarIndexComponent = () => {
  const navigate = useNavigate() 

  const redirectToLogin = () => {
    navigate("/login")
  }
  
  return(
    <nav className='flex flex-row items-center justify-between mb-8'>
      <Box>
        <Typography variant='h6'>Smea Digital</Typography>
      </Box>
      <Box className='w-96 flex flex-row gap-8' >
        <Box className='w-64'>
          <TextField 
            size='small'
            placeholder='Cari buku...'
            fullwidth
          />
        </Box>
        <Box className='flex gap-4'> 
          <Button variant='outlined' onClick={redirectToLogin} sx={{borderRadius:"18px"}}>Masuk</Button>
          <Button variant='contained' sx={{borderRadius:"18px"}}>Daftar</Button>
        </Box>
      </Box>
    </nav>
  )
}

export default NavBarIndexComponent;