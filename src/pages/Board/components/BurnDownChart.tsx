import { table } from 'console';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';

type Person = {
  Estimate1: number;
  Done1: number;
  Estimate2: number;
  Done2: number;
};

const defaultData: Person[] = [
  {
    Estimate1: 10,
    Done1: 12,
    Estimate2: 5,
    Done2: 6,
  },
  {
    Estimate1: 8,
    Done1: 6,
    Estimate2: 5,
    Done2: 6,
  },
  {
    Estimate1: 4,
    Done1: 7,
    Estimate2: 5,
    Done2: 6,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.group({
    id: 'Matin',
    header: () => <span>Matin</span>,
    columns: [
      columnHelper.accessor('Estimate1', {
        header: 'Estimate',
        cell: (info) => info.getValue(),
        // footer: (props) => props.column.id,
      }),
      columnHelper.accessor('Done1', {
        header: 'Done',
        cell: (info) => info.getValue(),
        // footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    id: 'Mohammad',
    header: () => <span>Mohammad</span>,
    columns: [
      columnHelper.accessor('Estimate2', {
        header: 'Estimate',
        cell: (info) => info.getValue(),
        // footer: (props) => props.column.id,
      }),
      columnHelper.accessor('Done2', {
        header: 'Done',
        cell: (info) => info.getValue(),
        // footer: (props) => props.column.id,
      }),
    ],
  }),
];

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const DefaultColumn: Partial<ColumnDef<Person>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />;
  },
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

const BurnDownChart = () => {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const table = useReactTable({
    data,
    columns,
    defaultColumn: DefaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
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
    debugTable: true,
  });
  return (
    <div className="p-4">
      <table
        style={{
          border: '1px solid lightgray',
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={{
                    width: header.getSize(),
                    borderBottom: '1px solid lightgray',
                    borderRight: '1px solid lightgray',
                    padding: '2px 4px',
                  }}
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  style={{
                    borderBottom: '1px solid lightgray',
                    borderRight: '1px solid lightgray',
                    padding: '2px 4px',
                  }}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {/* {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  style={{
                    borderBottom: '1px solid lightgray',
                    borderRight: '1px solid lightgray',
                    padding: '2px 4px',
                  }}
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))} */}
        </tfoot>
      </table>
    </div>
  );
};

export default BurnDownChart;
