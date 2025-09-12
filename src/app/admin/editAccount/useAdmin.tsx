import { createAdminSchema, UpdateAdmin, updateAdminSchema } from "@/@types/admin";
import useToast from "@/hooks/useToast";
import { useRef, useState } from "react";

export default function useAdmin(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  const toast = useToast();
  const [admin, setAdmin] = useState<null | undefined | UpdateAdmin>();
  const keyref = useRef<string>(null);

  const getAdmin = async (form: FormData) => {
    const key = form.get("key") as string;
    console.log(key);
    setLoading(true);
    if (!key) return toast("Enter admin Key", false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      });
      keyref.current = key;
      if (res.status === 200) {
        const admin = await res.json();
        const data = await updateAdminSchema.parseAsync(admin);
        setAdmin(data);
      } else if (res.status === 204) {
        setAdmin(null);
      } else {
        toast("Error fetching admin", false);
      }
    } catch (err) {
      toast((err as Error).message, false);
    } finally {
      setLoading(false);
    }
  };
  return { admin, keyref, getAdmin } as const;
}
