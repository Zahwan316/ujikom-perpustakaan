import { Helmet } from "react-helmet"
import KategoriViewPage from "src/sections/kategori/view/kategori"


const KategoriPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Kategori</title>
      </Helmet>

      <KategoriViewPage />
    </>
  )
}

export default KategoriPage