import DeliveryInfoForm from "@/components/DeliveryInfoForm";

export default function page() {
  return (
    <div className="mt-5">
      <DeliveryInfoForm linkAfterDone={"/checkout/ordersummary"} />
    </div>
  );
}
