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

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({ ownerId, accountId, fullName, avatar, email }: Props) => {

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <div className='flex items-center gap-2'>
        <Image src="/assets/icons/logo-brand.svg" alt="logo" width={50} height={50} className="h-auto" />
        <h1 className="font-poppins font-[500] text-2xl leading-9 text-brand"><span className="font-semibold text-4xl">C</span>loud<span className="font-semibold text-4xl">H</span>aven</h1>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger><Menu size={35} color="#FA7275" /></SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle className="header-user">
            <Image src={avatar} alt="avatar" height={44} width={44} className="header-user-avatar" />
            <div className="sm:hidden lg:block">
              <p className="subtitle-2 capitalize">{fullName}</p>
              <p className="caption">{email}</p>
            </div>
          </SheetTitle>
          <div className="pb-4"><Separator className="bg-light-200/20" /></div>
          <SheetDescription>
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navItems.map(({ url, name, icon }) => (
                  <Link key={name} href={url} className='lg:w-full'>
                    <li className={cn("mobile-nav-item", pathname === url && "shad-active",)}>
                      <Image src={icon} alt='name' height={24} width={24} className={cn('nav-icon', pathname === url && "nav-icon-active")} />
                      <p>{name}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
          </SheetDescription>
          <div className="my-4"><Separator className="bg-light-200/20" /></div>
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader />
            <button type='submit' className='mobile-sign-out-button' onClick={async()=>await signOutUser()}>
              <Image src="/assets/icons/logout.svg" alt="logo" width={24} height={24}/>              
              <p>Logout</p>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNavigation