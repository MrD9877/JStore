import MainNavBar from "../../navbars/MainNavBar";

export default function ProductsLayout({ children }) {
  return (
    <>
      <MainNavBar />
      {children}
    </>
  );
}
