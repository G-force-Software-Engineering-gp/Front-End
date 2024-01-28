import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthContext from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import _ from 'lodash';
import { CalendarDays, Check, ChevronRight, GanttChartSquare, LineChart, Plus, Settings, Trash2, Trello, Users2 } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseURL } from '../baseURL';
import { useBoard } from './hooks/useBoard';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

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
  const { boardId } = useParams();
  const [addMemberButtonLoading, setAddMemberButtonLoading] = useState(false);
  const queryClient = useQueryClient();
  function inviteMembers() {
    const fetches = selectedUsers
      .map((item) => {
        return { member: item.id, board: boardId };
      })
      .map((item) => {
        return fetch(BaseURL + `tascrum/invite/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ` + authTokens.access,
          },
          body: JSON.stringify(item),
        });
      });
    Promise.allSettled(fetches)
      .then((results) =>
        results.forEach((item) => {
          setOpen(false);
          setSelectedUsers([]);
        })
      )
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ['members'] });
      });
  }
  let authTokens = useContext(AuthContext)?.authTokens;
  const [query, setQuery] = useState('');
  const deferredQuery = query;

  const [users, setUsers] = useState<User[] | []>([]);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const allUsers = useRef<User[] | []>([]);

  useEffect(() => {
    if (deferredQuery !== '') {
      axios
        .get(BaseURL + `tascrum/user-search/?board=${boardId}&search=${deferredQuery}`, {
          headers: {
            Authorization: `JWT ${authTokens.access}`,
          },
        })
        .then((res) => {
          const fetchedUsers: User[] = res.data;
          setUsers(fetchedUsers);
          allUsers.current = _.unionBy(allUsers.current, fetchedUsers, 'id');
        });
    } else {
      setUsers(selectedUsers);
    }
  }, [deferredQuery]);

  useEffect(() => {
    if (deferredQuery === '' && selectedUsers.length === 0) {
      setUsers([]);
    }
  }, [deferredQuery, selectedUsers]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button onClick={() => navigate(`/board/${boardId}`)} data-testid="Boards" variant="ghost" className="w-full justify-start">
              <Trello className="mr-2 h-4 w-4" />
              Cards
            </Button>
            <Button onClick={() => navigate(`/board/${boardId}/burndown`)} variant="ghost" className="w-full justify-start">
              <LineChart className="h-4 w-4 mr-2" />
              Burndown
            </Button>
            <Button onClick={() => navigate(`/board/${boardId}/calendar`)} variant="ghost" className='w-full justify-start'>
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button onClick={() => navigate(`/board/${boardId}/timeline`)} variant="ghost" className='w-full justify-start'>
              <GanttChartSquare className="h-4 w-4 mr-2" />
              Timeline
            </Button>
            <Button data-testid="Members" variant="ghost" className="group w-full justify-between pr-2">
              <div className="flex justify-start">
                <Users2 className="mr-2 h-4 w-4" />
                Members
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="hidden h-7  w-7 p-0 group-hover:flex">
                    <Plus className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="gap-0 p-0 outline-none">
                  <DialogHeader className="px-4 pb-4 pt-5">
                    <DialogTitle>Invite to Workspace</DialogTitle>
                    <DialogDescription>Invite a user to this Board.</DialogDescription>
                  </DialogHeader>
                  <Command shouldFilter={false} className="overflow-hidden rounded-t-none border-t">
                    <CommandInput
                      placeholder="Search user..."
                      value={query}
                      onValueChange={(str) => {
                        setQuery(str);
                      }}
                    />
                    <CommandList>
                      <CommandEmpty>No users found.</CommandEmpty>
                      {users.length !== 0 && (
                        <CommandGroup className="p-2">
                          {users.length !== 0 &&
                            users.map((user) => (
                              <CommandItem
                                key={user.email}
                                className="flex items-center px-2"
                                onSelect={() => {
                                  if (selectedUsers.filter((e: User) => e.email === user.email).length > 0) {
                                    return setSelectedUsers(
                                      selectedUsers.filter((selectedUser) => selectedUser.email !== user.email)
                                    );
                                  }

                                  const moteghayer = _.intersectionBy(allUsers.current, [...selectedUsers, user], 'id');
                                  return setSelectedUsers(moteghayer);
                                }}
                              >
                                <Avatar>
                                  <AvatarImage src={user.member[0].profimage} alt="Image" />
                                  <AvatarFallback>
                                    {user.first_name[0]}
                                    {user.last_name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="ml-2">
                                  <p className="text-sm font-medium leading-none">
                                    {user.first_name} {user.last_name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                {selectedUsers.filter((item) => item.email === user.email).length > 0 ? (
                                  <Check className="ml-auto flex h-5 w-5 text-primary" />
                                ) : null}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                  <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                    {selectedUsers.length > 0 ? (
                      <div className="flex -space-x-2 overflow-hidden">
                        {selectedUsers.map((user) => (
                          <Avatar key={user.email} className="inline-block border-2 border-background">
                            <AvatarImage src={user.member[0].profimage} />
                            <AvatarFallback>
                              {user.first_name[0]}
                              {user.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Select users to add to this Board.</p>
                    )}
                    <Button
                      disabled={selectedUsers.length < 1 || addMemberButtonLoading}
                      onClick={() => {
                        inviteMembers();
                      }}
                    >
                      {addMemberButtonLoading && <p>Loading...</p>}
                      {!addMemberButtonLoading && <p>Add Members</p>}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
