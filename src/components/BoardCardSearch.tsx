import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { Sparkles, StarIcon, StarOff } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface BoardCardProps {
  id: number;
  title: string;
  backgroundImage: any;
  has_star: boolean;
}

const BoardCardSearch: React.FC<BoardCardProps> = ({ id, title, backgroundImage, has_star }) => {
  const navigate = useNavigate();
  const [Star, setStar] = useState(has_star);
  let authTokens = useContext(AuthContext)?.authTokens;
  const SetStarOrNot = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    const data = await fetch(BaseURL + `tascrum/star/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${authTokens?.access}`,
      },
      body: JSON.stringify({
        has_star: !Star,
        id: id,
      }),
    }).then((response) => response);
    console.log(data);
    setStar(!Star);
    if (data.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Status Changed successfully',
        timer: 3000,
      });
      setInterval(() => {
        navigate(0);
      }, 2000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
        timer: 3000,
      });
      // setInterval(() => {
      //   navigate(0);
      // }, 2000);
    }
  };
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
            {Star ? (
              <Sparkles
                className="h-8 w-8"
                strokeWidth={3}
                color="gold"
                onClick={(e) => SetStarOrNot(e)}
                data-testid="star-icon1"
              />
            ) : (
              <StarIcon
                className="h-8 w-8"
                strokeWidth={3}
                color="white"
                onClick={(e) => SetStarOrNot(e)}
                data-testid="star-icon2"
              />
            )}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BoardCardSearch;
