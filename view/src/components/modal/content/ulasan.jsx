import { Box } from "@mui/system"
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import useItemStore from "../../../../state/item";
import React, { useState, useEffect } from 'react';


const UlasanModalContent = (props) => {
  const buku = useItemStore((state) => state.buku)
  const ulasan = useItemStore((state) => state.ulasan)
  const kategori = useItemStore((state) => state.kategori)
  const user = useItemStore((state) => state.user)

  const data = ulasan.filter(item => item.bukuID == props.id)

  useEffect(() => {
    console.log(data)
  })

  return(
    <>
      <Box>
        <img src="./assets/images/gojek.png" className="w-full h-64 mb-4" />
        <Box className='mb-6'>
          {
            buku.filter(item => 
              item.bukuID == data.bukuID &&
              <>
                <Typography variant="h5">
                  {item.judul_buku}
                </Typography>
                <Typography variant="subtitle2">{data.rating}</Typography>
                <Typography variant="h6">{item.penulis}</Typography>
              </>
            )
          }
        </Box>
        <Box >
            <Typography variant="h4" mb={1}>Semua Ulasan</Typography>
            <Box className="overflow-y-scroll h-44" >
                {
                  data.map(item => 
                    <Box className='mb-4 bg-gray-200 p-4 rounded-lg'>
                        <Link color="inherit" variant="h6" underline="hover" noWrap>
                          {
                            user.map(items => 
                              items.userID === item.userID && items.username
                            )
                          }
                        </Link>
                        <Typography variant='body2'>{item.rating}</Typography>
                        <Typography variant="body1">{item.ulasan} </Typography>
                    </Box>    
                  )
                }
            </Box>
        </Box>
      </Box>
    </>
  )
}

export default UlasanModalContent