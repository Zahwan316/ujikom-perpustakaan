import React, { useState, useEffect } from 'react';
import { InputLabel, TextField } from '../../../node_modules/@mui/material';
import { Box } from '@mui/system';
import RatingBox from './component/ratingbox';
import useFormStore from '../../../state/form';
import useUserStore from '../../../state/user';

const UlasanForm = (props) => {
  const ratingdata = [
    {
        value:1,
    },
    {
        value:2,
    },
    {
        value:3,
    },
    {
        value:4,
    },
    {
        value:5,
    },
    {
        value:6,
    },
    {
        value:7,
    },
    {
        value:8,
    },
    {
        value:9,
    },
    {
        value:10,
    },
  ]
  const user = useUserStore((state) => state.user)
  const [active,setactive] = useState(false)
  const [form,setform] = useFormStore((state) => [state.form,state.setform])
  
  const handleform = (e) => {
    const {name,value} = e.target
    setform(name,value)
    
  }

  useEffect(() => {
    console.log(form)
  })

  useEffect(() => {
    if(typeof props.id === 'number'){
      setform("userID",user.userID)  
      setform("bukuID",props.id)
    }
  },[])
  
  return(
    <>
      <Box className='flex flex-col mb-6'>
        <InputLabel className='mb-2'>Ulasan</InputLabel>
        <TextField
          name='ulasan'
          multiline
          size='small'
          rows={4}
          onChange={handleform}
        />
      </Box>
      <Box className='flex flex-col mb-6'>
        <InputLabel className='mb-2'>Rating</InputLabel>
        <Box className="flex flex-row flex-wrap gap-2">
          <RatingBox 
            btn={ratingdata}
            setform={setform}
          />
        </Box>
      </Box>
    </>
  )
}

export default UlasanForm