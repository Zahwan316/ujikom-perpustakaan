import { Helmet } from "react-helmet"
import AnggotaViewPage from "src/sections/anggota/view/anggota-view"

const AnggotaPage = () => {
  return(
    <>
     <Helmet>
       <title>Perpus | Anggota</title>
     </Helmet>

     <AnggotaViewPage />
    </>
  )
}

export default AnggotaPage