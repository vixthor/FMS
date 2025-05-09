import { Link } from '@inertiajs/react'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
    href: string
    icon: React.ReactNode
    title: string
    active?: boolean
}

export function SidebarItem({ href, icon, title, active = false }: SidebarItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                active && "bg-gray-100 text-gray-900"
            )}
        >
            {icon}
            {title}
        </Link>
    )
}