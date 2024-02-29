import IndexUserLayout from "src/layouts/dashboard/indexuser"
import DetailBukuView from "src/sections/detailbuku/view/detailbuku"

const BukuIndexViewPage = () => {
  return(
    <>
      <IndexUserLayout>
        <DetailBukuView />
      </IndexUserLayout>
    </>
  )
}

export default BukuIndexViewPage