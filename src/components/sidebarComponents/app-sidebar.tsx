"use client";

import * as React from "react"; 

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    RiAccountCircleFill,
    RiBuilding2Fill,
    RiFolderOpenFill,
    RiHome4Fill,
    RiLock2Fill,
    RiPieChartFill,
    RiWalletFill,
} from "@remixicon/react";
import { useFetchData } from "@/hooks/useFetchData";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";
import { IUser } from "@/models/user";

const data: any = {
    user: {
        name: "Arthur Taylor",
        email: "sophia@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: RiHome4Fill,
            isActive: false,
            items: [],
        },
        {
            title: "Property",
            url: "property",
            icon: RiBuilding2Fill,
            items: [
                {
                    title: "Listings",
                    url: "/dashboard/property/listings?type=BUILDING",
                },
                {
                    title: "Investments",
                    url: "/dashboard/property/investments",
                },
                {
                    title: "Sales & Reservations",
                    url: "/dashboard/property/sales",
                },
            ],
        },
        {
            title: "Users",
            url: "users",
            icon: RiAccountCircleFill,
            items: [
                {
                    title: "Clients",
                    url: "/dashboard/users/clients",
                },
                {
                    title: "ESP Realtors",
                    url: "/dashboard/users/realtor",
                },
                {
                    title: "Staff",
                    url: "/dashboard/users/admin",
                },
            ],
        },
        {
            title: "Construction",
            url: "/dashboard/constructions/proposals",
            icon: RiFolderOpenFill,
            items: [],
        },
        {
            title: "Wallet",
            url: "/dashboard/wallet/alltransaction",
            icon: RiWalletFill,
        },
        {
            title: "Reports & Analytics",
            url: "/dashboard/analytics",
            icon: RiPieChartFill,
            items: [],
        },
        {
            title: "Role Management",
            url: "/dashboard/role",
            icon: RiLock2Fill,
            items: [],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const id = Cookies.get("userid");
    const { data: userData, isLoading } = useFetchData<IUser>(
        `/admin/details/${id}`,
        ["userData"],
    );
    const { setUserDetails } = useUserStore((state) => state);

    React.useEffect(() => {
        setUserDetails(userData as IUser);
    }, [userData, isLoading]);

    return (
        <Sidebar className=" !bg-[#f2f4f7] " variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className=" w-full ">
                                <img
                                    className=" w-auto h-[50px] "
                                    src="/favicon.png"
                                    alt="logo"
                                />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain
                    items={data?.navMain}
                    permissions={userData?.adminRole?.permissions as string[]}
                    role={userData?.adminRole?.name}
                />
            </SidebarContent>
            {!isLoading && (
                <SidebarFooter className="mt-auto">
                    <NavUser user={userData as IUser} />
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
