import CategoriesCard from '@/app/components/CatogriesCard'
import NavBottom from '@/app/components/NavBottom'
import SearchBar from '@/app/_navbars/SearchBar'


export default async function MenuPage() {
    const res = await fetch(`${process.env.SERVER_URL}/category`)
    const categories = await res.json()
    return (
        <div>
            <SearchBar />
            <CategoriesCard array={categories} reviewStars={null} />
            <NavBottom />
        </div>
    )
}
