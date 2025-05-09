import { Button } from '@/Components/ui/button'
import { usePage } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'

export function Navbar({ role }: { role: string }) {
    const { auth } = usePage().props

    return (
        <header className="border-b bg-white">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Logged in as: {role}</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/default.png" alt="User" />
                                <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href={route('logout')} method="post" as="button">
                                Log out
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}