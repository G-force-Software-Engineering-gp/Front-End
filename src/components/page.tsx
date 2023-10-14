// import { Metadata } from "next"
// import Image from "next/image"

// import { Button } from "@/registry/new-york/ui/button"

import { Button } from './ui/button';

// import { CalendarDateRangePicker } from "/components/date-range-picker"
// import { MainNav } from "/components/main-nav"
// import { Search } from "/components/search"
// import TeamSwitcher from "/components/team-switcher"
// import { UserNav } from "/components/user-nav"

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// }

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher />
            <MainNav className="mx-6" /> */}
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search />
              <UserNav /> */}
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              <Button>Download</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
