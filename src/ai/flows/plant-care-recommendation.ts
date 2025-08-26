'use server';

/**
 * @fileOverview Provides smart, actionable recommendations based on sensor data to ensure plant health.
 *
 * - plantCareRecommendation - A function that provides plant care advice.
 * - PlantCareRecommendationInput - The input type for the plantCareRecommendation function.
 * - PlantCareRecommendationOutput - The return type for the plantCareRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlantCareRecommendationInputSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity level as a percentage.'),
  waterLevel: z.number().describe('The current water level as a percentage.'),
});
export type PlantCareRecommendationInput = z.infer<
  typeof PlantCareRecommendationInputSchema
>;

const PlantCareRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe('A specific, actionable recommendation for plant care.'),
});
export type PlantCareRecommendationOutput = z.infer<
  typeof PlantCareRecommendationOutputSchema
>;

export async function plantCareRecommendation(
  input: PlantCareRecommendationInput
): Promise<PlantCareRecommendationOutput> {
  return plantCareRecommendationFlow(input);
}

const plantCareRecommendationFlow = ai.defineFlow(
  {
    name: 'plantCareRecommendationFlow',
    inputSchema: PlantCareRecommendationInputSchema,
    outputSchema: PlantCareRecommendationOutputSchema,
  },
  async (input) => {
    const prompt = `Genera recomendaciones para un invernadero:
Temperatura: ${input.temperature}°C
Humedad: ${input.humidity}%
Nivel de agua: ${input.waterLevel}%

Dame consejos prácticos, claros y cortos para el usuario.`;

    const {text} = await ai.generate({
      prompt: prompt,
    });

    return { recommendation: text };
  }
);