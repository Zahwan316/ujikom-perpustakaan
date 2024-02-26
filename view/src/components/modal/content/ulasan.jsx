import { Box } from "@mui/system"
import { Typography,Button } from '@mui/material';
import Link from '@mui/material/Link';
import useItemStore from "../../../../state/item";
import React, { useState, useEffect } from 'react';
import SvgColor from "src/components/svg-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {v4 as uuidv4} from "uuid";
import axios from "axios";


const UlasanModalContent = (props) => {
  const buku = useItemStore((state) => state.buku)
  const [ulasan,setulasan] = useItemStore((state) => [state.ulasan,state.setulasan])
  const kategori = useItemStore((state) => state.kategori)
  const user = useItemStore((state) => state.user)

  const data = ulasan.filter(item => item.bukuID == props.id)
  const totalrating = data.reduce((total,item) => total + item.rating,0)
  const averagerating = totalrating / ulasan.length

  const [updater,setupdater] = useState()
  const [isload,setisload] = useState()

  const handleHapusUlasan = async(e) => {
    const id = e.target.getAttribute("id")
    props.setmodal(false)
    Swal.fire({
      title:"Hapus ulasan ini?",
      text:"Yakin ingin menghapus ulasan ini?",
      showCancelButton:true
    }).then(async(result) => {
      if(result.isConfirmed){
        let res = await axios.delete(`${import.meta.env.VITE_APP_URL_API}ulasanbuku/${id}`)
        setisload(true)
        setupdater(uuidv4())
        Swal.fire({
          title:"Ulasan berhasil dihapus",
          showConfirmButton:true,
          icon:"success",
        }).then(result => {
          if(result.isConfirmed){
            props.setmodal(true)
          }
        })
        setTimeout(() => {
          setisload(false)
        }, 500);
      }
    })
  }
  
  useEffect(() => {
    const refetchdata = async() => {
      try{
        let res_result = await axios.get(`${import.meta.env.VITE_APP_URL_API}ulasanbuku`)
        setulasan(res_result.data.data)
      }
      catch(e){
        console.log(e)
      }
    }
    refetchdata()
  },[updater])

  useEffect(() => {
    console.log(buku)
  })

  return(
    <>
      <Box>
       
          {
            buku.map(item => 
              item.bukuID == props.id &&
              <>
                <img src={`${import.meta.env.VITE_APP_URL_API}img/${item.img}`} className="w-full h-64 mb-4 object-cover" />
                <Box className='mb-6'>
                  <Typography variant="h5">
                    {item.judul}
                  </Typography>
                  <Box className='flex flex-row items-center mb-2'>
                    <Typography variant="subtitle2" >{averagerating}</Typography>
                    <svg className="w-3 text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="yellow" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                  </Box>
                  <Typography variant="h6">{item.penulis}</Typography>
                </Box>
              </>
            )
          }
       
        <Box >
            <Typography variant="h4" mb={1}>Semua Ulasan</Typography>
            <Box className="overflow-y-scroll h-44" >
                {
                  data.length != 0 ?
                  data.map(item => 
                    <Box className='mb-4 bg-gray-200 px-8 py-4 rounded-lg flex flex-row'>
                      <Box className='w-4/5'>
                        <Link color="inherit" variant="h6" underline="hover" noWrap>
                          {
                            user.map(items => 
                              items.userID === item.userID && items.username
                            )
                          }
                        </Link>
                        <Box className='flex flex-row items-center mb-2'>
                          <Typography variant='subtitle2' >{item.rating}</Typography>
                          <svg className="w-4 text-yellow-300 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="yellow" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                        </Box>
                  
                        <Typography variant="body1">{item.ulasan} </Typography>
                      </Box>
                      <Box className='flex items-center justify-center'>
                        <Button color="error" variant='contained' id={item.ulasanID} onClick={handleHapusUlasan}>Hapus</Button>
                      </Box>
                        
                    </Box>    
                  )
                  :
                  <Typography variant="body1">Belum ada ulasan</Typography>
                }
            </Box>
        </Box>
      </Box>
    </>
  )
}

export default UlasanModalContent