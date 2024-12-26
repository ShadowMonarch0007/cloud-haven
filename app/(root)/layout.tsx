import React from 'react'
import Sidebar from '@/components/Sidebar'
import MobileNavigation from '@/components/MobileNavigation'
import Header from '@/components/Header'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'
import Search from '@/components/Search'

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {

    const currentUser = await getCurrentUser();
    if (!currentUser) return redirect('/sign-in')

    return (
        <main className='flex h-screen'>
            <Sidebar {...currentUser} />
            <section className='flex h-full flex-1 flex-col'>
                <MobileNavigation {...currentUser} />
                <Header userId={currentUser.$id} accountId={currentUser.accountId} />
                <div className="main-content">
                    <div className="w-full md:hidden sm:block pb-4"><Search/></div>
                    {children}
                </div>
            </section>
            <Toaster />
        </main>
    )
}

export default Layout