import { Stack, Container, Box } from '@mui/system';
import { Typography,Button } from '@mui/material';

const DescriptionDetailBukuComponent = (props) => {
  return(
    <>
        <Box className='w-2/3 '>
            <Box mb={4}>
              <Typography variant='h3'>
                {props.buku && props.buku.judul}
              </Typography>
              <Typography variant='h6'>
                {props.buku && props.buku.penulis}
              </Typography>
              <Typography variant='body2'>
                {props.buku && props.buku.penerbit}
              </Typography>
            </Box>
            <Box>
                <Box className='flex gap-3 mb-4'>
                    <Button variant='contained' >Pinjam</Button>
                    <Button variant='contained'>Bookmark</Button>
                </Box>
                <Box>
                  <Typography>
                    {props.buku && props.buku.sinopsis}
                  </Typography>
                </Box>
            </Box>
          </Box>
    </>
  )
}

export default DescriptionDetailBukuComponent