import ItemsCard from "@/app/components/ItemsCard"
import NavBottom from "@/app/components/NavBottom"
import SearchBar from "@/app/_navbars/SearchBar"

export default async function CategoriesLayout({ children, params }) {
    const id = await params
    const { type } = id
    const res = await fetch(`${process.env.SERVER_URL}/category?category=${type}`)
    const product = await res.json()
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