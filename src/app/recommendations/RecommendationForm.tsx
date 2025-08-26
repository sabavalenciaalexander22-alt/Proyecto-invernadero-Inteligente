'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { plantCareRecommendation } from '@/ai/flows/plant-care-recommendation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  temperature: z.number().min(-20).max(50),
  humidity: z.number().min(0).max(100),
  waterLevel: z.number().min(0).max(100),
});

type FormData = z.infer<typeof formSchema>;

export default function RecommendationForm() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature: 24,
      humidity: 55,
      waterLevel: 75,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await plantCareRecommendation(data);
      setRecommendation(result.recommendation);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo generar la recomendación. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Datos de los Sensores</CardTitle>
              <CardDescription>
                Ajusta los valores actuales de tu invernadero.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperatura: {field.value}°C</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        min={-20}
                        max={50}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="humidity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Humedad: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="waterLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel de Agua: {field.value}%</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                <span>Generar Recomendación</span>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">
              Generando recomendación...
            </p>
          </CardContent>
        </Card>
      )}

      {recommendation && !isLoading && (
        <Card className="mt-8 bg-accent animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 />
              Recomendación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{recommendation}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
