import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import {Select,MenuItem} from "@mui/material"
import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import useFormStore from '../../../state/form';
import { Alert, AlertTitle, Snackbar, InputLabel } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import validator from 'validator';
import useItemStore from '../../../state/item';
import useStateStore from '../../../state/state';
import {useNavigate} from "react-router-dom"

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [form,setform,resetform] = useFormStore((state) => [state.form,state.setform,state.resetform])
  const [success,setsuccess] = useState(false)
  const [error,seterror] = useState({})
  const [typelogin,settypelogin] = useStateStore((state) => [state.typelogin,state.settypelogin])
  const [page,setpage] = useState(1)
  const [perpus,setperpus] = useItemStore((state) => [state.perpus,state.setperpus])
  

  const validateinput = () => {
    const errors = {}

    if(typelogin === "login"){
      if(!form.email){
        errors.email = "Email tidak boleh kosong"
      }
      
      if(!form.password){
        errors.password = "Password tidak boleh kosong"
      }
      else if(form.password.length < 8){
        errors.password = "Panjang password kurang dari 8"
      }
    }

    if(typelogin === "register"){
      if(!form.email){
        errors.email = "Email tidak boleh kosong"
      }
      if(!validator.isEmail(form.email)){
        errors.email = "Email tidak valid"

      }
  
      if(!form.password){
        errors.password = "Password tidak boleh kosong"
      }
      else if(form.password.length < 8){
        errors.password = "Panjang password kurang dari 8"
      }

      if(!form.username){
        errors.username = "Username tidak boleh kosong"
      }

      if(!form.nama_lengkap){
        errors.nama_lengkap = "Nama lengkap tidak boleh kosong"
      }

      if(!form.perpus_id){
        errors.nama_lengkap = "Perpustakaan tidak boleh kosong"
      }

      if(!form.no_hp){
        errors.no_hp = "No hp tidak boleh kosong"
      }
      else if(!validator.isMobilePhone(form.no_hp,"id-ID")){
        errors.no_hp = "No hp tidak valid"
      }

      if(!form.alamat){
        errors.alamat = "Alamat tidak boleh kosong"
      }
    }

    seterror(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = async() => {
    try{
      if(validateinput()){
        let res = await axios.post(`${import.meta.env.VITE_APP_URL_API}login`,form)
        const token = res.data.token
        const data = res.data
        Cookies.set("token",token)
        setsuccess(true)
        setTimeout(() => {
          if(data.access_level === 1 || data.access_level === 0){
            window.location.href = "/dashboard"
          }
          else if(data.access_level === 2){
            window.location.href = "/buku"
          }
          else if(data.access_level === 3){
            window.location.href= '/'
           
          }
        }, 1000);
      }
    }
    catch(e){
      console.log(e)
      const error = {}
      error.server = e.response.data.message
      seterror(error)
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault()
    try{
      if(validateinput()){
        let res = await axios.post(`${import.meta.env.VITE_APP_URL_API}register`,form)
        setsuccess(true)
        setTimeout(() => {
          settypelogin("login")
        }, 1000);
        resetform()
      }
    }
    catch(e){
      console.log(e)
      const errors = {}
      errors.server = e.response.data.message
      seterror(errors)
    }
  }

  const handleform = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  const handleTypeLogin = () => {
    resetform()
    if(typelogin === "login"){
      settypelogin("register")
    }else{
      settypelogin("login")
    }
  }

  const handlePage = (e) => {
    const method = e.target.getAttribute("method")

    if(method === "+"){
      setpage((prev) => prev + 1)
    }
    else if(method === "-"){
      setpage((prev) => prev - 1)
    }
  }

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(perpus).length === 0){
          let res = await axios.get(`${import.meta.env.VITE_APP_URL_API}perpus`)
          setperpus(res.data.data)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    resetform()
    seterror("")
    if(typelogin === "register"){
      //setform("perpus_id",perpus[0].perpus_id)
      setform("access_level",3)
    }
  },[typelogin])

  const renderForm = (
    <>
      <Stack spacing={3} mb={2}>
        <TextField 
          name="email" 
          label="Email address" 
          onChange={handleform}
          value={form.email}
          error={error.email}
          helperText={error.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleform}
          value={form.password}
          error={error.password}
          helperText={error.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Typography variant='subtitle2' mb={4}>Belum mempunyai akun? <span onClick={handleTypeLogin} className='text-blue-500 cursor-pointer'>Daftar Sekarang</span></Typography>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </>
  );

  const renderRegister = (
    <>
      <Stack spacing={3} mb={2} className='overflow-scroll h-full'>
          <Box className='flex flex-wrap flex-row gap-4'>
            <Box className='w-full flex flex-row gap-8'>
              <Box className='flex flex-col w-1/2'>
                <InputLabel className='mb-2'>Username</InputLabel>
                <TextField 
                    name='username'
                    onChange={handleform}
                    error={error.username}
                    helperText={error.username}
                    value={form.username}
                    size='small'
                    className='border border-gray-600'
                />
              </Box>
              <Box className='flex flex-col w-1/2'>
                <InputLabel className='mb-2'>Email</InputLabel>
                <TextField 
                  type='email'
                  name='email'
                  onChange={handleform}
                  error={error.email}
                  helperText={error.email}
                  value={form.email}
                  size='small'
                />
              </Box>

            </Box>
            <Box className='w-full flex flex-row gap-8'>
            <Box className='flex flex-col  w-1/2'>
            <InputLabel className='mb-2'>Password</InputLabel>
             <TextField
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={handleform}
                value={form.password}
                error={error.password}
                helperText={error.password}
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

            </Box>
            
            <Box className='flex flex-col  w-1/2'>
              <InputLabel className='mb-2'>Nama Lengkap</InputLabel>
              <TextField 
                name='nama_lengkap'
                onChange={handleform}
                error={error.nama_lengkap}
                helperText={error.nama_lengkap}
                value={form.nama_lengkap}
                size='small'
              />
            </Box>

            </Box>

          </Box>
          <Box className='flex flex-col flex-wrap'>
            <InputLabel className='mb-2'>No Telpon</InputLabel>
            <TextField 
              name='no_hp'
              onChange={handleform}
              error={error.no_hp}
              helperText={error.no_hp}
              value={form.no_hp}
              size='small'
              type='number'
            />
          </Box>

          <Box className='flex flex-col flex-wrap'>
            <InputLabel className='mb-2'>Perpustakaan</InputLabel>
            <Select
              name='perpus_id'
              onChange={handleform}
              error={error.perpus_id}
              helperText={error.perpus_id}
              value={form.perpus_id}
              size='small'
  
            >
              <MenuItem>Pilih Perpustakaan</MenuItem>
              {
                perpus.map(item => 
                  <MenuItem value={item.perpus_id}>{item.nama_perpus}</MenuItem>  
                )
              }
            </Select>
          </Box>

          <Box className='flex flex-col flex-wrap'>
            <InputLabel className='mb-2'>Alamat</InputLabel>
            <TextField 
              name='alamat'
              onChange={handleform}
              error={error.alamat}
              helperText={error.alamat}
              value={form.alamat}
              size='small'
              rows={4}
              multiline
            />
          </Box>
          
        
       

        <Typography variant='subtitle2' mb={4}>Sudah mempunyai akun? <span onClick={handleTypeLogin} className='text-blue-500 cursor-pointer'>Login Sekarang</span></Typography>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleRegister}
        >
          Registrasi
        </LoadingButton>

      </Stack>
    </>
  )

  

  return (
    <>
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" flex={'flex'} sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: typelogin === "login" ? 420 : 720,
          }}
        >
          <Typography variant="h4" mb={4}>{typelogin === "login" ? "Login" : "Registrasi"} Perpus</Typography>

          {
           typelogin === "login"?
           renderForm
           :
           renderRegister
          }
         
        </Card>
      </Stack>
      <Stack>
        {
          success &&
          <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w 3/2'>
            <Alert variant='filled' severity='success' className='w-full'>
              <AlertTitle>Berhasil</AlertTitle>
              {
                typelogin === "login"?
                "Login Berhasil"
                :
                "Registrasi Berhasil"
              }
            </Alert>
          </Snackbar>

        }
        {
          error.server &&
          <Snackbar open={true} autoHideDuration={1000} anchorOrigin={{vertical:"top",horizontal:"right"}} className='w 3/2'>
            <Alert variant='filled' severity='error' className='w-full'>
              <AlertTitle>Gagal</AlertTitle>
              {error.server}
            </Alert>
          </Snackbar>
        }
      </Stack>
    </Box>
    </>
  );
}
