import { Button, Fade, Modal, Typography } from '../../../node_modules/@mui/material';
import { Box, Stack } from '@mui/system';

const ModalComponent = (props) => {
  return(
    <>
      <Modal
         open={true}
         onClose={props.handlemodal}
         className='flex items-center justify-center'
         
      >
        <Fade in={true} >
         <Box className={`bg-white ${props.size === "xl" ? "w-2/4" : "w-1/3"} flex flex-col  justify-center h-auto rounded-md `} p={4}>
            <form onSubmit={props.handlesubmit}>
              <Box className="mb-8">
                <Box>
                  <Typography variant="h5" component="h2" mb={2}>
                      {props.title}
                  </Typography>   
                </Box>
                <Box >
                  {props.body}
                </Box>
              </Box>
              {
                props.type != "view" ?
                <Stack direction={"row"} justifyContent={"flex-end"} gap={"1em"}>
                  <Button variant='contained' color="error" onClick={props.handlemodal}>Batal</Button>
                  <Button variant='contained' color="success" type="submit">Simpan</Button>
                </Stack>
                :
                <Stack direction={"row"} justifyContent={"flex-end"} gap={"1em"}>
                  <Button variant='contained' color="primary" onClick={props.handlemodal}>Tutup</Button>
                
                </Stack>

              }
            </form>
         </Box>

        </Fade>
      </Modal>
    </>
  )
}

export default ModalComponent