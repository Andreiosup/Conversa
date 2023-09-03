"use client"

import { CommunityWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/app/hooks/useModal";


interface CommunityHeaderProps {
    community: CommunityWithMembersWithProfiles;
    role?: MemberRole;
};


const CommunityHeader = ({ community, role }: CommunityHeaderProps) => {
    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR

    const { onOpen } = useModal()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button className="
                 w-full text-md font-semibold px-3 flex items-center h-12
                 border-neutral-200 dark:border-neutral-800 border-b-2 
                 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    {community.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium space-y-[2px]"
            >
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { community })}
                        className="text-blue-600 dark:text-blue-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        Invite Users
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("members", { community })}
                        className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        Manage Members
                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("editCommunity", { community })}
                        className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        Settings
                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("createBranch", { community })}
                        className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        Add Branch
                        <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("deleteCommunity", { community })}
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Delete Community
                        <Trash className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                        onClick={() => { onOpen("leaveCommunity", { community })}}
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Leave Community
                        <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CommunityHeader