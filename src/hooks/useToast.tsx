import toast from "react-hot-toast";

export default function useToast() {
  const popTost = (msg: string, success: boolean = true) => {
    let emote = "❌";
    if (success) emote = "✅";
    toast(`${msg}`, {
      icon: `${emote}`,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  return popTost;
}
