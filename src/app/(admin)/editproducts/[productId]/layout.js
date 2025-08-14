import AdminNavBottom from "@/app/_navbars/AdminNavBottom";
import EditProductPage from "@/app/components/EditProductPage";
import { useParams } from "next/navigation";

export default function layout({ children }) {
  const params = useParams();
  const productId = params?.productId;
  return (
    <div>
      {children}
      <EditProductPage productId={productId} />
      <AdminNavBottom />
    </div>
  );
}
