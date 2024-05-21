import React, { useState} from 'react';
import { Button } from '../../../node_modules/@mui/material';


const BtnGroup = (props) => {
  const [activedbtn,setactivedbtn] = useState(0);

  const handleValue = (index) => {
    setactivedbtn(index)
  }

  const handlekategori = (e) => {
    const value = e.target.getAttribute('value')
    props.handlecategory(value)
  }

  const buttongrp = props.buttongroup

  return (
    <>
      <Button
        value={0}
        variant={activedbtn === 0? "contained" : "outlined"}
        sx={{marginRight:"8px"}}
        onClick={(e) => {handleValue(0),handlekategori(e)}}
      >
        Semua
      </Button>
      {
        buttongrp.map((btn,index) => (
          <Button
            key={btn.value}
            value={btn.value}
            variant={activedbtn === index + 1 ? "contained" : "outlined"}
            sx={{marginRight:"8px"}}
            onClick={(e) => {handleValue(index + 1),handlekategori(e)}}
          >
              {btn.label}
          </Button>
        ))
      }
    </>
  )
}

export default BtnGroup