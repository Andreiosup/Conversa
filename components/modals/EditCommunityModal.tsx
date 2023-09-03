"use client";

import axios from "axios";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useState } from "react";
import FileUpload from "../FileUpload";
import { useModal } from "@/app/hooks/useModal";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
});

const EditCommunityModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const {community} = data
    const isModalOpen = isOpen && type === "editCommunity";

    const router = useRouter();


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    useEffect(()=>{
        if(community) {
            form.setValue("name",community.name)
            form.setValue("imageUrl",community.imageUrl)
        }
    }, [community, form])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/communities/${community?.id}`, values)

            form.reset()
            router.refresh()
            onClose()

        } catch (error) {
            console.log(error)
        }
        console.log(values)
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <div >
            <Dialog open={isModalOpen} onOpenChange={handleClose}>

                <DialogContent className=" p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl  text-center font-bold">
                            Customize your community
                        </DialogTitle>
                        <DialogDescription className="text-center ">
                            Give your server a personality with a name and an image. You can always change it later.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FileUpload
                                                        endpoint="serverImage"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className="uppercase text-xs font-bold text-neutral-400"
                                            >
                                                Community name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className=" focus-visible:ring-0  focus-visible:ring-offset-0"
                                                    placeholder="Enter name here"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter className=" px-6 py-4 bg-slate-200 dark:bg-slate-900">
                                <Button variant="primary" disabled={isLoading}>
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditCommunityModal