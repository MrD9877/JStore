import AdminNavBottom from "@/navbars/AdminNavBottom";
import EditProductPage from "@/components/EditProductPage";

export default async function layout({ children, params }) {
  const id = await params;
  const { productId } = id;
  return (
    <div>
      {children}
      <EditProductPage productId={productId} />
      <AdminNavBottom />
    </div>
  );
}
