import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AuthContext from '@/contexts/AuthContext';
import { ClipboardList, Mail } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../Board';
import { useStarred } from './hooks/useStarred';

interface RootObject {
  id: number;
  members: Member[];
}

interface Member {
  id: number;
  profimage: string;
  user: User;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

const WorkSpaceMembers = () => {
  let authTokens = useContext(AuthContext)?.authTokens;
  const { BoardId } = useParams();

  const [workspaceMembers, setWorkspaceMembers] = useState<Member[]>();
  useEffect(() => {
    const fetchWorkspaceUsers = async () => {
      const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/workspaces/1/members/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${authTokens.access}`,
        },
      });
      const data = await response.json();
      setWorkspaceMembers(data[0]?.members);
    };
    fetchWorkspaceUsers();
  }, [BoardId]);
  useEffect(() => {
    console.log(workspaceMembers);
  }, []);

  return (
    <div className="mb-8 mt-4 grid auto-rows-fr gap-2 sm:grid-cols-2 md:grid-cols-3">
      {workspaceMembers?.map((member) => (
        <div className="space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between">
                <div className="flex flex-row">
                  <Avatar className="mr-3 h-12 w-12 rounded-full">
                    <AvatarImage className="rounded-full" alt="Avatar" src={member?.profimage} />
                    <AvatarFallback className="rounded-full">{member ? member.user.first_name[0] : ''}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xl">{member?.user.first_name}</span>
                    <span className="text-sm font-thin">{member?.user.username}</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardTitle className="mx-9">
              <div className="mb-2 flex flex-col">
                <div className="mb-1 flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="text-base">Email</span>
                </div>
                <p className="rounded p-1 pl-2 text-sm font-thin outline outline-1">{member?.user.email}</p>
              </div>
            </CardTitle>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default WorkSpaceMembers;
