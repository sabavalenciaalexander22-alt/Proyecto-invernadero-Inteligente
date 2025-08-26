'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function StartPage() {
  return (
    <div className="relative flex h-screen w-full flex-col bg-white overflow-hidden">
      {/* Right side with image */}
      <div className="absolute inset-y-0 right-0 w-1/2 opacity-0 animate-slide-in-from-right [animation-delay:1s] fill-mode-forwards">
        <Image
          src="https://i.postimg.cc/FKbGsZKG/Hoja-planta.png"
          alt="Hoja de Planta"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Left side with content */}
      <main className="relative z-10 flex h-full w-1/2 flex-col p-8">
        <div className="flex flex-1 flex-col justify-center opacity-0 animate-fade-in fill-mode-forwards">
          <h1 className="text-5xl font-bold font-headline text-green-700">
            Invernadero
            <br />
            Inteligente
          </h1>
        </div>
        <div className="flex justify-start opacity-0 animate-fade-in [animation-delay:2s] fill-mode-forwards">
          <Link href="/menu" passHref className="w-full max-w-xs">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-gray-300 bg-gray-200 text-lg font-bold text-black hover:bg-gray-300"
            >
              Inicio
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
