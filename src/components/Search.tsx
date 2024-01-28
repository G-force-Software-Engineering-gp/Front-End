import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import BoardCard from '@/pages/HomePage/components/BoardCard';
import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import React, { useContext, useState } from 'react';
import BoardCardSearch from './BoardCardSearch';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [boards, setboards] = useState([]);
  const [open, setOpen] = useState(false);
  let authTokens = useContext(AuthContext)?.authTokens;
  console.log(searchValue);
  const gettingData = async () => {
    const { data } = await axios
      .get(BaseURL + `tascrum/board-search/?search=${searchValue}`, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      })
      .then((response) => response);
    setboards(data);
  };
  console.log(boards);
  const handleSearch = async (event: any) => {
    event.preventDefault();
    try {
      gettingData();
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SearchIcon
            onClick={() => setOpen(true)}
            data-testid="user-icon"
            className="h-9 w-9 cursor-pointer rounded-md px-[6px] transition-colors hover:bg-accent"
          />
          {/* <Input type="text" placeholder="Search" /> */}
        </DialogTrigger>
        <DialogContent className="block h-[80vh] max-w-[80%]">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>Enter name of the board you want</DialogDescription>
          </DialogHeader>
          <div className="mt-2 w-[100%]">
            <form onSubmit={handleSearch} className=" grid gap-4 sm:grid-cols-12">
              <Input
                // id="name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="sm:col-span-10"
                placeholder="Write title of the board"
              />
              <Button type="submit" className=" sm:col-span-2">
                Search
              </Button>
            </form>
          </div>
          <div
            className="mb-8 mt-4 grid sm:auto-rows-fr gap-4 sm:gap-2 sm:grid-cols-2 md:grid-cols-4 h-[48vh]"
            style={{ overflowY: 'auto' }}
          >
            {boards ? (
              boards?.map((item1: { id: number; title: string; backgroundimage: any; has_star: boolean }) => (
                <div
                  onClick={() => {
                    setOpen(false);
                    setSearchValue('');
                    setboards([]);
                  }}
                >
                  <BoardCardSearch
                    key={item1.id} // Make sure to include a key prop if the list is dynamic
                    id={item1.id}
                    title={item1.title}
                    backgroundImage={item1.backgroundimage}
                    has_star={item1.has_star}
                  />
                </div>
              ))
            ) : (
              <div>Nothing Found</div>
            )}
          </div>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
