//
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

// type Person = {
//   firstName: string;
//   lastName: string;
//   age: number;
//   visits: number;
//   progress: number;
//   status: 'relationship' | 'complicated' | 'single';
//   subRows?: Person[];
// };

// const range = (len: number) => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };

// const newPerson = (): Person => {
//   return {
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     age: faker.number.int(40),
//     visits: faker.number.int(1000),
//     progress: faker.number.int(100),
//     status: faker.helpers.shuffle<Person['status']>(['relationship', 'complicated', 'single'])[0]!,
//   };
// };

// function makeData(...lens: number[]) {
//   const makeDataLevel = (depth = 0): Person[] => {
//     const len = lens[depth]!;
//     return range(len).map((d): Person => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       };
//     });
//   };

//   return makeDataLevel();
// }

// declare module '@tanstack/react-table' {
//   interface TableMeta<TData extends RowData> {
//     updateData: (rowIndex: number, columnId: string, value: unknown) => void;
//   }
// }

// const defaultColumn: Partial<ColumnDef<Person>> = {
//   cell: ({ getValue, row: { index }, column: { id }, table }) => {
//     const initialValue = getValue();
//     const [value, setValue] = React.useState(initialValue);
//     const onBlur = () => {
//       table.options.meta?.updateData(index, id, value);
//     };
//     React.useEffect(() => {
//       setValue(initialValue);
//     }, [initialValue]);

//     return <input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />;
//   },
// };

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

const BasicTable = () => {
  // const columns = React.useMemo<ColumnDef<Person>[]>(
  //   () => [
  //     {
  //       header: 'Name',
  //       footer: (props) => props.column.id,
  //       columns: [
  //         {
  //           accessorKey: 'firstName',
  //           footer: (props) => props.column.id,
  //         },
  //         {
  //           accessorFn: (row) => row.lastName,
  //           id: 'lastName',
  //           header: () => <span>Last Name</span>,
  //           footer: (props) => props.column.id,
  //         },
  //       ],
  //     },
  //     {
  //       header: 'Info',
  //       footer: (props) => props.column.id,
  //       columns: [
  //         {
  //           accessorKey: 'age',
  //           header: () => 'Age',
  //           footer: (props) => props.column.id,
  //         },
  //         {
  //           header: 'More Info',
  //           columns: [
  //             {
  //               accessorKey: 'visits',
  //               header: () => <span>Visits</span>,
  //               footer: (props) => props.column.id,
  //             },
  //             {
  //               accessorKey: 'status',
  //               header: 'Status',
  //               footer: (props) => props.column.id,
  //             },
  //             {
  //               accessorKey: 'progress',
  //               header: 'Profile Progress',
  //               footer: (props) => props.column.id,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );

  // const [data, setData] = React.useState(() => makeData(1000));

  // const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   autoResetPageIndex,
  //   // Provide our updateData function to our table meta
  //   meta: {
  //     updateData: (rowIndex, columnId, value) => {
  //       // Skip page index reset until after next rerender
  //       skipAutoResetPageIndex();
  //       setData((old) =>
  //         old.map((row, index) => {
  //           if (index === rowIndex) {
  //             return {
  //               ...old[rowIndex]!,
  //               [columnId]: value,
  //             };
  //           }
  //           return row;
  //         })
  //       );
  //     },
  //   },
  //   debugTable: true,
  // });

  return (
    <div className="p-2">
      {/* <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};

export default BasicTable;
