import { ServerInsertedHTMLContext, redirect } from 'next/navigation'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import NavAction from './NavAction'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import NavItem from './NavItem'
import { ModeToggle } from '../ModeToggle'
import { UserButton } from '@clerk/nextjs'

const NavSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) return redirect("/")

  const communities = await db.community.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-slate-950 bg-[#E3E5E8] py-3"
    >
      <NavAction/>
      <ScrollArea className="flex-1 w-full">
        {
          communities.map((community)=>(
            <div key={community.id} className='mb-4'>
              <NavItem 
                id={community.id}
                imageUrl={community.imageUrl}
                name={community.name}
              />
            </div>
          ))
        }
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />
      </div>
    </div>
  )
}

export default NavSidebar