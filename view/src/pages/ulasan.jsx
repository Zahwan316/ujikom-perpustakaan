import { Helmet } from "react-helmet"
import UlasanViewPage from "src/sections/ulasan/view/ulasan"

const UlasanPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Ulasan</title>
      </Helmet>
      <UlasanViewPage />
    </>
  )
}

export default UlasanPage