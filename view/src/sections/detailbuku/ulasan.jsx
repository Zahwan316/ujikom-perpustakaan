import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import useUserStore from '../../../state/user';

const UlasanDetailBukuComponent = (props) => {
  const convertedDate = (item) => {
    const dateObject = new Date(item)
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1
    const date = dateObject.getDate();
    return `${year}-${month}-${date}`
  }

  const user = useUserStore((state) => state.user)

  return(
    <>
    <Stack direction={"column"}>
        <Typography variant='h4' mb={2}>
            Ulasan
        </Typography>
          <Box className='flex flex-col gap-4 '>
            {
              props.ulasan.length != 0 ?
                props.ulasan.map((item,index) => 
                    <Box className=' p-4 rounded-lg  flex flex-row gap-4'>
                      <Box>
                        {
                          props.user.map((items) => 
                            items.userID === item.userID &&
                            <Box component={"img"} src={`${items.img ? `${import.meta.env.VITE_APP_URL_API}img/${items.img}` : "/assets/images/noprofile.png"}`} className='w-12 h-12 rounded-lg' />

                          )
                        }
                      </Box>
                      <Box className='flex flex-col w-full'>
                        <Box className='flex flex-row items-center gap-2 justify-between'>
                          <Typography variant='h5'>
                              {
                                  props.user.map(items => 
                                  items.userID === item.userID &&
                                  items.username
                                  )
                              }
                          </Typography>
                          <Typography variant='subtitle2' className='text-gray-400'>{convertedDate(item.created_date)}</Typography>
                        </Box>
                        <Box className="flex flex-row mb-2">
                          <Typography variant='caption' className='mb-8'>
                              {item.rating} 
                          </Typography>
                              <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill='yellow' d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                        </Box>
                        <Typography variant='body2'>
                            {item.ulasan}
                        </Typography>
                      </Box>
                    
                    
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