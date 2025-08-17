import { useRouter } from "next/navigation";
import { ContainerCard, Header, Para } from "./CheckOutCard";
import { MoveLeft } from "lucide-react";

export function CheckoutNav() {
  const router = useRouter();

  return (
    <label className="text-sm  h-[40px] text-white border-b-[1px] border-b-darkwhite md:border-b-0  grid grid-cols-3">
      <button onClick={() => router.back()} className="center-start px-3">
        <MoveLeft size={28} />
      </button>
      <span className="center">CHECKOUT</span>
    </label>
  );
}

export default function ShippingAddress() {
  return (
    <ContainerCard>
      {/* shipping address  */}
      <div className="md:hidden">
        <CheckoutNav />
      </div>
      <div className="mt-4 md:mt-0">
        <Header>SHIPPING</Header>
        <Para>221B Baker Street, W1U 8ED</Para>
        <Para>London, United Kingdom</Para>
      </div>
    </ContainerCard>
  );
}
