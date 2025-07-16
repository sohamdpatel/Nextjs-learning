'use client'

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {

    const [active, setActive] = useState<string | null>(null);
    return (
        <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
            <Menu setActive={setActive}>
                <Link href={"/aceternity-music"} className="flex items-center gap-2">
                    <MenuItem setActive={setActive} active={active} item="Home">
                    </MenuItem>
                </Link>
                <MenuItem setActive={setActive} active={active} item="Our Courses">
                    <div className=" flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/aceternity-music/courses">All Courses</HoveredLink>
                        <HoveredLink href="/aceternity-music/courses">Basic Music Theory</HoveredLink>
                        <HoveredLink href="/aceternity-music/courses">Advanced Composition</HoveredLink>
                        <HoveredLink href="/aceternity-music/courses">Song Writing</HoveredLink>
                        <HoveredLink href="/aceternity-music/courses">Music Production</HoveredLink>
                    </div>
                </MenuItem>
                <Link href={"/aceternity-music/contact"}>
                    <MenuItem setActive={setActive} active={active} item="Contact Us" />
                </Link>
            </Menu>
        </div>
    )
}   