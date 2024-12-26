"use client"
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import { Button } from "./ui/button";
import Search from "./Search";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({ $id: ownerId, accountId, fullName, avatar, email }: Props) => {

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex flex-col gap-2">
      <div className="mobile-header">
        <div className='flex items-center gap-2'>
          <Image src="/assets/icons/logo-brand.svg" alt="logo" width={50} height={50} className="h-auto" />
          <h1 className="font-poppins font-[500] text-2xl leading-9 text-brand"><span className="font-semibold text-4xl">C</span>loud<span className="font-semibold text-4xl">H</span>aven</h1>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Image src="/assets/icons/menu.svg" alt="Search" width={30} height={30} />
          </SheetTrigger>
          <SheetContent className="shad-sheet h-screen px-3">
            <SheetTitle>
              <div className="header-user">
                <Image src={avatar}
                  alt="avatar" width={44} height={44} className="header-user-avatar" />
                <div className="sm:hidden lg:block">
                  <p className="subtitle-2 capitalize">{fullName}</p>
                  <p className="caption">{email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-light-200/20" />
            </SheetTitle>

            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navItems.map(({ url, name, icon }) => (
                  <Link key={name} href={url} className="lg:w-full">
                    <li className={cn("mobile-nav-item", pathname === url && "shad-active",)}>
                      <Image src={icon} alt={name} width={24} height={24} className={cn("nav-icon", pathname === url && "nav-icon-active",)} />
                      <p>{name}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
            <Separator className="my-5 bg-light-200/20" />
            <div className="flex flex-col justify-between gap-5 pb-5">
              <FileUploader ownerId={ownerId} accountId={accountId} />
              <Button type="submit" className="mobile-sign-out-button" onClick={async () => await signOutUser()}            >
                <Image src="/assets/icons/logout.svg" alt="logo" width={24} height={24} />
                <p>Logout</p>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-full md:hidden sm:block"><Search/></div>
    </header>
  )
}

export default MobileNavigation