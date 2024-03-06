import { InputLabel, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import useFormStore from "../../../state/form"

const PerpusFormComponent = () => {
  const [form,setform] = useFormStore((state) => [state.form,state.setform])

  const handleForm = (e) => {
    const {name,value} = e.target
    setform(name,value)
  }

  useEffect(() => {
    console.log(form)
  })

  return(
    <>
      <Box className='flex flex-col mb-6'>
        <InputLabel className="mb-2">Nama Perpustakaan</InputLabel>
        <TextField 
          size='small'
          name='nama_perpus'
          onChange={handleForm}
          value={form.nama_perpus}
        />
      </Box>
      <Box className='flex flex-col mb-6'>
        <InputLabel className="mb-2">Alamat</InputLabel>
        <TextField 
          size='small'
          name='alamat'
          multiline
          onChange={handleForm}
          rows={4}
          value={form.alamat}
        />
      </Box>
      <Box className='flex flex-col mb-6'>
        <InputLabel className="mb-2">Nomor Telepon</InputLabel>
        <TextField 
          size='small'
          name='no_hp'
          type='number'
          value={form.no_hp}
          onChange={handleForm}
        />
      </Box>
    </>
  )
}

export default PerpusFormComponent