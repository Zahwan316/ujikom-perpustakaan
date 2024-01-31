import { Box } from "@mui/system"
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

const UlasanModalContent = (props) => {
  return(
    <>
      <Box>
        <img src="./assets/images/gojek.png" className="w-full h-64 mb-4" />
        <Box className='mb-6'>
          <Typography variant="h5">{props.judul}</Typography>
          <Typography variant="subtitle2">{props.rating}</Typography>
          <Typography variant="h6">{props.penulis}</Typography>
        </Box>
        <Box >
            <Typography variant="h4" mb={1}>Semua Ulasan</Typography>
            <Box className="overflow-y-scroll h-44" >
                {
                    
                }
                <Box className='mb-4 bg-gray-200 p-4 rounded-lg'>
                    <Link color="inherit" variant="h6" underline="hover" noWrap>{props.nama}</Link>
                    <Typography variant='body2'>{props.rating_pengguna}</Typography>
                    <Typography variant="body1">{props.ulasan} </Typography>
                </Box>
                
            </Box>
        </Box>
      </Box>
    </>
  )
}

export default UlasanModalContent