import { useTheme } from '@/components/theme-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { themes } from './Themes';

const data = [
  {
    Estimate: 50,
    Left: 50,
  },
  {
    Estimate: 42,
    Left: 46,
  },
  {
    Estimate: 34,
    Left: 38,
  },
  {
    Estimate: 26,
    Left: 24,
  },
  {
    Estimate: 18,
    Left: 20,
  },
  {
    Estimate: 12,
    Left: 15,
  },
  {
    Estimate: 6,
    Left: 8,
  },
];

const BurnDownChart2 = () => {
  const { theme: mode } = useTheme();
  const config = {
    style: 'default',
    theme: 'zinc',
    radius: 0.5,
  };

  const theme = themes.find((theme) => theme.name === config.theme);
  return (
    <div>
      <Card className=" w-[80vw]  m-auto mt-10">
        <CardHeader>
          <CardTitle>BurnDownChart</CardTitle>
          <CardDescription>Your working minutes are ahead of where you normally are.</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[60vh]">
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
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
                  strokeWidth={2}
                  dataKey="Estimate"
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
                  dataKey="Left"
                  strokeWidth={2}
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
  );
};

export default BurnDownChart2;
