"use client";
import useToast from "@/hooks/useToast";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FilterBar({ setOrders, setLoading }) {
  const [filter, setFilter] = useState();
  const toast = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let res;
      if (!filter) {
        res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, { credentials: "include" });
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders?status=${filter}`, { credentials: "include" });
      }
      if (res.status === 200) {
        const data = await res.json();
        data.length === 0 && toast(`No results for ${filter}`, false);
        setOrders(data);
        setLoading(false);
      } else {
        toast("Login To Continue!!!", false);
        setLoading(false);
      }
    } catch {
      toast("somthng went wrong try Reloading Page", false);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [filter]);
  return (
    <div className="pt-6 pr-6 flex justify-end">
      <Toaster position="top-center" reverseOrder={false} />
      <Menu>
        <MenuHandler>
          <Button className="bg-gray-400">Filter Results</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setFilter("new")}>New orders</MenuItem>
          <MenuItem onClick={() => setFilter("accepted")}>Accepted</MenuItem>
          <MenuItem onClick={() => setFilter("decline")}>Declines</MenuItem>
          <MenuItem onClick={() => setFilter("deliver")}>Delivered</MenuItem>
          <MenuItem onClick={() => setFilter(null)}>All</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
