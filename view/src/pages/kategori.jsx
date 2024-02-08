import { Helmet } from "react-helmet"
import KategoriViewPage from "src/sections/kategori/view/kategori"
import useUserStore from "../../state/user"
import KategoriUserViewPage from "src/sections/kategori_user/view/kategori_user"


const KategoriPage = () => {
  const user = useUserStore((state) => state.user)

  return(
    <>
      <Helmet>
        <title>Perpus - Kategori</title>
      </Helmet>

      {
        user.access_level === 1 || user.access_level === 2 ?
        <KategoriViewPage />
        :
        <KategoriUserViewPage />
      }
    </>
  )
}

export default KategoriPage