import { useEffect, useState } from "react";
import useToast from "./useToast";
import { ContextType } from "@/components/checkout/CheckOutCard";
type Total = {
  subTotal: number;
  shipping: number;
  discount: number;
  total: number;
};
export default function useTotal(context: ContextType | null) {
  const [total, setToatal] = useState({ subTotal: 0, shipping: 0, discount: 0, total: 0 });
  const toast = useToast();

  useEffect(() => {
    async function getTotal() {
      context?.setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orderTotoal`, {
          method: "POST",
          body: JSON.stringify({ type: context?.paymentType, promocode: context?.promocode }),
          credentials: "include",
        });
        if (!res.ok) {
          toast(res.statusText, false);
          return;
        }
        const data = await res.json();
        setToatal(data as Total);
      } catch (err) {
        console.log(err);
      } finally {
        context?.setLoading(false);
      }
    }
    getTotal();
  }, [context?.paymentType, context?.promocode]);
  return total;
}
