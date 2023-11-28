import { Input } from '@/components/ui/input';
import {
  Table as T1,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { object } from 'zod';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
interface LooseObject {
  [key: string]: any;
}

function BurnDownChart() {
  type Person = Record<string, number>;

  const [users, setusers] = useState(['Matin', 'Aryan', 'Mirza', 'Javad']);

  const [defaultData, setDefaultData] = useState<any[]>(() => {
    let initialData: any[] = [];
    for (let i = 0; i < 3; i++) {
      var obj: LooseObject = {};
      obj['date'] = '2023/5/6';
      for (let j = 0; j < users.length; j++) {
        obj[`estimate${users[j]}`] = 0;
        obj[`done${users[j]}`] = 0;
      }
      initialData.push(obj);
    }
    return initialData;
  });
  const columns = React.useMemo<ColumnDef<Person>[]>(() => {
    let cols = [];
    cols.push({
      header: `Date`,
      accessorKey: `date`,
      id: `date`,
    });
    for (let j = 0; j < users.length; j++) {
      cols.push({
        header: `${users[j]}`,
        // footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: `estimate${users[j]}`,
            header: 'Estimate',
            id: `e${users[j]}`,
            footer: 'Total Estimate',
          },
          {
            accessorKey: `done${users[j]}`,
            header: 'Done',
            id: `d${users[j]}`,
            footer: 'Total Done',
          },
        ],
      });
    }
    return cols;
  }, []);

  const defaultColumn: Partial<ColumnDef<Person>> = {
    cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      // Extracting the username from the column ID

      // Handle input change
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Log only if the input value changes
        if (e.target.value !== value) {
          const username = id.substring(1);
          const state = id[0] === 'd' ? 'done' : 'estimate';
          console.log('Row: ', defaultData[index]?.date);
          console.log('New value: ', e.target.value);
          console.log('User: ', username);
          console.log('State: ', state);
        }
        setValue(e.target.value);
      };

      return id === 'date' ? (
        <div>{value as string}</div>
      ) : (
        <Input value={value as string} onChange={handleChange} onBlur={onBlur} />
      );
    },
  };

  const [data, setData] = React.useState([...defaultData]);
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Here we should do the api
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });
  return (
    <div className="p-2">
      <div className="h-2" />
      <T1>
        <TableHeader>
          {/* Header */}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {/* Body */}
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell className=" bg-inherit" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        {/* Footer */}
        <TableFooter>
          <TableRow>
            {table.getFooterGroups()[0].headers.map((header) => (
              <TableCell key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
              </TableCell>
            ))}
          </TableRow>
          {/* {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))} */}
        </TableFooter>
      </T1>
      <div className="h-2" />
    </div>
  );
}

export default BurnDownChart;
