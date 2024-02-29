import { Typography,Button } from '@mui/material';
import { Box } from '@mui/system';

const KategoriCardComponent = (props) => {
  return(
    <Box className='w-64 h-32 rounded-lg border border-gray-400 cursor-pointer' sx={{backgroundImage:`linear-gradient(to right,#00000095,#00000075),url(${props.img})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
      <Box className='w-16 h-full flex items-center justify-center'>
        <Typography color={"#fff"}>{props.nama}</Typography>
      </Box>
    </Box>
  )
}

export default KategoriCardComponent