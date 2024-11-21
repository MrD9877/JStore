import AdminNavBottom from "@/app/_navbars/AdminNavBottom"
import OrderItemCard from "@/app/components/OrderItemCard"

export default async function OrderIdLayout({ children, params }) {
  const id = await params
  const { orderId } = id

  return (
    <>
      <div className="orint">
        {children}
        <OrderItemCard orderId={orderId} />
        <AdminNavBottom />
      </div>
    </>
  )
}