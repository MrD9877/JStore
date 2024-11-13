import SearchBar from "@/navBars/SearchBar";

export default function SearchLayout({ children }) {
    return (<>
        <SearchBar />
        {children}
    </>)
}