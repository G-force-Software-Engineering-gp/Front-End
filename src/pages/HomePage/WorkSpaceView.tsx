import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { useParams } from 'react-router';
import useWorkSpaceView from './hooks/useWorkSpaceView';

const WorkSpaceView = () => {
  const { workspaceId } = useParams();
  const { data: views } = useWorkSpaceView(parseInt(workspaceId ? workspaceId : ''));
  function formatDateString(dateString: string) {
    const originalDate = new Date(dateString);

    // Format the date using date-fns
    const formattedDate = originalDate.toLocaleString(); // Adjust based on your needs

    return formattedDate;
  }
  return (
    <div>
      <Table className=' mt-2'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead>List</TableHead>
            <TableHead>Labels</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {views?.map((item: { id: number; title: string; list: number; labels: []; members: []; duedate: string }) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="">{item.list}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {item.labels.map((i: { title: string; color: string }) => (
                    <Badge style={{ backgroundColor: i.color }}>{i.title}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="">
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
              </TableCell>
              <TableCell className="">{formatDateString(item.duedate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkSpaceView;
