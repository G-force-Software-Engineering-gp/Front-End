import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BoardCardProps {
  id: number;
  title: string;
  backgroundImage: any;
}

const BoardCard: React.FC<BoardCardProps> = ({ id, title, backgroundImage }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
      className=" h-36 cursor-pointer bg-slate-200 dark:bg-slate-900"
      onClick={() => navigate(`/board/${id}`)}
    >
      <CardHeader className="flex justify-between gap-4 space-y-0 p-4">
        <div className="flex justify-between">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
          </div>
          <Button variant="ghost">
            <StarIcon className="h-6 w-6" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BoardCard;
