import { Box } from "@mui/system"
import FooterIndex from "src/sections/index/footer"
import NavBarIndexComponent from "src/sections/index/nav"
import React from "react"
const IndexUserLayout = (props) => {
  return(
    <>
      <NavBarIndexComponent />
      <Box className='px-48 py-8 mb-8 pt-28'>
        {
          props.children
        }
      </Box>
      <FooterIndex />
    </>
  )
}

export default IndexUserLayout