import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    icon,
    collapsed = false,
    ...props
}: InertiaLinkProps & { active: boolean; icon?: React.ReactNode; collapsed?: boolean }) {
    return (
        <Link
            {...props}
            className={
                "flex items-center gap-2 m-3 px-3 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "bg-indigo-100 text-indigo-700 rounded-lg"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700") +
                " " +
                className
            }
        >
            {icon && (
                <div
                    className={`flex items-center justify-center ${
                        collapsed ? "w-full" : ""
                    }`}
                >
                    {icon}
                </div>
            )}
            {!collapsed && <span>{children}</span>}
        </Link>
    );
}
