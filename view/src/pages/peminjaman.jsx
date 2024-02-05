import { Helmet } from "react-helmet"
import PeminjamanViewPage from "src/sections/peminjaman/view/peminjaman"
import useUserStore from "../../state/user"
import PeminjamanUserViewPage from "src/sections/peminjaman_user/view/peminjaman_user"

const PeminjamanPage = () => {
  const user = useUserStore((state) => state.user)

  return(
    <>
      <Helmet>
        <title>Perpus - Peminjaman</title>
      </Helmet>

      {
        user.access_level === 1 || user.access_level === 2 ?
        <PeminjamanViewPage />
        :
        <PeminjamanUserViewPage />
      }
    </>
  )
}

export default PeminjamanPage