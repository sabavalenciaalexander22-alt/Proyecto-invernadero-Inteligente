import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

type AppLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/menu">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold font-headline ml-4">{title}</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
