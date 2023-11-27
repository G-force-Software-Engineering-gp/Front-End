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
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowData,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const types = ['Estimate1', 'Done1', 'Estimate2', 'Done2', 'Estimate3', 'Done3'];
type Person = {
  // Should be converted to a map
  Estimate1: number;
  Done1: number;
  Estimate2: number;
  Done2: number;
  Estimate3: number;
  Done3: number;
};
// type Person = {
//   [K in typeof types[number]]: number;
// };

const defaultData: Person[] = [
  // should be a map
  {
    Estimate1: 10,
    Done1: 12,
    Estimate2: 5,
    Done2: 6,
    Estimate3: 5,
    Done3: 6,
  },
  {
    Estimate1: 8,
    Done1: 6,
    Estimate2: 5,
    Done2: 6,
    Estimate3: 5,
    Done3: 6,
  },
  {
    Estimate1: 4,
    Done1: 7,
    Estimate2: 5,
    Done2: 6,
    Estimate3: 5,
    Done3: 6,
  },
];

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

    return <Input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />;
  },
};

function BurnDownChart() {
  // Should convert columns to a map
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Matin',
        // footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'Estimate1',
            header: 'Estimate',
            id: 'Estimate1',
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.Done1,
            id: 'Done1',
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: 'Mohmamad',
        // footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'Estimate2',
            id: 'Estimate2',
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.Done2,
            id: 'Done2',
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: 'Aryan',
        // footer: (props) => props.column.id,
        columns: [
          {
            accessorFn: (row) => row.Estimate3,
            id: 'Estimate3',
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.Done3,
            id: 'Done3',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState([...defaultData]);
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
  console.log(table.getFooterGroups()[0].headers);

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
