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
import AuthContext from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { object } from 'zod';
import { useBurnDown } from '../hooks/useBurnDown';
import { useMembers } from '../hooks/useMembers';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
interface LooseObject {
  [key: string]: any;
}

function BurnDownChart() {
  const { boardId } = useParams();
  console.log(boardId);
  let authTokens = useContext(AuthContext)?.authTokens;
  const gettingColumns1 = async () => {
    const { data } = await axios
      .get(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/burndown-chart/${boardId}`, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      })
      .then((response) => response);
    console.log(data);
  };
  const gettingData = async () => {
    const { data } = await axios
      .get(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/burndown-chart/${boardId}`, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      })
      .then((response) => response);
    console.log(data);
  };

  type Person = Record<string, number>;
  const colQuery = useBurnDown(boardId);
  const [users, setusers] = useState<string[]>(['brd']);
  const { data: membersData, isLoading } = useMembers(parseInt(boardId ? boardId : ''));
  useEffect(() => {
    if (membersData) {
      setusers(membersData?.members.map((member: { user: { username: string } }) => member.user.username));
    }
  }, [membersData]);

  console.log(colQuery);
  // const gettingColumns = async () => {
  //   try {
  //     const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/board-member/1`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `JWT ` + authTokens.access,
  //       },
  //     });
  //     const data = await response.json();
  //     console.log('Before', users);
  //     setusers(data?.members.map((member: { user: { username: string } }) => member.user.username));
  //     console.log('After', users);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   gettingColumns();
  // }, [boardId]);
  // useEffect(() => {
  //   gettingColumns();
  // }, []);
  // useEffect(() => {
  //   // Check if colQuery.data.members exists and is an array
  //   if (colQuery.data?.members && Array.isArray(colQuery.data.members)) {
  //     // Extract usernames and set the state
  //     const usernames = colQuery.data.members.map((member: { user: { username: string } }) => member.user.username);
  //     setusers(usernames);
  //   } else {
  //     console.log('API response or members array is missing or not an array:', colQuery.data);
  //   }
  // }, []);

  const [defaultData, setDefaultData] = useState<any[]>(() => {
    let initialData: any[] = [];
    for (let i = 0; i < 3; i++) {
      var obj: LooseObject = {};
      obj['date'] = '2023/5/6';
      for (let j = 0; j < users?.length; j++) {
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
    for (let j = 0; j < users?.length; j++) {
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
  }, [users]);

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
