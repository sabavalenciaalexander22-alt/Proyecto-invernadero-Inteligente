'use client';

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Droplet, Leaf, Smile } from 'lucide-react';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

const humidityLevel = 65;
const chartData = [{ name: 'Humedad', value: humidityLevel, fill: '#00BCD4' }];

const InfoCard = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <Card className="bg-gray-100 dark:bg-gray-800 border-0 shadow-none">
    <CardContent className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">
        {text}
      </p>
    </CardContent>
  </Card>
);

export default function HumidityPage() {
  return (
    <AppLayout title="Nivel de Húmedad">
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="75%"
              outerRadius="90%"
              data={chartData}
              startAngle={90}
              endAngle={-270}
              barSize={20}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: '#E0E0E0' }}
                dataKey="value"
                cornerRadius={10}
              />
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-cyan-500 text-5xl font-bold"
              >
                {`${humidityLevel}%`}
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-sm"
              >
                Húmedad óptima
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col items-center text-center -mt-4">
          <div className="flex items-center gap-2">
            <Droplet className="w-6 h-6 text-cyan-500" />
            <p className="text-xl font-bold">Óptimo</p>
          </div>
          <p className="text-muted-foreground">óptimo: 60% - 100%</p>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mt-4">
          <InfoCard
            icon={Leaf}
            text="La planta está saludable"
          />
          <InfoCard
            icon={Droplet}
            text="No regar todavía"
          />
          <InfoCard
            icon={Smile}
            text="Estado bueno"
          />
        </div>
      </div>
    </AppLayout>
  );
}
