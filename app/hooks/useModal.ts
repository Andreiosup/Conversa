import { Branch, BrachType, Community } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createCommunity" | "invite" | "editCommunity" | "members" | "createBranch" | "leaveCommunity" | "deleteCommunity" | "deleteBranch" | "editBranch" | "messageFile" | "deleteMessage";

interface ModalData {
  community?: Community;
  branch?: Branch;
  branchType?: BrachType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));