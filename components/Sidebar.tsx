"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Props {
    fullName: string;
    avatar: string;
    email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <Link href="/">
                <div className="hidden h-auto lg:block">
                    <div className='flex items-center gap-2'>
                        <Image src="/assets/icons/logo-brand.svg" alt="logo" width={50} height={50} className="h-auto" />
                        <h1 className="font-poppins font-[500] text-2xl leading-9 text-brand"><span className="font-semibold text-4xl">C</span>loud<span className="font-semibold text-4xl">H</span>aven</h1>
                    </div>
                </div>
                <Image src="assets/icons/logo-brand.svg" width={52} height={52} className='lg:hidden' alt='logo' />
            </Link>
            <nav className='sidebar-nav'>
                <ul className="flex flex-1 flex-col gap-6">
                    {navItems.map(({ url, name, icon }) => (
                        <Link key={name} href={url} className='lg:w-full'>
                            <li className={cn("sidebar-nav-item", pathname === url && "shad-active",)}>
                                <Image src={icon} alt='name' height={24} width={24} className={cn('nav-icon', pathname === url && "nav-icon-active")} />
                                <p className='hidden lg:block'>{name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
                <Image src="/assets/images/files-2.png" alt='logo' width={506} height={418} className='w-full' />
                <div className='sidebar-user-info'>
                    <Image src={avatarPlaceholderUrl} alt='avator' width={44} height={44} className='sidebar-user-avatar' />
                    <div className='hidden lg:block'>
                        <p className='subtitle-2 capitalize'>{fullName}</p>
                        <p className='caption'>{email}</p>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar