"use client"
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";


export default function AddnewOptions() {
    const router = useRouter()
    const handleRouting = (link) => {
        router.push(link)
    }
    return (
        <div className="pt-6 pr-6 flex justify-end ">
            <Menu>
                <MenuHandler>
                    <Button className="bg-gray-800">|||</Button>
                </MenuHandler>
                <MenuList>
                    <MenuItem onClick={() => handleRouting("/addproducts")}>Product</MenuItem>
                    <MenuItem onClick={() => handleRouting("/addavatar")}>Avatar</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}