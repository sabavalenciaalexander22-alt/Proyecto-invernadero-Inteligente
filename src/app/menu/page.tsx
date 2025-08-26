import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sprout,
  Droplets,
  Wind,
  Thermometer,
  Lightbulb,
  Bot,
} from 'lucide-react';

const menuItems = [
  { href: '/status', title: 'Estado de la Planta', icon: Sprout },
  { href: '/water', title: 'Nivel de Agua', icon: Droplets },
  { href: '/humidity', title: 'Nivel de Humedad', icon: Wind },
  { href: '/temperature', title: 'Temperatura', icon: Thermometer },
  { href: '/recommendations', title: 'Recomendaciones', icon: Lightbulb },
  { href: '/chatbot', title: 'Chatbot', icon: Bot },
];

export default function MenuPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold font-headline mb-10 animate-in fade-in slide-in-from-top-10 duration-500">
          Menú Principal
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={item.href} passHref>
              <Card
                className="text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 h-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <item.icon className="w-16 h-16 mx-auto text-primary" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline">{item.title}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
