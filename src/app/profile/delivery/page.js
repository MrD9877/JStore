import DeliveryInfoForm from "@/components/DeliveryInfoForm";

export default function page() {
  return (
    <div>
      <DeliveryInfoForm linkAfterDone={"/profile"} />
    </div>
  );
}
