import { Helmet } from "react-helmet"
import NotifNewsViewPage from "src/sections/notif_news/view/notif_news"

const NotifNewsPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - News Update</title>
      </Helmet>
      <NotifNewsViewPage />
    </>
  )
}

export default NotifNewsPage