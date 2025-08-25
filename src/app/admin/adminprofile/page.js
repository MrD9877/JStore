"use client";
import AdminNavBottom from "@/navbars/AdminNavBottom";
import AdminProfileCard from "@/components/AmindProfileCard";
import Loading from "@/components/Loading";
import Popup from "@/components/Popup";
import useFetchUser from "@/hooks/useFetchUser";

export default function page() {
  const { user, error, loading } = useFetchUser();
  return (
    <div>
      {loading ? <Loading /> : user ? <AdminProfileCard user={user} /> : <Popup link={"/login"} msg={"Login to Continue or Reload page if Already loged..."} />}
      <div className="mt-20">
        <AdminNavBottom />
      </div>
    </div>
  );
}
