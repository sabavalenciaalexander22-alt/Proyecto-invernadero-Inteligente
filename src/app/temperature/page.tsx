'use client';
import AppLayout from '@/components/layout/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Thermometer } from 'lucide-react';

const temperature = 24;
const history = [
  { name: 'Hace 6h', temp: 22 },
  { name: 'Hace 5h', temp: 22.5 },
  { name: 'Hace 4h', temp: 23 },
  { name: 'Hace 3h', temp: 24 },
  { name: 'Hace 2h', temp: 24.5 },
  { name: 'Hace 1h', temp: 24.2 },
  { name: 'Ahora', temp: 24 },
];

export default function TemperaturePage() {
  return (
    <AppLayout title="Temperatura">
      <div className="grid grid-cols-1 gap-8 items-stretch animate-in fade-in zoom-in-95 duration-500">
        <Card className="w-full text-center flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl font-headline justify-center">
              <Thermometer className="w-8 h-8" />
              Temperatura Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-7xl font-bold text-primary">{temperature}°C</div>
            <CardDescription className="text-lg mt-2">
              Temperatura del ambiente.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="w-full flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">
              Historial de Temperatura
            </CardTitle>
            <CardDescription>Últimas 6 horas</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={history}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" unit="°C" />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
