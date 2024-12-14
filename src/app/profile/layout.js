import MainNavBar from "../_navbars/MainNavBar";

export default async function ProductsLayout({ children }) {
  return (
    <>
      <MainNavBar />
      {children}
    </>
  );
}
