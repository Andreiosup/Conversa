import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({ params }: InviteCodePageProps) => {

  const profile = await currentProfile()

  if (!profile) return redirectToSignIn()

  const existingCommunity = await db.community.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingCommunity) return redirect(`/communities/${existingCommunity}`)

  const community = await db.community.update({
    where: {
      inviteCode: params.inviteCode
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          }
        ]
      }
    }
  })

  if (community) return redirect(`/communities/${community}`)

  return null
}

export default InviteCodePage