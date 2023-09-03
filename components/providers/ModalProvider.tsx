"use client";

import { useEffect, useState } from "react";
import CreateCommunityModal from "../modals/CreateCommunityModal";
import InviteModal from "../modals/InviteModal";
import EditCommunityModal from "../modals/EditCommunityModal";
import MembersModal from "../modals/Members";
import CreateBranchModel from "../modals/CreateBranchModel";
import LeaveModal from "../modals/LeaveModal";
import DeleteCommunityModal from "../modals/DeleteCommunityModel";

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