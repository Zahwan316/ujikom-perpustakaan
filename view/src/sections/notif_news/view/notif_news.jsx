import { Box, Container, Stack } from '@mui/system';
import React, {  useEffect } from 'react';
import { Typography } from '@mui/material';
import { fToNow } from 'src/utils/format-time';
import useItemStore from '../../../../state/item';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NotifNewsViewPage = () => {
  const [message,setmessage] = useItemStore((state) => [state.message,state.setmessage])

  useEffect(() => {
    const fetchdata = async() => {
      try{
        if(Object.keys(message).length === 0){
          const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}message`)
          setmessage(res.data.data)
        }
      } 
      catch(e){
        console.log(e)
      }
    }
    fetchdata()
  })

  return(
    <>
      <Container>
        <Stack>
          <Typography variant='h4' mb={2}>
            News Update
          </Typography>
        </Stack>
        <Box className='flex gap-6 flex-col'>
        {
          message.map((item,index) => 
            <Stack direction="row" alignItems="center" spacing={2}>
            <Box
                component="img"
                src={ item.title === "Mengembalikan Buku" ?
                `/assets/icons/return.svg`
                :
                `/assets/icons/borrow.svg`
              }
                sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
            />

            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                {item.title}
                </Link>

                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {item.text}
                </Typography>
            </Box>

            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                {fToNow(item.created_date)}
            </Typography>
            </Stack>

          )
        }
        </Box>
      </Container>
    </>
  )
}

export default NotifNewsViewPage