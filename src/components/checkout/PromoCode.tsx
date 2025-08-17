import { useState } from "react";
import { ContainerCard, Header } from "./CheckOutCard";

export default function Promocode() {
  const [promocodeError, setPromocodeError] = useState<string>();

  function handleAction() {
    setPromocodeError("Invalid Code!!");
  }

  return (
    <ContainerCard errorText={promocodeError}>
      <Header>HAVE A PROMO CODE?</Header>
      <form className="form grid gap-[10px] grid-cols-[1fr_80px] p-0" action={handleAction}>
        <input className="input_field h-[36px] pl-[12px] bg-inputDarkGray rounded-md outline-none text-white" placeholder="Enter a Promo Code" type="text" />
        <button className="bg-blue-700 hover:bg-blue-800 rounded-md font-[600] text-[12px] text-white">Apply</button>
      </form>
    </ContainerCard>
  );
}
