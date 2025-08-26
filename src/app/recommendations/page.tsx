import AppLayout from '@/components/layout/AppLayout';
import RecommendationForm from './RecommendationForm';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <AppLayout title="Recomendaciones Inteligentes">
      <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <Lightbulb className="w-12 h-12 mx-auto text-primary mb-4" />
            <CardTitle className="text-3xl font-headline">
              Recomendaciones Inteligentes
            </CardTitle>
            <CardDescription className="text-lg">
              Ajusta los valores de los sensores para obtener una recomendación
              de cuidado para tu planta.
            </CardDescription>
          </CardHeader>
        </Card>
        <RecommendationForm />
      </div>
    </AppLayout>
  );
}
