import React, { useEffect } from "react";

export default function useAvatar({ user, setAvatarSrc }) {
  const getAvatar = async () => {
    const avatarId = user.avatarId ? user.avatarId : 2;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/avatar?avatarId=${avatarId}`);
      const data = await res.json();
      setAvatarSrc(data.avatar);
    } catch {
      setAvatarSrc("https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg");
    }
  };
  useEffect(() => {
    if (!user) return;
    getAvatar();
  }, [user]);
  return {};
}
