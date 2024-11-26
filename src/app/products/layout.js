import SearchBar from "@/app/_navbars/SearchBar";


export default async function ProductsLayout({ children }) {
    return (<>
        <SearchBar />
        {children}
    </>)
}