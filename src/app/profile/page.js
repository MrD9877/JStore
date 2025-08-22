"use client";
import Loading from "@/components/Loading";
import Popup from "@/components/Popup";
import UserProfileCard from "@/components/UserProfileCard";
import useFetchUser from "@/hooks/useFetchUser";

export default function ProfilePage() {
  const { user, error, loading, setUser } = useFetchUser();

  if (error) return <Popup link={"/profile"} msg={"Error!! reload page?"} />;
  if (loading)
    return (
      <div className="h-screen w-screen">
        <Loading height="40vh" />
      </div>
    );
  if (!user) return <Popup link={"/login"} msg={"Login to Continue"} />;
  return (
    <div>
      <div style={{ maxWidth: "100vw" }}>
        {user && (
          <div className="mx-auto max-w-screen-lg px-2 sm:px-4 2xl:px-0">
            <UserProfileCard user={user} setUser={setUser} />
          </div>
        )}
      </div>
    </div>
  );
}
