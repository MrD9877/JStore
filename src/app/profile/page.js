"use client";
import Loading from "@/app/components/Loading";
import Popup from "@/app/components/Popup";
import UserProfileCard from "@/app/components/UserProfileCard";
import { useState } from "react";
import FetchUser from "../components/FetchUser";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  return (
    <div>
      <FetchUser setLoading={setLoading} setError={setError} setUser={setUser} />
      <div style={{ maxWidth: "100vw" }}>
        {error ? (
          <Popup link={"/profile"} msg={"Error!! reload page?"} />
        ) : loading ? (
          <Loading height="40vh" />
        ) : user ? (
          <section className="bg-white w-screen py-8 antialiased dark:bg-gray-900 md:py-8">
            <div className="mx-auto max-w-screen-lg px-2 sm:px-4 2xl:px-0">
              <UserProfileCard user={user} />
            </div>
          </section>
        ) : (
          <Popup link={"/login"} msg={"Login to Continue"} />
        )}
      </div>
    </div>
  );
}
