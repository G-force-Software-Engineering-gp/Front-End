import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { BellIcon, CheckIcon } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router';
import useWorkSpaceHighlight from './hooks/useWorkSpaceHighlight';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

const WorkSpaceHighlights = () => {
  const { workspaceId } = useParams();
  const { data: highlights } = useWorkSpaceHighlight(parseInt(workspaceId ? workspaceId : ''));
  function formatDateString(dateString: string) {
    const originalDate = new Date(dateString);
    const formattedDate = originalDate.toLocaleString();
    return formattedDate;
  }
  console.log(highlights);
  return (
    <div className=" mt-2 grid grid-cols-2 gap-2">
      {highlights?.map((item: { title: string; duedate: string; storypoint: number; labels: []; members: [] }) => (
        <Card>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{formatDateString(item.duedate)}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div className="flex h-7 gap-1">
                {item.labels.map((i: { title: string; color: string }) => (
                  <Badge style={{ backgroundColor: i.color }}>{i.title}</Badge>
                ))}
              </div>
              <div className=" mt-4 h-14 grid grid-cols-2">
                {item.members.map((i: { user: { username: string; first_name: string; last_name: string } }) => (
                  <div className="mb-1 flex items-baseline">
                    <Avatar className=" mr-1 h-6 w-6 text-sm">
                      <AvatarImage src="https://github.com/sha11dcn.png" alt="@shadcn" />
                      <AvatarFallback>
                        {i.user.first_name[0].toLocaleUpperCase() + i.user.last_name[0].toLocaleUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p>{i.user.username}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Badge className="w-full p-2">
              <CheckIcon className="mr-2 h-4 w-4" /> Story Point: {item.storypoint}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default WorkSpaceHighlights;
