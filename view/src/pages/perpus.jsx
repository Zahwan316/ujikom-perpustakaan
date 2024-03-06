import { Helmet } from "react-helmet"
import PerpusViewPage from "src/sections/perpus/view/perpus"

const PerpusPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Perpus Data</title>
      </Helmet>

      <PerpusViewPage />
    </>
  )
}

export default PerpusPage