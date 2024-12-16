import MainNavBar from "../_navbars/MainNavBar";

export default function ProductsLayout({ children }) {
  return (
    <>
      <MainNavBar />
      {children}
    </>
  );
}
