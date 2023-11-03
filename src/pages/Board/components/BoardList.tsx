import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthContext from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Calendar,
  Check,
  ListIcon,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Plus,
  Tags,
  Trash,
  User as UserIcon,
} from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardDetail } from '../cardDetail';
import { useBoard } from '../hooks/useBoard';
import { useCard } from '../hooks/useCard';
import { useList } from '../hooks/useList';
import { useMembers } from '../hooks/useMembers';
import { Card as CardType, List, Members, User } from '../types';
import CreateTaskModal from './CreateTaskModal';

interface Props {
  listId: number;
  columns: List[];
  boardId: number;
}
export const BoardList = ({ listId, columns, boardId }: Props) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  let authTokens = useContext(AuthContext)?.authTokens;
  const deleteList = useMutation({
    mutationFn: () => {
      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/list/${listId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // on success
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
    },
  });

  const { data, isLoading } = useList(listId);
  return (
    <div className="board-draggable relative flex max-h-full w-72 shrink-0 flex-col">
      <div className="board-draggable-handler flex items-center justify-between px-0.5 pb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-info/10 text-info flex h-8 w-8 items-center justify-center rounded-lg">
            <ListIcon className="text-base" />
          </div>
          <h3 className=" text-base">{data?.title}</h3>
        </div>
        <div className="inline-flex">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                {/* <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Assign to...
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  Set due date...
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Tags className="mr-2 h-4 w-4" />
                    Move to
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Filter label..." autoFocus={true} />
                      <CommandList>
                        <CommandEmpty>No label found.</CommandEmpty>
                        <CommandGroup>
                          {columns.map((col) => (
                            <CommandItem
                              key={col.id}
                              onSelect={(value) => {
                                console.log(value);
                                setOpen(false);
                              }}
                            >
                              {col.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={() => deleteList.mutate()} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="is-scrollbar-hidden relative space-y-2.5 overflow-y-auto p-0.5">
        {data?.card?.map((card) => <ListCard columns={columns} cardId={card.id} listId={listId} />)}
      </div>
      <div className="flex justify-center  py-2">{data !== undefined && <CreateTaskModal listId={data.id} />}</div>
    </div>
  );
};

type CardProps = {
  cardId: number;
  listId: number;
  columns: List[];
};

export const ListCard = ({ cardId, columns, listId }: CardProps) => {
  const { data, isLoading, refetch: cardRefetch } = useCard(cardId);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();
  let authTokens = useContext(AuthContext)?.authTokens;
  const deleteTask = useMutation({
    mutationFn: () => {
      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/card/${cardId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // on success
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });
  if (data !== undefined || isLoading) {
    <Card className="w-full bg-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="  bg-inherit/20 text-lg">{data?.title}</p>
        </CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      {/* <CardContent>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">lllhlhhlkhkklj</div>
        <div className="flex flex-col space-y-1.5">
          <div className="flex flex-wrap space-x-1">
            <Badge className=" space-x-1 px-1.5 py-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span> Sep 12</span>
            </Badge>
            <Badge className="px-1.5 py-1">Update</Badge>
            <Badge className=" space-x-1 px-1.5 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>4/5</span>
            </Badge>
          </div>
        </div>
      </div>
    </CardContent> */}
      {/* <CardFooter className="flex items-end justify-between pt-1">
      <div className="flex flex-wrap -space-x-1.5">
        <Avatar className="h-5 w-5 hover:z-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Avatar className="h-5 w-5 hover:z-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Avatar className="h-5 w-5 hover:z-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="dark:text-navy-300 flex items-center space-x-2 text-xs text-slate-400">
        <div className="flex items-center space-x-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span>3</span>
        </div>
        <div className="flex items-center space-x-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span>1</span>
        </div>
      </div>
    </CardFooter> */}
    </Card>;
  }
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p className=" text-lg">{data?.title}</p>

            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      setOpen(false);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Assign to...
                    </DropdownMenuSubTrigger>
                    <AssignmentSubmenu
                      columns={columns}
                      listId={listId}
                      cardId={cardId}
                      setOpen={setOpen}
                      open={open}
                      cardData={data}
                      cardRefetch={cardRefetch}
                    />
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Set due date...
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Tags className="mr-2 h-4 w-4" />
                      Move to
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0">
                      <Command>
                        {/* <CommandInput placeholder="Filter label..." autoFocus={true} /> */}
                        <CommandList>
                          {/* <CommandEmpty>No label found.</CommandEmpty> */}
                          <CommandGroup>
                            {columns.map((col) => (
                              <CommandItem
                                key={col.id}
                                onSelect={(value) => {
                                  console.log(value);
                                  setOpen(false);
                                }}
                              >
                                {col.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => deleteTask.mutate()} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">lllhlhhlkhkklj</div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-wrap space-x-1">
                <Badge className=" space-x-1 px-1.5 py-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span> Sep 12</span>
                </Badge>
                <Badge className="px-1.5 py-1">Update</Badge>
                <Badge className=" space-x-1 px-1.5 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>4/5</span>
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-between pt-1">
          <div className="flex flex-wrap -space-x-1.5">
            {data?.members?.length != 0 &&
              data?.members?.map((member) => (
                <Avatar className="h-6 w-6 hover:z-10 hover:bg-primary">
                  {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                  <AvatarFallback className="text-xs hover:bg-primary hover:text-primary-foreground">
                    {member.user.first_name[0]}
                    {member.user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
          </div>
          <div className="dark:text-navy-300 flex items-center space-x-2 text-xs text-slate-400">
            <div className="flex items-center space-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span>3</span>
            </div>
            <div className="flex items-center space-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span>1</span>
            </div>
          </div>
        </CardFooter>
      </Card>
      {data !== undefined && <CardDetail setModalOpen={setModalOpen} modalOpen={modalOpen} data={data} />}
    </>
  );
};
type openState = {
  open: boolean;
  setOpen: any;
  cardData: CardType | undefined;
  cardRefetch: any;
};
type AssignmentSubmenuProps = CardProps & openState;
export const AssignmentSubmenu = ({
  columns,
  listId,
  cardId,
  open,
  setOpen,
  cardData,
  cardRefetch,
}: AssignmentSubmenuProps) => {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const { data: membersData } = useMembers(parseInt(boardId ? boardId : ''));

  console.log('===================');
  console.log('memebersdfsdfs');
  console.log(membersData);
  let authTokens = useContext(AuthContext)?.authTokens;
  // const [query, setQuery] = useState('');
  // // const deferredQuery = useDeferredValue(query);
  // const deferredQuery = query;

  // const [users, setUsers] = useState<User[] | []>([]);

  // const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // const allUsers = useRef<User[] | []>([]);
  // function inviteMembers() {
  //   const fetches = selectedUsers
  //     .map((item) => {
  //       return { member: item.id, board: boardId };
  //     })
  //     .map((item) => {
  //       return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/invite/`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `JWT ` + authTokens.access,
  //         },
  //         body: JSON.stringify(item),
  //       });
  //     });
  //   Promise.allSettled(fetches).then((results) =>
  //     results.forEach((item) => {
  //       setOpen(false);
  //       setSelectedUsers([]);
  //     })
  //   );
  // }

  // console.log("-------------")
  // console.log(allUsers.current)
  // console.log(users)
  // console.log(JSON.stringify(selectedUsers.map(user => user.email), null, 2))
  // console.log("type: " + deferredQuery)
  // console.log(users.length !== 0)
  // useEffect(() => {
  //   // console.log("------")
  //   // console.log("out: " + deferredQuery)
  //   if (deferredQuery !== '') {
  //     // console.log("in: " + deferredQuery)
  //     axios
  //       .get(
  //         `https://amirmohammadkomijani.pythonanywhere.com/tascrum/user-search/?board=${boardId}&search=${deferredQuery}`,
  //         {
  //           headers: {
  //             Authorization: `JWT ${authTokens.access}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         const fetchedUsers: User[] = res.data;
  //         setUsers(fetchedUsers);
  //         allUsers.current = _.unionBy(allUsers.current, fetchedUsers, 'id');
  //         // console.log("fetched")
  //       });
  //   } else {
  //     setUsers(selectedUsers);
  //   }
  // }, [deferredQuery]);

  // useEffect(() => {
  //   if (deferredQuery === '' && selectedUsers.length === 0) {
  //     setUsers([]);
  //   }
  // }, [deferredQuery, selectedUsers]);
  const createAssignee = useMutation({
    mutationFn: (formData: any) => {
      console.log(formData);
      return fetch('https://amirmohammadkomijani.pythonanywhere.com/tascrum/assign/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
        body: JSON.stringify(formData),
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // on success
    },
    onSettled: (data, error, variables, context) => {
      cardRefetch();
    },
  });
  const deleteAssignee = useMutation({
    mutationFn: (formData: any) => {
      console.log(formData);
      return fetch('https://amirmohammadkomijani.pythonanywhere.com/tascrum/assign/', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
        body: JSON.stringify(formData),
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // on success
    },
    onSettled: (data, error, variables, context) => {
      cardRefetch();
    },
  });
  return (
    <DropdownMenuSubContent className="p-0">
      <Command>
        <CommandInput placeholder="Search for user" autoFocus={true} />
        <CommandList>
          <CommandEmpty>No label found.</CommandEmpty>
          <CommandGroup>
            {membersData?.members?.map((member) => (
              <CommandItem
                key={member.id}
                className="flex items-center px-2"
                onSelect={() => {
                  if (cardData) {
                    if (cardData?.members !== undefined) {
                      if (cardData?.members?.filter((item) => item.id === member.id).length > 0) {
                        deleteAssignee.mutate({ member: member.id, card: cardId });
                      } else {
                        createAssignee.mutate({ member: member.id, card: cardId });
                      }
                    }
                  }
                  setOpen(false);
                  // if (selectedUsers.includes(user)) {
                  // if (selectedUsers.filter((e: User) => e.email === user.email).length > 0) {
                  //   return setSelectedUsers(
                  //     selectedUsers.filter(
                  //       (selectedUser) => selectedUser.email !== user.email
                  //     )
                  //   )
                  // }
                  // const moteghayer = _.intersectionBy(allUsers.current, [...selectedUsers, user], "id")
                  // // console.log(moteghayer)
                  // return setSelectedUsers(
                  //   // [...allUsers.current].filter((u) =>
                  //   //   [...selectedUsers, user].filter((item) => u.email == item.email)
                  //   // )
                  //   moteghayer
                  // )
                }}
              >
                <Avatar>
                  {/* <AvatarImage src={user.member[0].profimage} alt="Image" /> */}
                  <AvatarFallback>
                    {member.user.first_name[0]}
                    {member.user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 mr-3">
                  <p className="text-sm font-medium leading-none">
                    {member.user.first_name} {member.user.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{member.user.email}</p>
                </div>
                {cardData?.members?.filter((item) => item.id === member.id)?.length != 0 ? (
                  <Check className="ml-auto flex h-5 w-5 text-primary" />
                ) : null}
              </CommandItem>
            ))}

            {/* {columns.map((col) => (
              <CommandItem
                key={col.id}
                onSelect={(value) => {
                  console.log(value);
                  setOpen(false);
                }}
              >
                {col.title}
              </CommandItem>
            ))} */}
          </CommandGroup>
        </CommandList>
      </Command>
    </DropdownMenuSubContent>
  );
};

// {/* <Dialog open={open} onOpenChange={setOpen}>
// <DialogTrigger asChild>
//   <Button variant="outline" className="hidden group-hover:flex  h-7 w-7 p-0">
//     <Plus className="w-5 h-5" />
//   </Button>
// </DialogTrigger>
// <DialogContent className="gap-0 p-0 outline-none">
//   <DialogHeader className="px-4 pb-4 pt-5">
//     <DialogTitle>
//       Invite to Workspace
//     </DialogTitle>
//     <DialogDescription>
//       Invite a user to this Board.
//     </DialogDescription>
//   </DialogHeader>
//   {/* <Input
//     placeholder="Email address or name"
//   />
//   <div className="mt-3 flex justify-between items-center">
//     <span>Invite someone to this Workspace with a link:</span>
//     <Button variant="secondary" className="flex justify-start">
//       <Link className="w-4 h-4 mr-2" />
//       <span>Create link</span>
//     </Button>
//   </div> */}
//   <Command shouldFilter={false} className="overflow-hidden rounded-t-none border-t">
//     <CommandInput placeholder="Search user..." value={query} onValueChange={(str) => { setQuery(str) }} />
//     <CommandList>
//       <CommandEmpty>No users found.</CommandEmpty>
//       {users.length !== 0 && <CommandGroup className="p-2">
//         {users.length !== 0 && users.map((user) => (
//           <CommandItem
//             key={user.email}
//             className="flex items-center px-2"
//             onSelect={() => {
//               // if (selectedUsers.includes(user)) {
//               if (selectedUsers.filter((e: User) => e.email === user.email).length > 0) {
//                 return setSelectedUsers(
//                   selectedUsers.filter(
//                     (selectedUser) => selectedUser.email !== user.email
//                   )
//                 )
//               }

//               const moteghayer = _.intersectionBy(allUsers.current, [...selectedUsers, user], "id")
//               // console.log(moteghayer)
//               return setSelectedUsers(
//                 // [...allUsers.current].filter((u) =>
//                 //   [...selectedUsers, user].filter((item) => u.email == item.email)
//                 // )
//                 moteghayer
//               )
//             }}
//           >
//             <Avatar>
//               <AvatarImage src={user.member[0].profimage} alt="Image" />
//               <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
//             </Avatar>
//             <div className="ml-2">
//               <p className="text-sm font-medium leading-none">
//                 {user.first_name} {user.last_name}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 {user.email}
//               </p>
//             </div>
//             {selectedUsers.filter(item => item.email === user.email).length > 0 ? (
//               <Check className="ml-auto flex h-5 w-5 text-primary" />
//             ) : null}
//           </CommandItem>
//         ))}
//       </CommandGroup>}
//     </CommandList>
//   </Command>
//   <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
//     {selectedUsers.length > 0 ? (
//       <div className="flex -space-x-2 overflow-hidden">
//         {/* <p>{JSON.stringify(selectedUsers.map(user => user.email), null, 2)}</p> */}
//         {selectedUsers.map((user) => (
//           <Avatar
//             key={user.email}
//             className="inline-block border-2 border-background"
//           >
//             <AvatarImage src={user.member[0].profimage} />
//             <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
//           </Avatar>
//         ))}
//       </div>
//     ) : (
//       <p className="text-sm text-muted-foreground">
//         Select users to add to this Board.
//       </p>
//     )}
//     <Button
//       disabled={selectedUsers.length < 1 || addMemberButtonLoading}
//       onClick={() => {
//         inviteMembers();
//       }}

//     >
//       {addMemberButtonLoading && (<p>Loading...</p>)}
//       {!addMemberButtonLoading && (<p>Add Members</p>)}
//     </Button>
//   </DialogFooter>
// </DialogContent>
// </Dialog> */}
