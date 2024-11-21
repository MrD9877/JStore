import ProductInfo from "@/app/components/ProductInfo"
import ProductBottomNav from "@/app/components/ProductBottomNav"
import GetImages from "@/app/_utility/GetImages"
import NavBottom from "@/app/components/NavBottom"

export default async function Layout({ children, params }) {
  const id = await params
  const { productId } = id
  const res = await fetch(`${process.env.SERVER_URL}/product?productId=${productId}`)
  const product = res.status === 200 ? await res.json() : {}

  return (
    <>
      <ProductInfo product={product} />
      {children}
      <NavBottom />
    </>
  )
}