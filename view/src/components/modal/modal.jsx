import { Button, Modal, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';

const ModalComponent = (props) => {
  return(
    <>
      <Modal
         open={true}
         onClose={props.handlemodal}
         className='flex items-center justify-center'
      >
         <Box className='bg-white w-1/3 flex flex-col  justify-center h-auto rounded-md' p={4}>
            <form onSubmit={props.handlesubmit}>
              <Box className="mb-8">
                <Box>
                  <Typography variant="h5" component="h2" mb={2}>
                      {props.title}
                  </Typography>   
                </Box>
                <Box>
                  {props.body}
                </Box>
              </Box>
              <Stack direction={"row"} justifyContent={"flex-end"} gap={"1em"}>
                <Button variant='contained' color="error" onClick={props.handlemodal}>Batal</Button>
                <Button variant='contained' color="success" type="submit">Simpan</Button>
              </Stack>
            </form>
        </Box>
      </Modal>
    </>
  )
}

export default ModalComponent