import { Typography,Button } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const KategoriCardComponent = (props) => {
  const navigate = useNavigate()

  const redirect = () => {
    navigate(`/kategori/${props.nama}`)
  }

  return(
    <Box className='w-64 h-32 rounded-lg border border-gray-400 cursor-pointer' onClick={redirect} sx={{backgroundImage:`linear-gradient(to right,#00000095,#00000075),url(${props.img})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
      <Box className='w-auto p-8 h-full flex items-center justify-start'>
        <Typography color={"#fff"}>{props.nama}</Typography>
      </Box>
    </Box>
  )
}

export default KategoriCardComponent