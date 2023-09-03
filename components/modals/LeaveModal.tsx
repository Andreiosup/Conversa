"use client";

import axios from "axios";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { useModal } from "@/app/hooks/useModal";

import { Button } from "../ui/button";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LeaveModal = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();
    const isModalOpen = isOpen && type === "leaveCommunity"
    const router = useRouter();
    const { community } = data

    const [isLoading, setIsLoading] = useState(false);

    const onConfirm = async () => {
        try {
            setIsLoading(true)

            await axios.patch(`/api/communities/${community?.id}/leave`)

            onClose();
            router.refresh();
            router.push("/");

        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div >
            <Dialog open={isModalOpen} onOpenChange={onClose}>

                <DialogContent className=" p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl  text-center font-bold">
                            Leave Community
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Are you sure you want to leave <span className="font-semibold text-blue-500">{community?.name}</span>?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="px-6 py-4 ">
                        <div className="flex  items-center justify-center gap-4 w-full">
                            <Button
                                disabled={isLoading}
                                onClick={onClose}
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={isLoading}
                                variant="ghost"
                                onClick={onConfirm}
                            >
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LeaveModal