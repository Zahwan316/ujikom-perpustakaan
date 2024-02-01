import { Helmet } from "react-helmet"
import HomePageView from "src/sections/home/view/home"

const HomePage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Home</title>
      </Helmet>

      <HomePageView />
    </>
  )
}

export default HomePage