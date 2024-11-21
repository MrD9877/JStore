import SearchBar from "@/navBars/SearchBar";
import NavBottom from "@/app/components/NavBottom";

export default async function ProductsLayout({ children }) {
    return (<>
        <SearchBar />
        {children}
        <NavBottom />
    </>)
}