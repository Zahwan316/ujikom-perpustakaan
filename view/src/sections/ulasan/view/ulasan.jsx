import { Button, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';

import React, { useState, useEffect } from 'react';

const UlasanViewPage = () => {
  return(
    <>
      <Container>
        <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
            <Typography variant="h4" className='w-1/2'>Ulasan</Typography>
            <Button variant='contained' typebtn="add">+ Tambah</Button>
        </Stack>
      </Container>
    </>
  )
}

export default UlasanViewPage