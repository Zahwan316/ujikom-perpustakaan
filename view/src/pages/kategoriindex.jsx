import { Helmet } from "react-helmet"
import KategoriIndexViewPage from "src/sections/kategoriindex/view/kategori"

const KategoriIndexPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Kategori</title>
      </Helmet>

      <KategoriIndexViewPage />
    </>
  )
}

export default KategoriIndexPage