import CommunitySidebar from '@/components/community/CommunitySidebar';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const CommunityLayout = async ({
    children,
    params
}: {
    children: ReactNode,
    params: { communityId: string };
}) => {
    const profile = await currentProfile()

    if (!profile) return redirectToSignIn()

    const community = await db.community.findUnique({
        where: {
            id: params.communityId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!community) return redirect("/")

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <CommunitySidebar communityId={community.id} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}

export default CommunityLayout