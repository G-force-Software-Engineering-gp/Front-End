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
  type Person = Record<string, number>;
  const [users, setusers] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  const { data: membersData, isLoading } = useMembers(parseInt(boardId ? boardId : ''));
  const { data: BurnDownData, isLoading: loadingBurndown } = useBurnDown(boardId);
  // console.log(BurnDownData);
  // const colQuery = useBurnDown(boardId);
  useEffect(() => {
    if (membersData) {
      console.log(membersData.members);
      // setusers(membersData?.members.map((member: { user: { username: string } }) => member.user.username));
      let members: any[] = [];
      for (let i = 0; i < membersData.members.length; i++) {
        members.push([membersData?.members[i].id, membersData?.members[i].user.username]);
      }
      setusers(members);
    }
    if (BurnDownData) {
      let initialData: any[] = [];
      // console.log(BurnDownData[0]?.data[0]);
      for (let i = 0; i < BurnDownData.length; i++) {
        var obj: LooseObject = {};
        obj['date'] = BurnDownData[i].date;
        for (let j = 0; j < BurnDownData[i].data.length; j++) {
          obj[`estimate${BurnDownData[i]?.data[j].username}`] = BurnDownData[i]?.data[j].estimate;
          obj[`done${BurnDownData[i]?.data[j].username}`] = BurnDownData[i]?.data[j].done;
        }
        initialData.push(obj);
      }
      setData(initialData);
      // setData(defaultData);
    }
  }, [membersData, BurnDownData]);

  const columns = React.useMemo<ColumnDef<Person>[]>(() => {
    let cols = [];
    cols.push({
      header: `Date`,
      accessorKey: `date`,
      id: `date`,
    });
    for (let j = 0; j < users?.length; j++) {
      cols.push({
        header: `${users[j][1]}`,
        // footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: `estimate${users[j][1]}`,
            header: 'Estimate',
            id: `e${users[j][0]}`,
            footer: 'Total Estimate',
          },
          {
            accessorKey: `done${users[j][1]}`,
            header: 'Done',
            id: `d${users[j][0]}`,
            footer: 'Total Done',
          },
        ],
      });
    }
    return cols;
  }, [users]);
  let authTokens = useContext(AuthContext)?.authTokens;
  // console.log(authTokens);
  const ChangeDone = async (boardId: string | undefined, done: string, member: string, date: string) => {
    const data = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/burndown-chart/${boardId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ` + authTokens.access,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        board: boardId ? parseInt(boardId) : 1,
        done: parseFloat(done),
        member: parseInt(member),
        date: date,
      }),
    });
    console.log(data);
  };
  const ChangeEstimate = async (boardId: string | undefined, estimate: string, member: string, date: string) => {
    const data = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/burndown-chart/${boardId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ` + authTokens.access,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        board: boardId ? parseInt(boardId) : 1,
        estimate: parseFloat(estimate),
        member: parseInt(member),
        date: date,
      }),
    });
    console.log(data);
  };

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
        if (e.target.value !== value) {
          const username = id.substring(1);
          const state =
            id[0] === 'd'
              ? ChangeDone(boardId, e.target.value, username, data[index]?.date)
              : ChangeEstimate(boardId, e.target.value, username, data[index]?.date);
          console.log('Row: ', data[index]?.date.replace(/-/g, '/'));
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

  // const [data, setData] = React.useState([...defaultData]);
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
