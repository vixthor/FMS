import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'

interface SidebarHeaderProps {
    name: string
    role: string
    avatar?: string
}

export function SidebarHeader({ name, role, avatar }: SidebarHeaderProps) {
    return (
        <div className="flex items-center gap-4 px-4 py-6">
            <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
    )
}