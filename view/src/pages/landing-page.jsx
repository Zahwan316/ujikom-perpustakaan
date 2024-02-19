import { Helmet } from "react-helmet"
import LandingPageView from "src/sections/landing_page/view/landing_page"

const LandingPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Get Started</title>
      </Helmet>
      <LandingPageView />
    </>
  )
}

export default LandingPage