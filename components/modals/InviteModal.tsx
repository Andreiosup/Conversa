"use client";

import axios from "axios";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'


import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { useModal } from "@/app/hooks/useModal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/app/hooks/useOrigin";
import { useState } from "react";


const InviteModal = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();
    const isModalOpen = isOpen && type === "invite";
    const { community } = data

    const origin = useOrigin()
    const inviteUrl = `${origin}/invite/${community?.inviteCode}`

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onGenerateLink = async () => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/communities/${community?.id}/invite-code`)

            onOpen("invite" ,{community: response.data })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div >
            <Dialog open={isModalOpen} onOpenChange={onClose}>

                <DialogContent className=" p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl  text-center font-bold">
                            Invite People
                        </DialogTitle>
                    </DialogHeader>
                    <div className="p-6">
                        <Label
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400"
                        >
                            Server invite link
                        </Label>
                        <div className="flex items-center mt-2 gap-x-2">
                            <Input
                                disabled={isLoading}
                                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={inviteUrl}
                            />
                            <Button onClick={onCopy} size="icon" variant="primary">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Button
                            variant="link"
                            size="sm"
                            className="text-xs bg-transparent hover:bg-transparent text-blue-500 mt-4"
                            onClick={() => onGenerateLink() }
                        >
                            Generate a new link
                            <RefreshCw className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default InviteModal