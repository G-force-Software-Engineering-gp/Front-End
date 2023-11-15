import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';

export function CheckListPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
        >
          <CheckSquare className="mb-1 mr-1 h-4 w-4" />
          Checklist
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-6">
          <div className="space-y-2">
            <h4 className="text-center text-xs font-bold leading-none">Add checkList</h4>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="width" className="text-xs font-bold leading-none">
              Title
            </Label>
            <Input id="CheckList" defaultValue="CheckList" className="col-span-2 h-8" />
            <Button className="mt-3 px-0">Add </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
