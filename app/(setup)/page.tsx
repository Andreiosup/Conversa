import { ModeToggle } from "@/components/ModeToggle";
import InitialModal from "@/components/modals/InitialModal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { redirect } from "next/navigation"

export default async function SetupPage() {
  const profile = await initialProfile()

  const community = await db.community.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (community) {
    
    return redirect(`/communities/${community.id}`);
  }

  return (
    <InitialModal/>
  )
}
