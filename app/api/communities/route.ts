import {v4 as uuidv4} from "uuid"
import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"

export async function POST (req: Request){
    try {
        const { name, imageUrl } = await req.json()
        
        const profile = await currentProfile()
        
        if (!profile) return new NextResponse("Unauthorized",{status: 500})
        
        const community = await db.community.create({
            data : {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                branches: {
                    create:[
                        {
                            name:"general",
                            profileId: profile.id
                        }
                    ]
                },
                members: {
                    create:[
                        {
                            role: MemberRole.ADMIN,
                            profileId: profile.id
                        }
                    ]
                }
            }
        })

        return NextResponse.json(community)

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error",{status: 500})
    }
}