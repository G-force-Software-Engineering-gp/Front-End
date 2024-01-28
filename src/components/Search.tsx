import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
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

  const handleSearch = async (event: any) => {
    event.preventDefault();

    // Perform your API call here using the value of searchValue
    try {
      // Example API call using fetch
    //   const response = await fetch(`your_api_endpoint?search=${searchValue}`);
    //   const data = await response.json();

      // Handle the API response data as needed
      console.log('API Response:');
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <SearchIcon
            data-testid="user-icon"
            className="h-9 w-9 cursor-pointer rounded-md px-[6px] transition-colors hover:bg-accent"
          />
          {/* <Input type="text" placeholder="Search" /> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>Enter name of the board you want</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <form onSubmit={handleSearch}>
                <Input
                  id="name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="col-span-3"
                />
                <Button type="submit">Search</Button>
              </form>
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
