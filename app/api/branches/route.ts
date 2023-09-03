import {v4 as uuidv4} from "uuid"
import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"

export async function POST (req: Request){
    try {
        const { name, type } = await req.json()
        const profile = await currentProfile()

        const { searchParams } = new URL(req.url);
        const communityId = searchParams.get("communityId");
        
        if (!profile) return new NextResponse("Unauthorized",{status: 500})

        if (!communityId) return new NextResponse("Server ID missing", { status: 400 }); 

        if (name=== "general") return new NextResponse("Name cannot be general",{status: 500})


        const community = await db.community.update({
            where: {
              id: communityId,
              members: {
                some: {
                    profileId: profile.id,
                    role:{
                        in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                    }
                }
              }
            },
            data: {
              branches: {
                create: {
                  profileId: profile.id,
                  name,
                  type,
                }
              }
            },
          });    

        return NextResponse.json(community)

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error",{status: 500})
    }
}