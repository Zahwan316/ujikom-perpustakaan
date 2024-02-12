import { Helmet } from "react-helmet"
import SearchViewPage from "src/sections/search/view/search"

const SearchPage = () => {
  return(
    <>
      <Helmet>
        <title>Perpus - Pencarian</title>
      </Helmet>
      <SearchViewPage />
    </>
  )
}

export default SearchPage