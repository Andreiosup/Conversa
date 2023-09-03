import { ReactNode } from "react";

import NavSidebar from "@/components/navigation/NavSidebar";
import { Separator } from "@/components/ui/separator";

const RootLayout = async ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavSidebar/>

            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    );
}

export default RootLayout;