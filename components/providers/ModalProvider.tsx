"use client";

import { useEffect, useState } from "react";
import CreateCommunityModal from "@/components/modals/CreateCommunityModal";
import InviteModal from "@/components/modals/InviteModal";
import EditCommunityModal from "@/components/modals/EditCommunityModal";
import MembersModal from "@/components/modals/Members";
import CreateBranchModel from "@/components/modals/CreateBranchModel";
import LeaveModal from "@/components/modals/LeaveModal";
import DeleteCommunityModal from "@/components/modals/DeleteCommunityModel";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  
    return (
      <>
        <CreateCommunityModal />
        <EditCommunityModal/>
        <CreateBranchModel/>
        <InviteModal/>
        <MembersModal/>
        <LeaveModal/>
        <DeleteCommunityModal/>
      </>
    )
  }