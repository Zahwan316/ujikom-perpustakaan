import { Helmet } from "react-helmet"
import PeminjamanViewPage from "src/sections/peminjaman/view/peminjaman"

const PeminjamanPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Peminjaman</title>
      </Helmet>
      <PeminjamanViewPage />
    </>
  )
}

export default PeminjamanPage