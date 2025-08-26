'use client';

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Droplet } from 'lucide-react';
import Image from 'next/image';

const StatRow = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <div className="flex justify-between items-center py-2 text-sm">
    <p className="text-gray-500">{label}</p>
    <div className="text-right">
      <p className="font-bold text-gray-800">{value}</p>
      {unit && <p className="text-xs text-gray-500 -mt-1">{unit}</p>}
    </div>
  </div>
);

export default function WaterPage() {
  const waterLevel = 75;

  return (
    <div className="relative min-h-screen bg-gray-100">
      <AppLayout title="Nivel de Agua">
        <div className="p-4 flex flex-col items-center gap-6">
          {/* Plant Image Card */}
          <Card className="bg-white rounded-3xl p-4 shadow-lg">
            <Image
              src="https://i.postimg.cc/MXx0R9LH/plant.png"
              alt="Plant"
              width={200}
              height={200}
              className="object-contain"
              data-ai-hint="pink flower"
            />
          </Card>

          {/* Water Level Section */}
          <div className="w-full max-w-sm text-center mt-2">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold text-gray-800">Nivel de Agua</h2>
              <Droplet className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-5xl font-bold text-green-600 mt-1">
              {waterLevel}%
            </p>
          </div>

          {/* Stats Section */}
          <div className="w-full max-w-sm mt-4 px-2">
            <Separator className="bg-gray-200" />
            <StatRow label="Húmedad" value="60%" />
            <Separator className="bg-gray-200" />
            <StatRow label="Último riego" value="2" unit="días" />
            <Separator className="bg-gray-200" />
            <StatRow label="Temperatura" value="22°C" />
            <Separator className="bg-gray-200" />
          </div>

          {/* Visualization Section */}
          <div className="w-full max-w-sm mt-4 mb-12">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Visualización</h3>
            <p className="text-sm text-gray-500 mb-3">
              El nivel de agua es óptimo
            </p>
            <div className="w-full h-4 rounded-full bg-gray-200 relative overflow-hidden">
               <div
                className="absolute h-full rounded-full bg-green-500"
                style={{ width: `${waterLevel}%` }}
              />
            </div>
          </div>
        </div>
      </AppLayout>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full h-24">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#16a34a"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,192C672,203,768,213,864,202.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
