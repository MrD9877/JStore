import AdminNavBottom from "@/app/_navbars/AdminNavBottom"
import EditProductsBtn from "@/app/_utility/EditProductsBtn"
import EditProductPage from "@/app/components/EditProductPage"

export default async function layout({ children, params }) {
    const id = await params
    const { productId } = id
    return (
        <div>
            {children}
            <EditProductPage productId={productId} />
            <AdminNavBottom />
        </div>
    )
}
