import { Helmet } from "react-helmet"
import LaporanViewPage from "src/sections/laporan/view/laporan"

const LaporanPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Laporan</title>
      </Helmet>
      <LaporanViewPage />
    </>
  )
} 

export default LaporanPage