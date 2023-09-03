"use client";

import axios from "axios";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import qs from 'query-string'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useState } from "react";
import FileUpload from "../FileUpload";
import { useModal } from "@/app/hooks/useModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BrachType } from "@prisma/client";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Brach name is required."
    }).refine(
        name => name !== "general",
        {
            message: "Name cannot be 'general'"
        }
    ),
    type: z.nativeEnum(BrachType)

});

const CreateBranchModel = () => {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "createBranch";

    const router = useRouter();
    const params = useParams()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: BrachType.TEXT
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/branches",
                query: {
                    communityId: params?.communityId
                }
            });

            await axios.post(url, values);

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
                            Add a new Branch
                        </DialogTitle>

                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">


                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className="uppercase text-xs font-bold text-neutral-400"
                                            >
                                                Branch Name
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
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className="uppercase text-xs font-bold text-neutral-400"
                                            >
                                                Branch Type
                                            </FormLabel>
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className="ring-offset-0 focus:ring-offset-0"
                                                    >
                                                        <SelectValue placeholder="Select a channel type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(BrachType).map((type) => (
                                                        <SelectItem
                                                            key={type}
                                                            value={type}
                                                            className="capitalize"
                                                        >
                                                            {type.toLowerCase()}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter className=" px-6 py-4 bg-slate-200 dark:bg-slate-900">
                                <Button variant="primary" disabled={isLoading}>
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBranchModel