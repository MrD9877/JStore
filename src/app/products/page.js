import ItemsCard from "@/components/ItemsCard";


export default async function ProductsLayout() {
    const res = await fetch("https://api.escuelajs.co/api/v1/products")
    const products = await res.json()
    return (<>
        <ItemsCard array={products} />
    </>)
}