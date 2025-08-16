export const handleLogout = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, { credentials: "include" });
    if (res.status === 200) window.location.reload(true);
  } catch {
    console.log("error");
  }
};
