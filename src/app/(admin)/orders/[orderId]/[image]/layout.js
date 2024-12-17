import Modal from "@/app/components/Modal";

export default async function ModalLayout({ children, params }) {
  const id = await params;
  const { image } = id;
  return (
    <>
      <div className="orint">
        {children}
        <div className="absolute top-0 left-0">
          <Modal image={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${image}`} />
        </div>
      </div>
    </>
  );
}
