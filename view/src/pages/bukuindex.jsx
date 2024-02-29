import { Helmet } from "react-helmet"
import BukuIndexViewPage from "src/sections/bukuindex/view/bukuindex"

const BukuIndexPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Buku</title>
      </Helmet>

      <BukuIndexViewPage />
    </>
  )
}

export default BukuIndexPage