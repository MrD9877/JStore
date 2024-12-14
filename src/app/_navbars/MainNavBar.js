"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import OutSideAlart from "../_utility/OutSideAlart";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";

export default function MainNavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const count = useSelector((state) => state.count);
  const [searchVisible, setSearchVisible] = useState(false);
  const [heartColor, setHeartColor] = useState("white");
  const menuRef = useRef();
  const [categories, setCategories] = useState(null);
  const [UserAvatar, setUserAvatar] = useState(null);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`);
      const data = await res.json();
      setCategories(data);
    } catch {
      setCategories(null);
    }
  };
  const fetchUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, { credentials: "include" });
      const data = await res.json();
      const avatarId = data.avatarId;
      const avatar = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/avatar?avatarId=${avatarId}`, { credentials: "include" });
      const avatarData = await avatar.json();
      setUserAvatar(avatarData.url);
    } catch {
      setUserAvatar(null);
    }
  };

  useEffect(() => {
    if (UserAvatar) return;
    fetchCategories();
    fetchUser();
  }, []);
  const handleChange = (e) => {
    const type = e.target.value;
    if (type !== "null") {
      router.push(`/categories/${type}`);
    }
  };
  return (
    <div>
      <nav className="flex justify-between px-3 mt-2 sm:px-5 sm:py-4">
        <span className="font-amarante pt-1 text-lg sm:text-2xl">
          <Link href={"/"}>
            <h1>JAGRAON GARMENTS</h1>
          </Link>
        </span>
        {/* nav in mobile  */}
        <div className="flex items-center sm:hidden">
          <button onClick={() => setSearchVisible(true)} className="mr-3">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.1533 13.1255L17 17M15.2222 8.11111C15.2222 12.0385 12.0385 15.2222 8.11111 15.2222C4.18375 15.2222 1 12.0385 1 8.11111C1 4.18375 4.18375 1 8.11111 1C12.0385 1 15.2222 4.18375 15.2222 8.11111Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Link href={"/cart"}>
            <button className="mr-4 flex items-center h-7">
              <svg aria-hidden="true" className="" xmlns="http://www.w3.org/2000/svg" width="26" height="28" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
              </svg>
              <span className="absolute w-8 h-7 flex justify-end align-baseline text-xs">
                <span className="bg-red-500 w-4 h-4 rounded-full">{count}</span>
              </span>
            </button>
          </Link>
          <span>
            {menuVisible && <OutSideAlart inside={menuRef} setInside={setMenuVisible} />}
            <button className="mr-2 mt-1" onClick={() => setMenuVisible(true)}>
              <svg style={{ overflow: "visible" }} width="24" height="24" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5H19M1 9H19M1 16.5H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span ref={menuRef} style={{ display: menuVisible ? "flex" : "none" }} className="flex flex-col right-4 border-2 py-1 px-3 max-w-24 max-h-28 overflow-scroll border-black rounded-sm absolute justify-start items-baseline">
              <Link className="flex justify-center items-center" href={"/"}>
                Home
              </Link>
              <Link className="flex justify-center items-center" href={"/profile"}>
                Profile
              </Link>
              <Link className="flex justify-center items-center" href={"/login"}>
                Login
              </Link>
              <Link className="flex justify-center items-center" href={"/signup"}>
                Signin
              </Link>
            </span>
          </span>
        </div>
        <div className="hidden sm:block w-2/4">
          <SearchBar />
        </div>
      </nav>
      {/* nav in tablet and desktop  */}
      <nav className="hidden sm:flex bg-black text-white py-2 justify-between px-6">
        {/* select category design svg */}
        <div className="flex justify-center items-center">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H13M1 6H13M1 11H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* select category  */}
          <select onChange={handleChange} defaultValue="null" className="bg-black text-white text-sm" name="Categories">
            <option value="null">BROWSE CATEGORIES</option>
            {categories &&
              categories.map((item) => {
                return (
                  <option key={item.category} value={item.category}>
                    {item.category.toUpperCase()}
                  </option>
                );
              })}
          </select>
        </div>
        {/* login page btn  */}
        <div className="flex items-center gap-3">
          {UserAvatar ? (
            <></>
          ) : (
            <span className="text-sm">
              <Link href={"/login"}>LOGIN/REGISTER</Link>
            </span>
          )}
          <svg onClick={() => setHeartColor((pre) => (pre === "white" ? "red" : "white"))} width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.5 0.5C15.9813 0.5 14.6063 1.24343 13.6112 2.44555L12.2434 4.08974C12.109 4.25204 11.8917 4.25204 11.7573 4.08974C11.7573 4.08974 10.3923 2.44181 10.3895 2.44555C9.39369 1.24343 8.01869 0.5 6.5 0.5C3.46228 0.5 1 3.47332 1 7.14151C1 8.52709 1.352 9.81306 1.95322 10.8774C1.95322 10.8774 2.20553 11.3605 2.50391 11.7204C2.80228 12.0803 11.0279 22.0135 11.0279 22.0135C11.2963 22.3377 11.6483 22.5 12 22.5C12.3517 22.5 12.7037 22.3377 12.9721 22.0135C12.9721 22.0135 21.1981 12.0803 21.4961 11.7204C21.7941 11.3605 22.0468 10.8774 22.0468 10.8774C22.648 9.81306 23 8.52709 23 7.14151C23 3.47332 20.5377 0.5 17.5 0.5ZM21.1829 10.8678C21.1829 10.8678 20.9726 11.1791 20.5563 11.6818C20.14 12.1845 12.4861 21.4266 12.4861 21.4266C12.3517 21.5889 12.176 21.6698 12 21.6698C11.824 21.6698 11.6483 21.5889 11.5139 21.4266C11.5139 21.4266 3.86 12.1841 3.44372 11.6814C3.02744 11.1787 2.81706 10.8674 2.81706 10.8674C2.11547 9.8583 1.6875 8.56279 1.6875 7.14151C1.6875 3.932 3.84212 1.33019 6.5 1.33019C7.82894 1.33019 9.03206 1.98023 9.90278 3.03249L9.90588 3.02875L11.5139 4.97015C11.7824 5.29434 12.2176 5.29434 12.4861 4.97015L14.0941 3.02875L14.0972 3.03249C14.9679 1.98023 16.1711 1.33019 17.5 1.33019C20.1579 1.33019 22.3125 3.932 22.3125 7.14151C22.3125 8.56279 21.8845 9.8583 21.1829 10.8678Z"
              fill="white"
              stroke={heartColor}
            />
          </svg>
          <span>
            {/* profile btn  */}
            <Link href={"/profile"}>
              {UserAvatar ? (
                <img className="w-8 h-8 rounded-full" src={UserAvatar} alt="user avatar" />
              ) : (
                <svg width="24" height="23" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              )}
            </Link>
          </span>
          {/* got o cart btn  */}
          <Link href={"/cart"}>
            <button className="mr-4 flex items-center h-7">
              <svg aria-hidden="true" className="" xmlns="http://www.w3.org/2000/svg" width="26" height="28" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
              </svg>
              <span className="absolute w-8 h-7 flex justify-end align-baseline text-xs">
                <span className="bg-red-500 w-4 h-4 rounded-full">{count}</span>
              </span>
            </button>
          </Link>
        </div>
      </nav>
      {/* search in mobile  */}
      <div className="px-2 mx-auto mt-0.5 py-2">{searchVisible && <SearchBar setSearchVisible={setSearchVisible} />}</div>
    </div>
  );
}
