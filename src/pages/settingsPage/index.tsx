import React from 'react'
import { Separator } from "@/components/ui/separator"
import { SettingsNav } from './settingsSidebar'
import { Route, Routes } from 'react-router-dom'
import Profile from './profile'
import appearance from './cards'
import advanced from './advanced'

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  }
  ,
  {
    title: "Cards",
    href: "/settings/cards",
  },
  {
    title: "Advanced",
    href: "/settings/advanced",
  }
]

const Settings = () => {


  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SettingsNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Routes>
            <Route path='/settings/profile' Component={Profile} />
            <Route path='/settings/cards' Component={appearance} />
            <Route path='/settings/advanced' Component={advanced} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Settings
