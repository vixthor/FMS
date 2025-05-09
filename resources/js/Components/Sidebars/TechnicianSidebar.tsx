import { useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { HomeIcon, ClipboardIcon, UsersIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import ImageDisplay from "@/Components/ImageDisplay";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Dropdown from '@/Components/Dropdown';
import { PropsWithChildren, ReactNode } from "react";

export function TechnicianSidebar({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sidebar collapsible="icon" collapsed={collapsed} onCollapse={setCollapsed}>
            <SidebarHeader>
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        icon={<HomeIcon className="w-6 h-6" />}
                        collapsed={collapsed}
                    >
                        Dashboard
                    </NavLink>
                    {/* <NavLink
                        href={route("admin.complaints.index")}
                        active={route().current("admin.complaints.index")}
                        icon={<ClipboardIcon className="w-6 h-6" />}
                        collapsed={collapsed}
                    >
                        Complaints
                    </NavLink> */}
                    {/* <NavLink
                        href={route("users.index")}
                        active={route().current("users.index")}
                        icon={<UsersIcon className="w-6 h-6" />}
                        collapsed={collapsed}
                    >
                        Users
                    </NavLink> */}
                    <NavLink
                        href={route("technician.inventory.index")}
                        active={route().current("technician.inventory.index")}
                        icon={<ArchiveBoxIcon className="w-6 h-6" />}
                        collapsed={collapsed}
                    >
                        Inventory
                    </NavLink>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex justify-between">
                                    <ImageDisplay
                                        className="w-8 h-8 rounded-full"
                                        src="images/coverimage.svg"
                                        alt=""
                                    />
                                    <div>{user.name}</div>

                                    <ImageDisplay
                                        className="w-4 h-4 rounded-full"
                                        src="images/chevron-down.svg"
                                        alt=""
                                    />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >   <Dropdown.Link
                                href={route('profile.edit')}
                            >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
