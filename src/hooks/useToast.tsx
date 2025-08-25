import toast from "react-hot-toast";

export default function useToast() {
  const popTost = (msg: string, success?: boolean) => {
    let emote = "❌";
    if (success) emote = "✅";
    toast(`${msg}`, {
      icon: success === undefined ? "" : `${emote}`,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  return popTost;
}
