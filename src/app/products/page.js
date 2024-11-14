import ItemsCard from "@/components/ItemsCard";
import NavBottom from "@/components/NavBottom";


export default async function ProductsLayout() {
    const res = await fetch("https://api.escuelajs.co/api/v1/products")
    const products = await res.json()
    return (<>
        <div className="mb-20">
            <ItemsCard array={products} />
        </div>
        <NavBottom />
    </>)
}