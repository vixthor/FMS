import { LayoutDashboard, ClipboardList } from 'lucide-react'
// import { SidebarHeader } from './SidebarHeader'
import { SidebarItem } from './SidebarItem'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenu,
} from "@/Components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ImageDisplay from "@/Components/ImageDisplay";



export function UserSidebar() {
    return (
        <div className="hidden border-r bg-gray-100/40 lg:block w-[200px]">
            <div className="flex h-full flex-col gap-2">
                <div className="flex-1 overflow-auto py-2">
                    <SidebarHeader  />

                    <div className="px-3 space-y-1">
                        <SidebarContent >
                            <SidebarMenu >
                                {/* Dashboard Menu Item */}
                                <SidebarMenuButton
                        
                            href={route("/dashboard")}
                            isActive={route().current("/dashboard")}
                    >
                        <ImageDisplay
                            className="w-8 h-8 rounded-full"
                            src="images/coverimage.svg"
                            alt=""
                        />
                        Dashboard
                    </SidebarMenuButton>

                                {/* Complaints Menu Item */}
                                {/* <SidebarMenuButton
                        
                        href={route("complaints.index")}
                        isActive={route().current("complaints.index")}
                    >
                        <ImageDisplay
                            className="w-8 h-8 "
                            src="images/user-square1.svg"
                            alt=""
                        />
                        Complaints
                    </SidebarMenuButton> */}

                                {/* Users Menu Item */}
                                {/* Complaints Menu Item */}
                                {/* <SidebarMenuButton
                        
                        href={route("users.index")}
                        isActive={route().current("users.index")}
                    >
                        <ImageDisplay
                            className="w-8 h-8 "
                            src="images/user-square1.svg"
                            alt=""
                        />
                       Users
                    </SidebarMenuButton> */}

                                {/* Inventory Menu Item */}
                                {/* <SidebarMenuButton
                        
                        href={route("inventory.index")}
                        isActive={route().current("inventory.index")}
                    >
                        <ImageDisplay
                            className="w-8 h-8 rounded-full"
                            src="images/coverimage.svg"
                            alt=""
                        />
                        Inventory
                    </SidebarMenuButton> */}
                            </SidebarMenu>
                        </SidebarContent>
                    </div>
                </div>
                <div className="flex items-center gap-4 px-4 py-6">
                    <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{currentRole}</p>
                        {/* Display the user's role for testing */}
                        <p className="text-sm text-blue-500">Role: {user.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}