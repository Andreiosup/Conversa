"use client"
import Image from 'next/image';
import { ActionTooltip } from '../ActionTooltip';
import { useParams, useRouter } from 'next/navigation';

interface NavItemProps {
    id: string;
    imageUrl: string;
    name: string;
};

const NavItem = ({
    id,
    imageUrl,
    name
}: NavItemProps) => {

    const router = useRouter()
    const params = useParams()

    const onClick = () => {
        router.push(`/communities/${id}`);
    }

    return (
        <ActionTooltip
            side="right"
            align="center"
            label={name}
        >
            <div>
                <button
                    onClick={onClick}
                    className="group relative flex items-center"
                >
                    <div className={
                        `absolute left-0 bg-blue-400 rounded-r-full transition-all w-[4px]
                        ${params?.communityId !== id && "group-hover:h-[20px] "}
                        ${params?.communityId === id ? "h-[36px]" : "h-[8px]"}`
                    } />
                    <div className={
                        `relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] 
                        group-hover:rounded-[16px] transition-all overflow-hidden
                        ${params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"}`
                    }>
                        <Image
                            fill
                            src={imageUrl}
                            alt="Channel"
                        />
                    </div>
                </button>
            </div>
        </ActionTooltip>
    )
}

export default NavItem