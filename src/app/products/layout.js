import SearchBar from "@/navBars/SearchBar";


export default async function ProductsLayout({ children }) {
    return (<>
        <SearchBar />
        {children}
    </>)
}