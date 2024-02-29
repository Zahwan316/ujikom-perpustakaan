import { Helmet } from "react-helmet"
import SelectedKategoriViewPage from "src/sections/selectedkategori/view/selectedkategori"

const SelectedKategori = () => {
  return(
    <>
      <Helmet>
        <title>Perpus | Kategori</title>
      </Helmet>

      <SelectedKategoriViewPage />
    </>
  )
}

export default SelectedKategori