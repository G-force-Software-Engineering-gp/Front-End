import { useTheme } from '@/components/theme-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
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
import { ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useBurnDown } from '../hooks/useBurnDown';
import useBurnDownChartData from '../hooks/useBurnDownChartData';
import { useBurnDownFooter } from '../hooks/useBurnDownFooter';
import { useMembers } from '../hooks/useMembers';
import CreateBurnDown from './CreateBurnDown';
import { themes } from './Themes';

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
  const [footer, setFooter] = useState<{
    estimate_total_sum: number;
    done_total_sum: number;
    members: { estimate_sum: number; out_of_estimate_sum: number; done_sum: number }[];
  }>();
  const { data: membersData, isLoading: loadingMembers } = useMembers(parseInt(boardId ? boardId : ''));
  const { data: BurnDownData, isLoading: loadingBurndown, refetch: refetchBurnDown } = useBurnDown(boardId);
  const {
    data: BDFooter,
    isLoading: loadingBurndownFooter,
    refetch: refetchBurnDownFooter,
  } = useBurnDownFooter(boardId);
  const {
    data: BurnDownDataChart,
    isLoading: loadingBurndownChart,
    refetch: refetchBurnDownChart,
  } = useBurnDownChartData(boardId);

  const { theme: mode } = useTheme();
  const config = {
    style: 'default',
    theme: 'zinc',
    radius: 0.5,
  };
  const theme = themes.find((theme) => theme.name === config.theme);
  const [data1, setdata1] = useState([{}]);
  useEffect(() => {
    if (membersData) {
      // console.log(membersData.members);
      let members: any[] = [];
      for (let i = 0; i < membersData.members?.length; i++) {
        members.push([membersData?.members[i].id, membersData?.members[i].user.username]);
      }
      setusers(members);
    }
    if (BurnDownData) {
      let initialData: any[] = [];
      // console.log(BurnDownData[0]?.data[0]);
      for (let i = 0; i < BurnDownData?.length; i++) {
        var obj: LooseObject = {};
        obj['date'] = BurnDownData[i].date;
        for (let j = 0; j < BurnDownData[i].data?.length; j++) {
          obj[`estimate${BurnDownData[i]?.data[j].username}`] = BurnDownData[i]?.data[j].estimate;
          obj[`done${BurnDownData[i]?.data[j].username}`] = BurnDownData[i]?.data[j].done;
          obj[`oof${BurnDownData[i]?.data[j].username}`] = BurnDownData[i]?.data[j].out_of_estimate;
        }
        obj['estimateT'] = BurnDownData[i]?.estimate_sum;
        obj['doneT'] = BurnDownData[i]?.done_sum;
        obj['estimateB'] = BurnDownData[i]?.est_rem;
        obj['doneB'] = BurnDownData[i]?.act_rem;
        initialData.push(obj);
      }
      setData(initialData);
      // setData(defaultData);
    }
    if (BDFooter) {
      setFooter(BDFooter);
    }
    if (BurnDownDataChart) {
      console.log(BurnDownDataChart);
      let est: any[] = [];
      for (let i = 0; i < BurnDownDataChart?.length; i++) {
        console.log(BurnDownDataChart[i]);
        est.push({
          date: BurnDownDataChart[i].date, // Adjust the date format as needed
          EstimateRem: BurnDownDataChart[i].est_rem,
          ActualRem: BurnDownDataChart[i].act_rem,
        });
      }
      setdata1(est);
    }
  }, [membersData, BurnDownData, BDFooter, BurnDownDataChart]);
  const columns = React.useMemo<ColumnDef<Person>[]>(() => {
    let cols = [];
    cols.push({
      header: `Date`,
      accessorKey: `date`,
      id: `date`,
      footer: 'Total',
    });
    // while (!users) {
    //   if (users == true) {
    //     break;
    //   }
    // }
    // while (!footer) {
    //   if (footer == true) {
    //     break;
    //   }
    // }
    for (let j = 0; j < users?.length; j++) {
      cols.push({
        header: `${users[j][1]}`,
        columns: [
          {
            accessorKey: `estimate${users[j][1]}`,
            header: 'Estimate',
            id: `e${users[j][0]}`,
            footer: footer?.members[j]?.estimate_sum,
          },
          {
            accessorKey: `done${users[j][1]}`,
            header: 'Done',
            id: `d${users[j][0]}`,
            footer: footer?.members[j]?.done_sum,
          },
          {
            accessorKey: `oof${users[j][1]}`,
            header: 'Out Of Estimate',
            id: `o${users[j][0]}`,
            footer: footer?.members[j]?.out_of_estimate_sum,
          },
        ],
      });
    }
    cols.push({
      header: 'Total',
      // footer: (props) => props.column.id,
      columns: [
        {
          accessorKey: `estimateT`,
          header: 'Estimate',
          id: `totalE`,
          footer: footer?.estimate_total_sum,
        },
        {
          accessorKey: `doneT`,
          header: 'Done',
          id: `totalD`,
          footer: footer?.done_total_sum,
        },
      ],
    });

    cols.push({
      header: 'BurnDown',
      // footer: (props) => props.column.id,
      columns: [
        {
          accessorKey: `estimateB`,
          header: 'Est Rem',
          id: `burnE`,
          // footer: 'Total Estimate',
        },
        {
          accessorKey: `doneB`,
          header: 'Act Rem',
          id: `burnD`,
          // footer: 'Total Done',
        },
      ],
    });
    return cols;
  }, [users, footer]);

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
    refetchBurnDown();
    refetchBurnDownFooter();
    refetchBurnDownChart();
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
    refetchBurnDown();
    refetchBurnDownFooter();
    refetchBurnDownChart();
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
        if (e.target.value !== value && e.target.value !== '') {
          const username = id.substring(1);
          // const state = null;
          if (id[0] === 'd') ChangeDone(boardId, e.target.value, username, data[index]?.date);
          if (id[0] === 'e') ChangeEstimate(boardId, e.target.value, username, data[index]?.date);
          console.log('Row: ', data[index]?.date.replace(/-/g, '/'));
          console.log('New value: ', e.target.value);
          console.log('User: ', username);
          // console.log('State: ', state);
        }
        setValue(e.target.value);
      };

      return id === 'date' ? (
        <div>{value as string}</div>
      ) : id[0] === 'o' ? (
        <Input disabled value={value as string} onChange={handleChange} onBlur={onBlur} />
      ) : id[0] === 't' ? (
        <Input disabled value={value as string} onChange={handleChange} onBlur={onBlur} />
      ) : id[0] === 'b' ? (
        <Input disabled value={value as string} onChange={handleChange} onBlur={onBlur} />
      ) : (
        <Input value={value as string} onChange={handleChange} onBlur={onBlur} />
      );
    },
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
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
    <div className="m-auto p-2" data-testid="burnDownChart">
      <CreateBurnDown />
      <div className="h-2" />
      {loadingMembers || loadingBurndown || loadingBurndownFooter ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">Loading the table</div>
        </div>
      ) : (
        <T1 className="" >
          <TableHeader>
            {/* Header */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className=" text-md font-bold">
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
                <TableCell
                  key={header.id}
                  colSpan={header.colSpan}
                  className=" border-r-2 pl-6 text-left text-base font-bold"
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </T1>
      )}{' '}
      <div className="h-2" />
      {loadingBurndownChart ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">Loading the chart</div>
        </div>
      ) : (
        <div className="mb-10">
          <Card className=" m-auto  mt-10 w-[80vw]">
            <CardHeader>
              <CardTitle>BurnDownChart</CardTitle>
              <CardDescription>Your working minutes are ahead of where you normally are.</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-[60vh]">
                <ResponsiveContainer width="100%" aspect={3}>
                  <LineChart
                    data={data1}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 50,
                    }}
                  >
                    <XAxis
                      dataKey="date" // Assuming "date" is the key for your x-axis data
                      type="category" // Specify "category" type for string-based x-axis data
                      label={{ position: 'bottom' }}
                      tick={
                        {
                          angle: -45,
                          textAnchor: 'end',
                          interval: 0,
                        } as any
                      } // Explicitly define the type for the tick property
                    />
                    <YAxis label={{ value: 'Points', angle: -90, position: 'insideLeft' }} />

                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Estimate</span>
                                  <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Left</span>
                                  <span className="font-bold">{payload[1].value}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="EstimateRem"
                      activeDot={{
                        r: 8,
                        style: { fill: 'var(--theme-primary)', opacity: 0.25 },
                      }}
                      style={
                        {
                          stroke: 'var(--theme-primary)',
                          opacity: 0.25,
                          '--theme-primary': `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                        } as React.CSSProperties
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="ActualRem"
                      strokeWidth={3}
                      activeDot={{
                        r: 8,
                        style: { fill: 'var(--theme-primary)' },
                      }}
                      style={
                        {
                          stroke: 'var(--theme-primary)',
                          opacity: 1,
                          '--theme-primary': `hsl(${theme?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                        } as React.CSSProperties
                      }
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}{' '}
    </div>
  );
}

export default BurnDownChart;
