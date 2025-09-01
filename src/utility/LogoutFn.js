export const handleLogout = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, { credentials: "include" });
    if (res.status === 200) {
      window.location.reload();
      window.location.href = window.location.href;
    }
  } catch {
    console.log("error");
  }
};
