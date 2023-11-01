import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Check, Trello } from 'lucide-react';
import { Users2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react';
import { Link } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Trash2 } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import AuthContext from '@/contexts/AuthContext';
import { useDeferredValue } from "react";
import _, { difference } from "lodash";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  member: Member[];
}

interface Member {
  profimage: string;
}


export function BoardSidebar({ className }: any) {

  const { boardId } = useParams()

  function inviteMembers() {
    const fetches = selectedUsers.map(item => {
      return { member: item.id, board: boardId }
    }).map(item => {
      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/invite/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
        body: JSON.stringify(item)
      })
    })
    Promise.allSettled(fetches).then(results => results.forEach(item => {
      console.log(item)
    }))
  }

  let authTokens = useContext(AuthContext)?.authTokens;
  const [query, setQuery] = useState('');
  // const deferredQuery = useDeferredValue(query);
  const deferredQuery = query;

  const [users, setUsers] = useState<User[] | []>([]);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const allUsers = useRef<User[] | []>([]);


  // console.log("-------------")
  // console.log(allUsers.current)
  // console.log(users)
  // console.log(JSON.stringify(selectedUsers.map(user => user.email), null, 2))
  // console.log("type: " + deferredQuery)
  // console.log(users.length !== 0)
  useEffect(() => {
    // console.log("------")
    // console.log("out: " + deferredQuery)
    if (deferredQuery !== "") {
      // console.log("in: " + deferredQuery)
      axios.get(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/user-search/?search=${deferredQuery}`, {
        headers: {
          Authorization: `JWT ${authTokens.access}`
        }
      })
        .then(res => {
          const fetchedUsers: User[] = res.data
          setUsers(fetchedUsers);
          allUsers.current = _.unionBy(allUsers.current, fetchedUsers, "id")
          // console.log("fetched")
        })
    }
    else {
      setUsers(selectedUsers)
    }
  }, [deferredQuery])

  useEffect(() => {
    if (deferredQuery === "" && selectedUsers.length === 0) {
      setUsers([])
    }
  }, [deferredQuery, selectedUsers])

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center">
            <Avatar className="rounded-sm h-9 w-9 ">
              <AvatarImage className="rounded-sm" src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback className="rounded-sm">G</AvatarFallback>
            </Avatar>
            <div className="ml-2 h-9 flex flex-col justify-between ">
              <p className="text-sm font-medium ">G-Force</p>
              <p className="text-xs text-muted-foreground">
                Free
              </p>
            </div>
          </div>
          <hr className="mb-2" />
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Trello className="mr-2 h-4 w-4" />
              Boards
            </Button>
            <Button variant="ghost" className="group pr-2 w-full justify-between">
              <div className="flex justify-start">
                <Users2 className="mr-2 h-4 w-4" />
                Members
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hidden group-hover:flex  h-7 w-7 p-0">
                    <Plus className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="gap-0 p-0 outline-none">
                  <DialogHeader className="px-4 pb-4 pt-5">
                    <DialogTitle>
                      Invite to Workspace
                    </DialogTitle>
                    <DialogDescription>
                      Invite a user to this Board.
                    </DialogDescription>
                  </DialogHeader>
                  {/* <Input
                    placeholder="Email address or name"
                  />
                  <div className="mt-3 flex justify-between items-center">
                    <span>Invite someone to this Workspace with a link:</span>
                    <Button variant="secondary" className="flex justify-start">
                      <Link className="w-4 h-4 mr-2" />
                      <span>Create link</span>
                    </Button>
                  </div> */}
                  <Command shouldFilter={false} className="overflow-hidden rounded-t-none border-t">
                    <CommandInput placeholder="Search user..." value={query} onValueChange={(str) => { setQuery(str) }} />
                    <CommandList>
                      <CommandEmpty>No users found.</CommandEmpty>
                      {users.length !== 0 && <CommandGroup className="p-2">
                        {users.length !== 0 && users.map((user) => (
                          <CommandItem
                            key={user.email}
                            className="flex items-center px-2"
                            onSelect={() => {
                              // if (selectedUsers.includes(user)) {
                              if (selectedUsers.filter((e: User) => e.email === user.email).length > 0) {
                                return setSelectedUsers(
                                  selectedUsers.filter(
                                    (selectedUser) => selectedUser.email !== user.email
                                  )
                                )
                              }

                              const moteghayer = _.intersectionBy(allUsers.current, [...selectedUsers, user], "id")
                              // console.log(moteghayer)
                              return setSelectedUsers(
                                // [...allUsers.current].filter((u) =>
                                //   [...selectedUsers, user].filter((item) => u.email == item.email)
                                // )
                                moteghayer
                              )
                            }}
                          >
                            <Avatar>
                              <AvatarImage src={user.member[0].profimage} alt="Image" />
                              <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                              <p className="text-sm font-medium leading-none">
                                {user.first_name} {user.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                            {selectedUsers.filter(item => item.email === user.email).length > 0 ? (
                              <Check className="ml-auto flex h-5 w-5 text-primary" />
                            ) : null}
                          </CommandItem>
                        ))}
                      </CommandGroup>}
                    </CommandList>
                  </Command>
                  <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                    {selectedUsers.length > 0 ? (
                      <div className="flex -space-x-2 overflow-hidden">
                        {/* <p>{JSON.stringify(selectedUsers.map(user => user.email), null, 2)}</p> */}
                        {selectedUsers.map((user) => (
                          <Avatar
                            key={user.email}
                            className="inline-block border-2 border-background"
                          >
                            <AvatarImage src={user.member[0].profimage} />
                            <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Select users to add to this Board.
                      </p>
                    )}
                    <Button
                      disabled={selectedUsers.length < 1}
                      onClick={() => {
                        inviteMembers()
                      }}
                    >
                      Add Members
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full h-fit justify-between pr-3">
                  <div className="flex justify-start items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Workspace Settings
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Workspace settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Upgrade Workspace</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div >
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Workspace Views
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="group w-full justify-between pr-2">
              <div className="flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2 h-4 w-4 lucide lucide-table-properties"><path d="M15 3v18" /><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M21 9H3" /><path d="M21 15H3" /></svg>
                <span className="italic">Table</span>
              </div>
              <Button variant="secondary" className="hidden group-hover:flex h-7 w-7 p-0">
                <Trash2 className="h-4 w-4 hidden group-hover:block" />
              </Button>
            </Button>
            <Button variant="ghost" className="group w-full justify-between pr-2">
              <div className="flex justify-start">
                <CalendarDays className="mr-2 h-4 w-4" />
                <span className="italic">Calendar</span>
              </div>
              <Button variant="secondary" className="hidden group-hover:flex  h-7 w-7 p-0">
                <Trash2 className="h-4 w-4 hidden group-hover:block" />
              </Button>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Your Boards
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Table
            </Button>
          </div>
        </div>
      </div >
    </div >
  )
}