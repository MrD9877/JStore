import MainNavBar from "../../navbars/MainNavBar";

export default async function ProductsLayout({ children }) {
  return (
    <>
      <MainNavBar />
      {children}
    </>
  );
}
