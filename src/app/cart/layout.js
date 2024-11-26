import SearchBar from "@/app/_navbars/SearchBar";
import NavBottom from "@/app/components/NavBottom";

export default function ProductsLayout({ children }) {
    return (<>
        <SearchBar />
        {children}
        <NavBottom />
    </>)
}