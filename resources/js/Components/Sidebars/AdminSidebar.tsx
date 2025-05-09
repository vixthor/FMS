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
import ApplicationLogo from "@/Components/ApplicationLogo";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ImageDisplay from "@/Components/ImageDisplay";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import useAuth from '@/hooks/use-auth';
import { HomeIcon, ClipboardIcon, UsersIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
export function AdminSidebar({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const { hasRole } = useAuth();
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {/* Dashboard Menu Item */}
                    {/* {hasRole('admin') && (
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </NavLink>
                    )} */}
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        icon={<HomeIcon className="w-6 h-6" />}
                       
                    >
                        Dashboard
                    </NavLink>
                    {/* Profile Menu Item */}


                    {/* Complaints Menu Item */}
                    {hasRole('technician') && (
                        <NavLink
                            href={route("admin.complaints.index")}
                            active={route().current("admin.complaints.index")}
                        >
                            <ImageDisplay
                                className="w-8 h-8"
                                src="images/complaints.svg"
                                alt=""
                            />
                            Complaints
                        </NavLink>
                    )}
                    {hasRole('admin') && (
                        <NavLink
                            href={route("complaints")}
                            active={route().current("complaints")}
                        >
                            <ImageDisplay
                                className="w-8 h-8"
                                src="images/complaints.svg"
                                alt=""
                            />
                            Complaints
                        </NavLink>
                    )}
                    {/* Users Menu Item */}
                    {hasRole('admin') && (
                        <NavLink
                            href={route("users.index")}
                            active={route().current("users.index")}
                        >
                            <ImageDisplay
                                className="w-8 h-8"
                                src="images/users.svg"
                                alt=""
                            />
                            Users
                        </NavLink>
                    )}

                    {/* Inventory Menu Item */}

                    {/* {hasRole('admin') && ( 
                        <NavLink
                            href={route('inventory.index')}
                        active={route().current('inventory.index')}
                        >
                            Inventory
                         </NavLink>
                    )} */}
                    <NavLink
                        href={route("admin.complaints.index")}
                        active={route().current("admin.complaints.index")}
                        icon={<ClipboardIcon className="w-6 h-6" />}
                      
                    >
                        
                        Complaints
                    </NavLink>
                    <NavLink
                        href={route("admin.inventory.index")}
                        active={route().current("admin.inventory.index")}
                        icon={<ArchiveBoxIcon className="w-6 h-6" />}
                       
                    >
                        Inventory
                    </NavLink>
                    <NavLink
                        href={route('admin.roster.index')}
                        active={route().current('admin.roster.index')}
                        icon={<ClipboardIcon className="w-6 h-6" />}
                    >
                        Roster
                    </NavLink>
                    <NavLink
                        href={route('admin.activityLogs')}
                        active={route().current('admin.activityLogs')}
                        icon={<ClipboardIcon className="w-6 h-6" />}
                    >
                        Activity Log
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
