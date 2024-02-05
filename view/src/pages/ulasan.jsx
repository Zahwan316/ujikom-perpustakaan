import { Helmet } from "react-helmet"
import UlasanViewPage from "src/sections/ulasan/view/ulasan"
import useUserStore from "../../state/user"
import UlasanUserViewPage from "src/sections/ulasanuser/view/ulasanuser"

const UlasanPage = () => {
  const user = useUserStore((state) => state.user)

  return(
    <>
      <Helmet>
        <title>Perpus - Ulasan</title>
      </Helmet>

      {
        user.access_level === 1 || user.acess_level === 2 ?
        <UlasanViewPage />
        :
        <UlasanUserViewPage />
      }
    </>
  )
}

export default UlasanPage