import { Box } from "@mui/system"
import React, { useState, useEffect } from 'react';
import { Button } from '../../../../node_modules/@mui/material';

const RatingBox = (props) => {
  const [value,setvalue] = useState(0)
  const clickButtonRating = (index) => {
    setvalue(index)
    props.setform("rating",index + 1)
  }

  const box = (value,index) => {
    return(
      <Box 
      className={`border  ${value === index ? ' bg-sky-500 text-white' : "border-gray-400" } w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer`} 
      onClick={() => {clickButtonRating(index)}} 
      key={index}
      >
        {item.value}
    </Box>   
    )
  }



  return(
    <>
    {
        props.btn.map((item,index) => 
          <Button
            variant={value === index ? "contained" : "outlined" }
            onClick={() => {clickButtonRating(index)}}
            value={item.value}
          >
            {item.value}
          </Button>
        )
    }
    </>
  )
}

export default RatingBox