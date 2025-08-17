import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ContainerCard, Context, Header } from "./CheckOutCard";
import useRazorPay from "@/hooks/useRazorPay";
import useToast from "@/hooks/useToast";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/storeSlice";
import useRazorPayOrder from "@/hooks/useRazorPayOrder";

export default function TotalPayment() {
  const [total, setToatal] = useState({ subTotal: 0, shipping: 0, tax: 0, total: 0 });
  const context = use(Context);
  const toast = useToast();
  const router = useRouter();
  const { pay, success, order } = useRazorPay({ method: context?.paymentMethod });
  const dispatch = useDispatch();
  const { cancelOrder } = useRazorPayOrder();

  // useEffect(() => {
  //   async function getTotal() {
  //     context?.setLoading(true);
  //     try {
  //       const data = await getCartTotal();
  //       console.log({ data });
  //       if ("error" in data) console.log(data.error);
  //       else setToatal(data.success);
  //     } catch (err) {
  //       console.log(err);
  //       context?.setLoading(false);
  //     }
  //   }
  //   getTotal();
  // }, [context]);

  useEffect(() => {
    async function handleSuccess() {
      if (success) {
        try {
          context?.setLoading(true);
          dispatch(clearCart());
          if (order.current) {
            router.push(`/success?orderId=${order.current.id}`);
          } else {
            router.push("orders");
          }
        } catch {}
      }
    }
    handleSuccess();
  }, [success, router, context, order]);

  useEffect(() => {
    async function updatePaymentMethod() {
      if (!order.current || !context?.paymentMethod) return;
      try {
        const res = await cancelOrder(order.current.id);
        order.current = null;
      } catch {
        context.setPaymentMethod(undefined);
      }
    }
    updatePaymentMethod();
  }, [context?.paymentMethod, order, context]);

  function handlePay() {
    if (total.total) pay();
  }

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
            <span className="text-textLightGray text-start">₹ {total.shipping}</span>
          </div>
          <div className="grid grid-cols-[10fr_1fr] text-[12px] text-white">
            <span>Tax:</span>
            <span className="text-textLightGray text-start">₹ {total.tax}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 ">
        <div className="flex justify-between rounded-xl items-center bg-darkGray p-[10px] px-[20px]">
          <label htmlFor="pay" className="text-white text-[22px] font-[900]">
            ₹ {total.total}
          </label>
          <button name="pay" onClick={handlePay} className=" flex justify-center items-center w-[150px] h-[36px] bg-blue-700 hover:bg-blue-800 rounded-md text-white text-sm font-[600]">
            Checkout
          </button>
        </div>
      </div>
    </ContainerCard>
  );
}
