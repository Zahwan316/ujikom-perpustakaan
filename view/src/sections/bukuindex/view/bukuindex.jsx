import { Box } from "@mui/system"
import IndexUserLayout from "src/layouts/dashboard/indexuser"
import DetailBukuView from "src/sections/detailbuku/view/detailbuku"

const BukuIndexViewPage = () => {
  return(
    <>
      <IndexUserLayout>
        <Box className='min-h-96'>
          <DetailBukuView />
        </Box>
      </IndexUserLayout>
    </>
  )
}

export default BukuIndexViewPage