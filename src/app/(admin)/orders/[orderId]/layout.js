import OrderItemCard from "@/app/components/OrderItemCard"

export default async function OrderIdLayout({ children, params }) {
  const id = await params
  const { orderId } = id

  return (
    <>
      {children}
      <OrderItemCard orderId={orderId} />
    </>
  )
}