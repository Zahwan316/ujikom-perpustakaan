import { Helmet } from "react-helmet"
import DetailBukuView from "src/sections/detailbuku/view/detailbuku"

const DetailBukuPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Detail Buku</title>
      </Helmet>
      <DetailBukuView />
    </>
  )
}

export default DetailBukuPage