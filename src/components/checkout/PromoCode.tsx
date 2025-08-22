"use client";
import { use, useEffect, useState } from "react";
import { ContainerCard, Context, Header } from "./CheckOutCard";
import { LoaderCircle } from "lucide-react";

export default function Promocode() {
  const context = use(Context);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const checkCode = async () => {
    if (!context) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/checkPromoCode`, {
        method: "POST",
        body: JSON.stringify({ promocode: code }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          setError(data.error);
        } else {
          setError(res.statusText);
        }
        return;
      }
      const data = await res.json();
      setSuccess(data);
      context.setPromocode(code);
    } catch (err) {
      setError("Connection Error try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerCard errorText={error} successText={success}>
      <Header>HAVE A PROMO CODE?</Header>
      <form className="form grid gap-[10px] grid-cols-[1fr_80px] p-0">
        <input className="input_field h-[36px] pl-[12px] bg-[#333333] rounded-md outline-none text-white" placeholder="Enter a Promo Code" type="text" value={code || ""} onChange={(e) => setCode(e.target.value.toUpperCase())} />
        <button type="button" onClick={checkCode} className="bg-blue-700 hover:bg-blue-800 rounded-md font-[600] text-[12px] text-white">
          {loading ? <LoaderCircle className="animate-spin mx-auto" /> : <span>Apply</span>}
        </button>
      </form>
    </ContainerCard>
  );
}
