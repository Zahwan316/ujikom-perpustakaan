import { Helmet } from "react-helmet"
import SampahBukuViewPage from "src/sections/buku/sampahbuku"

const SampahBukuPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Sampah Buku</title>
      </Helmet>
      <SampahBukuViewPage />
    </>
  )
}

export default SampahBukuPage