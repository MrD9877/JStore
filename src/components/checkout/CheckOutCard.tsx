"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import "./checkout.css";
import SelectPaymentMethod from "./SelectPaymentMethod";
import ShippingAddress, { CheckoutNav } from "./ShippingAddress";
import TotalPayment from "./TotalPayment";
import Promocode from "./PromoCode";
import Cart from "./Cart";
import useFetchUser from "@/hooks/useFetchUser";
import SelectPaymentType from "./SelectPaymentType";
import { DeliveryAddress, UserType } from "@/@types/user";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

export type ContextType = {
  paymentMethod: "card" | "upi" | undefined;
  setPaymentMethod: React.Dispatch<React.SetStateAction<"card" | "upi" | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | undefined;
  address: DeliveryAddress | undefined;
  setAddress: Dispatch<SetStateAction<DeliveryAddress | undefined>>;
  paymentType: "cod" | "prepaid" | undefined;
  setPaymentType: Dispatch<SetStateAction<"cod" | "prepaid" | undefined>>;
  promocode: string | undefined;
  setPromocode: Dispatch<SetStateAction<string | undefined>>;
};

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Context = createContext<ContextType | null>(null);

export function Para({ className = "", children }: { className?: string; children: ReactNode }) {
  return <p className={`text-textLightGray font-[600] text-[11px] sm:text-[15px] ${className}`}>{children}</p>;
}

export function Header({ children }: { children: ReactNode }) {
  return <span className="text-white font-[600] text-[15px] mb-[9px] block sm:text-[22px]">{children}</span>;
}
export function ContainerCard({ children, errorText, successText }: { children: ReactNode; errorText?: string; successText?: string }) {
  return (
    <div className="w-full px-2">
      <div className="bg-[#1c1c1c] w-full rounded-xl h-fit py-5 px-4">
        <div>{children}</div>
        {errorText && <div className="text-red-400/90 mt-2 text-sm  h-5 transition-all duration-300 ">{errorText}</div>}
        {successText && <div className="text-green-400/90 mt-2 text-sm  h-5 transition-all duration-300 ">{successText}</div>}
      </div>
    </div>
  );
}

const Div: React.FC<DivProps> = ({ className = "", children, ...rest }) => {
  return (
    <div className={`flex flex-col gap-8 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default function CheckOutCard() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">();
  const [paymentType, setPaymentType] = useState<"cod" | "prepaid">();
  const { user } = useFetchUser();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<DeliveryAddress | undefined>();
  const [promocode, setPromocode] = useState<string>();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      if (!user.deliveryaddress || user.deliveryaddress.length === 0) {
        toast("Please add a deliver address to continue");
        return router.push("/addNewAddress");
      }
      setAddress(user.deliveryaddress[0]);
    }
  }, [user]);

  return (
    <>
      <Context.Provider
        value={{
          paymentMethod,
          setPaymentMethod,
          loading,
          setLoading,
          user,
          address,
          setAddress,
          paymentType,
          setPaymentType,
          promocode,
          setPromocode,
        }}
      >
        <div className="bg-[#121212]/82 h-full min-h-screen w-full text-white">
          <div className="hidden md:block pt-4">
            <ContainerCard>
              <CheckoutNav />
            </ContainerCard>
          </div>
          <Div className=" w-full md:grid md:grid-cols-2   flex flex-col gap-8 py-4 h-full  ">
            <Div>
              <ShippingAddress />
              <SelectPaymentMethod />
              <SelectPaymentType />
            </Div>
            <Div>
              <Promocode />
              <Cart />
              <TotalPayment />
            </Div>
          </Div>
        </div>
      </Context.Provider>
    </>
  );
}
