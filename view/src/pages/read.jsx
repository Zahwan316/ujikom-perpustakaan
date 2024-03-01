import { Helmet } from "react-helmet"
import ReadViewPage from "src/sections/read/view/read"

const ReadPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus | Read</title>
      </Helmet>

      <ReadViewPage />
    </>
  )
}

export default ReadPage