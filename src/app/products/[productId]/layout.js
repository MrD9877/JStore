import ProductInfo from "@/components/ProductInfo"
import ProductSlider from "@/components/ProductSilder"
import ProductBottomNav from "@/components/ProductBottomNav"

export default async function Layout({ children, params }) {
  const id = await params
  const { productId } = id
  const res = await fetch("https://api.escuelajs.co/api/v1/products")
  const products = await res.json()
  const product = products.filter((items) => items.id == productId)[0]

  return (
    <>
      <ProductSlider product={product} />
      <ProductInfo product={product} />
      {children}
      <ProductBottomNav product={product} />
    </>
  )
}