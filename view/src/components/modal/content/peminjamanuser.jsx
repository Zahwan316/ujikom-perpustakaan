import { Box, Stack } from "@mui/system"
import { Typography,Button } from '@mui/material';

const PeminjamanUserModal = (props) => {
  return(
    <Stack flex direction={"row"} gap={4}>
      <Box className='w-1/4'>
        <img src={`${import.meta.env.VITE_APP_URL_API}img/${props.buku.img || null}`} className="w-full h-64 rounded-lg object-fill" />
      </Box>
      <Box>
        <Box className='mb-2'>
          <Typography variant={"h6"}>Nama Buku : </Typography>
          <Typography variant={"subtitle1"}>{props.buku.judul || "Tidak ditemukan"} </Typography>
        </Box>
        <Box className='mb-2'>
          <Typography variant={"h6"}>Penulis : </Typography>
          <Typography variant={"subtitle1"}>{props.buku.penulis || "Tidak ditemukan"} </Typography>
        </Box>
        <Box className='mb-6'>
          <Typography variant={"h6"}>Penerbit : </Typography>
          <Typography variant={"subtitle1"}>{props.buku.penerbit || "Tidak ditemukan"} </Typography>
        </Box>
        <Box className='flex gap-4'>
          <Button variant="contained" color="primary" onClick={props.handleOpenBook}>Baca buku</Button>
          <Button variant="contained" color="success" onClick={props.handleUlasBuku} >Ulas buku</Button>
          <Button variant="contained" color="error" onClick={props.handleReturnBook}>Kembalikan buku</Button>
        </Box>
      </Box>
    </Stack>
  )
}

export default PeminjamanUserModal