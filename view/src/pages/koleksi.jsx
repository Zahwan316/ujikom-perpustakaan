import { Helmet } from "react-helmet"
import KoleksiViewPage from "src/sections/koleksi/view/koleksi"

const KoleksiPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Koleksi</title>
      </Helmet>

      <KoleksiViewPage />
    </>
  )
}

export default KoleksiPage