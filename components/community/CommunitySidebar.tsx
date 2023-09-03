import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { BrachType } from '@prisma/client'
import { redirect } from 'next/navigation'
import CommunityHeader from './CommunityHeader'


const CommunitySidebar = async ({ communityId }: {
    communityId: string
}) => {
    const profile = await currentProfile()

    if (!profile) return redirect("/")

    const community = await db.community.findUnique({
        where: {
            id: communityId,
        },
        include: {
            branches: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    if (!community) redirect("/")

    const members = community?.members.filter((member) => member.profileId !== profile.id)
    const role = community?.members.find((member) => member.profileId == profile.id)?.role

    const textBranches = community?.branches.filter((branch) => branch.type === BrachType.TEXT)
    const audioBranches = community?.branches.filter((branch) => branch.type === BrachType.AUDIO)
    const videoBranches = community?.branches.filter((branch) => branch.type === BrachType.VIDEO)


    return (
        <div className="lex flex-col h-full text-primary w-full dark:bg-slate-900 bg-[#F2F3F5]">
            <CommunityHeader
                community={community}
                role={role}
            />
        </div>
    )
}

export default CommunitySidebar