import AdminNavBottom from "@/app/_navbars/AdminNavBottom"
import Modal from "@/app/components/Modal"
import OrderItemCard from "@/app/components/OrderItemCard"

export default async function ModalLayout({ children, params }) {
  const id = await params
  const { productId } = id
  let product = []
  try {

    const res = await fetch(`${process.env.SERVER_URL}/product?productId=${productId}`)
    product = await res.json()
  } catch {
    console.log("error")
  }
  const image = product.images ? product.images[0] : ""
  return (
    <>
      <div className="orint">
        {children}
        <div className="absolute top-0 left-0">
          <Modal image={image} />
        </div>
      </div>
    </>
  )
}