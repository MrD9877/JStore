import ItemsCard from "@/app/components/ItemsCard";
import NavBottom from "@/app/components/NavBottom";


export default async function ProductsLayout() {
    const res = await fetch(`${process.env.SERVER_URL}/product`, { next: { revalidate: 0 } })
    const products = await res.json()
    return (<>
        <div className="mb-20">
            <ItemsCard array={products} />
        </div>
        <NavBottom />
    </>)
}