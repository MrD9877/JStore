"use client";
import { OrderType } from "@/@types/orders";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";

export default function FilterBar({ setFilter }: { setFilter: Dispatch<SetStateAction<OrderType["status"]>> }) {
  return (
    <div className="pt-6 pr-6 flex justify-end">
      <Menu>
        <MenuHandler>
          <Button
            type="button"
            className="bg-gray-400"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Filter Results
          </Button>
        </MenuHandler>
        <MenuList placeholder="" onResize={() => {}} onResizeCapture={() => {}} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
          <MenuItem
            onClick={() => setFilter("new")}
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            New orders
          </MenuItem>
          <MenuItem
            onClick={() => setFilter("packed")}
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Accepted
          </MenuItem>
          <MenuItem
            onClick={() => setFilter("shipped")}
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Declines
          </MenuItem>
          <MenuItem
            onClick={() => setFilter("delivered")}
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Delivered
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
