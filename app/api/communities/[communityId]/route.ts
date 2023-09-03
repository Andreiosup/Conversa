import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH (req: Request, {params}:{params: {communityId: string}}) {
    try {

        const { name, imageUrl } = await req.json()

        const profile = await currentProfile()
        
        if (!profile) return new NextResponse("Unauthorized",{status: 401})

        if (!params.communityId) return new NextResponse("Invalid community",{status: 400}) 

        const community = await db.community.update({
            where: {
                id: params.communityId,
                profileId: profile.id
            },
            data : {
                name,
                imageUrl
            }
        })

        return NextResponse.json(community)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error",{status: 500})
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { communityId: string } }
  ) {
    try {
      const profile = await currentProfile();
  
      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const community = await db.community.delete({
        where: {
          id: params.communityId,
          profileId: profile.id,
        }
      });
  
      return NextResponse.json(community);
    } catch (error) {
      console.log("[SERVER_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  