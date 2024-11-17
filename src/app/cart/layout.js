import SearchBar from "@/navBars/SearchBar";
import NavBottom from "@/app/components/NavBottom";

export default function ProductsLayout({ children }) {
    return (<>
        <SearchBar />
        {children}
        <NavBottom />
    </>)
}