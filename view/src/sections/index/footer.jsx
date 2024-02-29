import { Box } from "@mui/system"
import { Typography,Button } from '@mui/material';

const FooterIndex = () => {
  return(
    <Box className='w-full border h-2/6 px-36 mt-12 p-8 flex flex-col  '>
      <Box className='flex flex-row justify-between mb-16'>
        <Box className='w-32 h-32'>
          <img src='assets/images/smk.png' className="w-full h-full mb-2" />
          <Typography className='text-center' variant='h6'>Smea Digital</Typography>
        </Box>
        <Box className='w-1/3'>
          <Typography variant='h6'>Tentang Kami</Typography>
          <Typography>Kami adalah perpustakaan modern yang mengadaptasi teknologi internet untuk memudahkan akses ke koleksi buku yang beragam. Meskipun kami mempertahankan koleksi fisik yang luas, kami juga menyediakan layanan peminjaman buku secara online, memungkinkan anggota kami untuk menikmati kenyamanan membaca di mana saja dan kapan saja.</Typography>
        </Box>
        <Box>
        <Typography variant='h6'>Kontak</Typography>
          <Typography variant="subtitle1">Alamat : JL KH Mustopa Parung Lesang RT 05 RW 10</Typography>
          <Typography variant="subtitle1">Email : smkn1banjar@gmail.com </Typography>
          <Typography variant="subtitle1">Website : smkn1banjar.sch.id </Typography>
        </Box>
      </Box>
      <Box className='w-full'>
        <Typography className='text-center' variant="body1">Copyright 2024.All right reserved</Typography>
      </Box>
    </Box>
  )
}

export default FooterIndex