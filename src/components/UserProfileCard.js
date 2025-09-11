import Link from "next/link";
import React, { useState } from "react";
import DisplayOrdersCard from "./DisplayOrdersCard";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/utility/LogoutFn";
import useAvatar from "@/hooks/useAvatar";
import { LoaderCircle, MapPinPlusInside } from "lucide-react";
import useEditProfile from "@/hooks/useEditProfile";
import SelectState from "./SelectState";

export default function UserProfileCard({ user, setUser }) {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const { handleSubmit, editLoading, editProfile, setEditProfile } = useEditProfile(setUser);
  const router = useRouter();
  useAvatar({ user, setAvatarSrc });
  const handleAdminSignIn = async () => {
    router.push("/adminsignin");
  };
  return (
    <div className="h-full bg-gray-200 rounded-lg  sm:p-8">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div x-data="{ openSettings: false }" className="absolute right-12 mt-4 rounded"></div>
        <div className="w-full h-[250px]">
          <img
            onDoubleClick={handleAdminSignIn}
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          <img
            // src = {user.avatar}
            src="/images/avatar4.png"
            className="w-40 border-4 border-white rounded-full"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{user.email}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-2 sm:px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            {user.admin && (
              <Link href={"/orders"}>
                <div className="w-full mx-auto my-3">
                  <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                    <svg
                      className="-ms-0.5 me-1.5 h-6 w-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 2.00001L11.75 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M21.9998 6.49999L21.9998 1.99999L17.0568 1.99999"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="test-sm">Admin Page</span>
                  </button>
                </div>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 hover:bg-red-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
            >
              <svg className="-ms-0.5 me-1.5 h-6 w-6" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.75 9.874C11.75 10.2882 12.0858 10.624 12.5 10.624C12.9142 10.624 13.25 10.2882 13.25 9.874H11.75ZM13.25 4C13.25 3.58579 12.9142 3.25 12.5 3.25C12.0858 3.25 11.75 3.58579 11.75 4H13.25ZM9.81082 6.66156C10.1878 6.48991 10.3542 6.04515 10.1826 5.66818C10.0109 5.29121 9.56615 5.12478 9.18918 5.29644L9.81082 6.66156ZM5.5 12.16L4.7499 12.1561L4.75005 12.1687L5.5 12.16ZM12.5 19L12.5086 18.25C12.5029 18.25 12.4971 18.25 12.4914 18.25L12.5 19ZM19.5 12.16L20.2501 12.1687L20.25 12.1561L19.5 12.16ZM15.8108 5.29644C15.4338 5.12478 14.9891 5.29121 14.8174 5.66818C14.6458 6.04515 14.8122 6.48991 15.1892 6.66156L15.8108 5.29644ZM13.25 9.874V4H11.75V9.874H13.25ZM9.18918 5.29644C6.49843 6.52171 4.7655 9.19951 4.75001 12.1561L6.24999 12.1639C6.26242 9.79237 7.65246 7.6444 9.81082 6.66156L9.18918 5.29644ZM4.75005 12.1687C4.79935 16.4046 8.27278 19.7986 12.5086 19.75L12.4914 18.25C9.08384 18.2892 6.28961 15.5588 6.24995 12.1513L4.75005 12.1687ZM12.4914 19.75C16.7272 19.7986 20.2007 16.4046 20.2499 12.1687L18.7501 12.1513C18.7104 15.5588 15.9162 18.2892 12.5086 18.25L12.4914 19.75ZM20.25 12.1561C20.2345 9.19951 18.5016 6.52171 15.8108 5.29644L15.1892 6.66156C17.3475 7.6444 18.7376 9.79237 18.75 12.1639L20.25 12.1561Z"
                  fill="#FFFFFF"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="my-4  flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col ">
          <form className="flex-1 bg-white rounded-lg shadow-xl p-3 sm:p-8" action={handleSubmit}>
            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul className="w-full mt-2 text-gray-700">
              <label className="flex border-y py-2" htmlFor="name">
                <span className="font-bold w-24 ">Full name:</span>
                {editProfile ? (
                  <input type="text" name="name" defaultValue={user.name || ""} className="max-w-36 px-4 outline-none border border-black" />
                ) : (
                  <span className="text-gray-700 ml-2 sm:ml-0 overflow-scroll">{user.name}</span>
                )}
              </label>
              <label className="flex border-b py-2" htmlFor="phonenumber">
                <span className="font-bold w-24">Mobile:</span>
                {editProfile ? (
                  <input
                    type="text"
                    name="phonenumber"
                    pattern="[0-9]{10}"
                    defaultValue={Number(user.phonenumber || "")}
                    maxLength={10}
                    minLength={10}
                    className="max-w-36 px-4 outline-none border border-black"
                  />
                ) : (
                  <span className="text-gray-700">{user.phonenumber}</span>
                )}
              </label>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="text-gray-700 ml-2 sm:ml-0 overflow-scroll">{user.email ? user.email : "Not provided"}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Country:</span>
                <span className="text-gray-700"> INDIA</span>
              </li>
              <label className="flex border-b py-2" htmlFor="state">
                <span className="font-bold w-24">State:</span>
                {editProfile ? (
                  <>
                    <SelectState />
                  </>
                ) : (
                  <span className="text-gray-700"> {user.state || "-"}</span>
                )}
              </label>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Languages:</span>
                <span className="text-gray-700">English</span>
              </li>
              <div className="flex gap-4">
                {editProfile ? (
                  <>
                    <button
                      disabled={editLoading}
                      style={{ opacity: editLoading ? 0.8 : 1 }}
                      onClick={() => setEditProfile(false)}
                      className="flex items-center mt-3 bg-red-600 hover:bg-red-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                    >
                      <span>Cancel</span>
                    </button>
                    <button
                      disabled={editLoading}
                      type="submit"
                      className="flex items-center mt-3 bg-green-600 hover:bg-green-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                    >
                      {editLoading ? (
                        <span>
                          <LoaderCircle className="animate-spin" />
                        </span>
                      ) : (
                        <span>Save</span>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditProfile(true)}
                    className="flex items-center mt-3 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                  >
                    <svg
                      className="-ms-0.5 me-1.5 h-6 w-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                      ></path>
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                )}
                {!editProfile && (
                  <Link href={"/addNewAddress"}>
                    <button className="flex items-center mt-3 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                      <MapPinPlusInside className="-ms-0.5 me-1.5 h-6 w-6" width={24} />
                      <span>New Dilvery Address</span>
                    </button>
                  </Link>
                )}
              </div>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}
