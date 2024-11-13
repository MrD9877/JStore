import CategoriesCard from '@/components/CatogriesCard'
import ItemsCard from '@/components/ItemsCard'
import NavBottom from '@/components/NavBottom'
import SearchBar from '@/navBars/SearchBar'


export default async function MenuPage() {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories")
    const categories = await res.json()
    return (
        <div>
            <SearchBar />
            <CategoriesCard array={categories} reviewStars={null} />
            <NavBottom />
        </div>
    )
}
