import ProductInfo from "@/app/components/ProductInfo"
import ProductSlider from "@/app/components/ProductSilder"
import ProductBottomNav from "@/app/components/ProductBottomNav"

export default async function Layout({ children, params }) {
  const id = await params
  const { productId } = id
  const res = await fetch(`${process.env.SERVER_URL}/product?productId=${productId}`)
  const product = await res.json()

  return (
    <>
      <ProductSlider product={product} />
      <ProductInfo product={product} />
      {children}
      <ProductBottomNav product={product} />
    </>
  )
}