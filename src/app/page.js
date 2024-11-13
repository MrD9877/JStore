import NavBottom from "@/components/NavBottom";
import SearchBar from "@/navBars/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SearchBar />
      <Link href="/products/20">jeens</Link>
      <NavBottom />
    </>
  );
}
