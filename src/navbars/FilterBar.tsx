"use client";
import { OrderType } from "@/@types/orders";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";

export default function FilterBar({ setFilter }: { setFilter: Dispatch<SetStateAction<OrderType["status"]>> }) {
  return (
    <div className="pt-6 pr-6 flex justify-end">
      <Menu>
        <MenuHandler>
          <Button className="bg-gray-400">Filter Results</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setFilter("new")}>New orders</MenuItem>
          <MenuItem onClick={() => setFilter("packed")}>Accepted</MenuItem>
          <MenuItem onClick={() => setFilter("shipped")}>Declines</MenuItem>
          <MenuItem onClick={() => setFilter("delivered")}>Delivered</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
