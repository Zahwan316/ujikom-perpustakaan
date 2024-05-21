import { Helmet } from "react-helmet"
import IndexViewPage from "src/sections/index/view"
import React from "react"

const IndexUserPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Home</title>
      </Helmet>

      <IndexViewPage />
    </>
  )
}

export default IndexUserPage