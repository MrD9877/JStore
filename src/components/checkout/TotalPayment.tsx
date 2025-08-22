import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { ContainerCard, Context, Header } from "./CheckOutCard";
import useRazorPay, { OrderSuccess } from "@/hooks/useRazorPay";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/storeSlice";
import useRazorPayOrder from "@/hooks/useRazorPayOrder";
import useTotal from "@/hooks/useTotal";

export default function TotalPayment() {
  const context = use(Context);
  const total = useTotal(context);
  const router = useRouter();
  const { pay, success, order, setSuccess } = useRazorPay();
  const dispatch = useDispatch();
  const { cancelOrder } = useRazorPayOrder();

  useEffect(() => {
    async function handleSuccess(orderSuccess: OrderSuccess) {
      if (!context) return;
      try {
        context.setLoading(true);
        dispatch(clearCart());
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/updateRazorPayOrder`, { method: "PATCH", body: JSON.stringify({ orderSuccess }) });

        if (order.current) {
          router.push(`/success?orderId=${order.current.id}`);
        } else {
          router.push("/orders");
        }
      } catch {
      } finally {
        setSuccess(undefined);
        context.setLoading(false);
      }
    }
    if (success) handleSuccess(success);
  }, [success, router, context, order]);

  useEffect(() => {
    async function updatePaymentMethod() {
      if (!order.current || !context?.paymentMethod || !context.paymentType) return;
      try {
        const res = await cancelOrder(order.current.id);
        order.current = null;
      } catch {
        context.setPaymentMethod(undefined);
      }
    }
    updatePaymentMethod();
  }, [context?.paymentMethod, order, context?.paymentType, context?.promocode]);

  return (
    <ContainerCard>
      <div className="text-white text-nowrap">
        <Header>PAYMENT</Header>
        <div className="grid gap-[5px] font-[600]">
          <div className="grid grid-cols-[10fr_1fr] text-[12px] text-white">
            <span>Subtotal:</span>
            <span className="text-textLightGray text-start">₹ {total.subTotal}</span>
          </div>
          <div className="grid grid-cols-[10fr_1fr] text-[13px] ">
            <span>Shipping:</span>
            <span className="text-textLightGray text-start">{total.shipping === 0 ? <span className="text-green-600/90">Free</span> : "₹ " + total.shipping}</span>
          </div>

          <div className="grid grid-cols-[10fr_1fr] text-[12px] text-white">
            <span>Discount:</span>
            <span className="text-green-600/90 text-start">- ₹ {total.discount}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 ">
        <div className="flex justify-between rounded-xl items-center bg-darkGray p-[10px] px-[20px]">
          <label htmlFor="pay" className="text-white text-[22px] font-[900]">
            ₹ {total.total}
          </label>
          <button disabled={context?.loading} name="pay" onClick={() => pay()} className=" flex justify-center items-center w-[150px] h-[36px] bg-blue-700 hover:bg-blue-800 rounded-md text-white text-sm font-[600]">
            Checkout
          </button>
        </div>
      </div>
    </ContainerCard>
  );
}
