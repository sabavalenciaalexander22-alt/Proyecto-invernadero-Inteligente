'use client';

import Image from 'next/image';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const StatusMetric = ({
  icon: Icon,
  value,
  label,
  unit,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  unit: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-1 text-white">
      <Icon className="w-4 h-4" />
      <span className="text-xl font-bold">{value}{unit}</span>
    </div>
    <p className="text-xs text-white">{label}</p>
  </div>
);

const DetailItem = ({ label, value }: { label:string; value: string | number }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-bold text-gray-800">{value}</p>
  </div>
);

export default function StatusPage() {

  const sensorData = {
    temperature: 24,
    humidity: 65,
    waterLevel: 75,
  }

  return (
    <AppLayout title="Estado de la Planta">
      <div className="flex items-center justify-center p-4">
        <main className="relative z-10 w-full max-w-sm">
          <div className="w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <h1 className="text-center text-xl font-bold text-gray-800 mb-4">
                Estado Actual
              </h1>

              <div className="relative flex items-center">
                {/* Plant Image */}
                <div className="w-1/2 pr-2 z-10 -mb-10">
                  <Image
                    src="https://i.postimg.cc/NF8S5Tf6/Captura-de-pantalla-2025-07-28-193252-removebg-preview.png"
                    alt="Planta en maceta"
                    width={200}
                    height={250}
                    className="object-contain"
                    data-ai-hint="flower pot"
                  />
                </div>

                {/* Plant Details */}
                <div className="w-1/2 space-y-2">
                  <DetailItem label="Nombre" value="Chabela" />
                  <DetailItem label="Humedad" value={`${sensorData.humidity}%`} />
                  <DetailItem label="Fertilizante" value="100%" />
                  <DetailItem label="Estado" value="Buena" />
                </div>
              </div>
            </div>

            {/* Green Box */}
            <div className="bg-green-600 text-white p-4 rounded-b-2xl">
              <h2 className="text-lg font-bold mb-4 text-center">
                Cuidemos las plantas
              </h2>
              <div className="flex justify-around">
                <StatusMetric
                  icon={Thermometer}
                  value={String(sensorData.temperature)}
                  label="Temperatura"
                  unit="°"
                />
                <StatusMetric icon={Wind} value={String(sensorData.humidity)} label="Humedad" unit="%"/>
                <StatusMetric icon={Droplets} value={String(sensorData.waterLevel)} label="Tanque" unit="%"/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
