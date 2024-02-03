import { Stack, Container, Box } from '@mui/system';
import { Typography,Button } from '@mui/material';

const UlasanDetailBukuComponent = (props) => {
  return(
    <>
    <Stack direction={"column"}>
        <Typography variant='h4' mb={2}>
            Ulasan
        </Typography>
          <Box className='flex flex-col gap-4'>
            {
              props.ulasan.length != 0 ?
                props.ulasan.map((item,index) => 
                    <Box className='bg-gray-300 p-4 rounded-lg'>
                    <Typography variant='h6'>
                        {
                            props.user.map(items => 
                            items.userID === item.userID &&
                            items.username
                            )
                        }
                    </Typography>
                    <Typography variant='caption' className='mb-8'>
                        {item.rating}
                    </Typography>
                    <Typography variant='body2'>
                        {item.ulasan}
                    </Typography>
                    </Box>
                )
                :
                <Typography variant='body2'>
                    Belum ada ulasan
                </Typography>
            }
          </Box>
        </Stack>
    </>
  )
}

export default UlasanDetailBukuComponent;