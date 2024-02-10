import { Helmet } from "react-helmet"
import SettingViewPage from "src/sections/settings/view/settings"

const SettingPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Setting</title>
      </Helmet>
      <SettingViewPage />
    </>
  )
}

export default SettingPage