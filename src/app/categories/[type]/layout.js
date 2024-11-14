import ItemsCard from "@/components/ItemsCard"
import NavBottom from "@/components/NavBottom"
import SearchBar from "@/navBars/SearchBar"

export default async function CategoriesLayout({ children, params }) {
    const id = await params
    const { type } = id
    const res = await fetch("https://api.escuelajs.co/api/v1/products")
    const products = await res.json()
    const product = products.filter((item) => item.category.name == type)
    // console.log(product[0].images)

    return (
        <>
            <SearchBar />
            {children}
            <div className="mb-20">
                <ItemsCard array={product} />
            </div>
            <NavBottom />
        </>
    )
}