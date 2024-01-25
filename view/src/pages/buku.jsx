import { Helmet } from "react-helmet"
import BukuViewPage from "src/sections/buku/view/buku"

const BukuPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Buku</title>
      </Helmet>

      <BukuViewPage />
    </>
  )
}

export default BukuPage