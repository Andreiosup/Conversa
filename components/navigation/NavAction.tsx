"use client"

import { Plus } from 'lucide-react'
import React from 'react'
import { ActionTooltip } from '../ActionTooltip'
import { useModal } from '@/app/hooks/useModal'

const NavAction = () => {

    const { onOpen } = useModal()

    return (
        <div>
            <ActionTooltip
                side="right"
                align="center"
                label="Add community"
            >

                <button
                    onClick={() => onOpen("createCommunity")}
                    className="group flex items-center"
                >
                    <span
                        className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] 
                    transition-all overflow-hidden items-center justify-center bg-background
                    dark:bg-slate-800 group-hover:bg-blue-500"

                    >
                        <Plus
                            className='group-hover:text-white transition text-blue-500'
                            size={25}
                        />

                    </span>
                </button>
            </ActionTooltip>
        </div>
    )
}

export default NavAction