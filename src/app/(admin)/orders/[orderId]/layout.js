import AdminNavBottom from "@/navbars/AdminNavBottom";
import OrderItemCard from "@/components/OrderItemCard";

export default async function OrderIdLayout({ children, params }) {
  const id = await params;
  const { orderId } = id;

  return (
    <>
      <div className="orint">
        {children}
        <OrderItemCard orderId={orderId} />
        <div className="mt-20">
          <AdminNavBottom />
        </div>
      </div>
    </>
  );
}
