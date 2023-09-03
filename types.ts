
import { NextApiResponse } from "next";
// import { Community as SocketIOCommunity } from "socket.io";
import { Community, Member, Profile } from "@prisma/client"

export type CommunityWithMembersWithProfiles = Community & {
  members: (Member & { profile: Profile })[];
};

// export type NextApiResponseCommunityIo = NextApiResponse & {
//   socket: Socket & {
//     server: NetCommunity & {
//       io: SocketIOCommunity;
//     };
//   };
// };