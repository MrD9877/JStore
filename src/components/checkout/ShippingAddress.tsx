import { useRouter } from "next/navigation";
import { ContainerCard, Context, Header, Para } from "./CheckOutCard";
import { MapPinPlusInside, MoveLeft } from "lucide-react";
import { use, useState } from "react";
import Link from "next/link";

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
  const context = use(Context);
  const [changeAddress, setChangeAddress] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    context?.setAddress(context.user?.deliveryaddress[Number(e.target.value)]);
    setChangeAddress(false);
  };
  return (
    <ContainerCard>
      {/* shipping address  */}
      <div className="md:hidden">
        <CheckoutNav />
      </div>
      <div className="mt-4 md:mt-0 min-h-34">
        <Header>SHIPPING</Header>
        {changeAddress ? (
          <form>
            {context?.user?.deliveryaddress.map((item, index) => {
              return (
                <div key={index} className="flex items-center mb-4">
                  <input id={`${index}`} type="radio" value={index} name="address" className="w-4 h-4 text-blue-600 bg-white-100 border-gray-300" onChange={handleChange} />
                  <label htmlFor={`${index}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {item.nickname}
                    <span className="text-white/30 mx-2">
                      ({item.addressLine1},{item.city},{item.state})
                    </span>
                  </label>
                </div>
              );
            })}
            <Link href={"/addNewAddress"}>
              <button type="button" className="flex items-center mt-3 bg-blue-600 hover:bg-blue-700 text-gray-100 px-2 py-1 rounded text-sm  transition duration-100">
                <MapPinPlusInside className="-ms-0.5 me-1.5 h-4 w-4" width={20} />
                <span className="text-[11px]">New Dilvery Address</span>
              </button>
            </Link>
          </form>
        ) : (
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[#00ADB5] text-xl mb-4">{context?.address?.nickname}</span>
              <Para className="text-sm">
                <span className="text-[#00ADB5]">AddressLine:</span>
                {context?.address?.addressLine1},{context?.address?.addressLine2},
              </Para>
              <Para>
                <span className="text-[#00ADB5]">City:</span>
                {context?.address?.city},
              </Para>
              <Para>
                <span className="text-[#00ADB5]">State:</span>
                {context?.address?.state}
              </Para>
            </div>
            <button className="cursor-pointer text-blue-700 ml-8" onClick={() => setChangeAddress(true)}>
              Change
            </button>
          </div>
        )}
      </div>
    </ContainerCard>
  );
}
