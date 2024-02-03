import { Helmet } from "react-helmet"
import RekomendasiViewPage from "src/sections/rekomendasi/view/rekomendasi"

const RekomendasiPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Rekomendasi</title>
      </Helmet>
      <RekomendasiViewPage />
    </>
  )
}

export default RekomendasiPage