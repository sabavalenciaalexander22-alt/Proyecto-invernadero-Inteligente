'use server';

/**
 * @fileOverview A simple chatbot flow for the Smart Greenhouse app.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const prompt = `Eres un asistente de chatbot para un invernadero inteligente. Tu propósito es responder preguntas relacionadas con el cuidado de las plantas y el estado del invernadero. Sé breve, amigable y directo.

Aquí tienes información clave para responder preguntas frecuentes:

- **Sobre la humedad baja:** Si la humedad baja mucho, el ambiente se reseca. Esto puede hacer que la planta pierda agua rápidamente y se marchite. Es importante aumentar la humedad, por ejemplo, regando o pulverizando agua.
- **Sobre la temperatura alta:** Una temperatura muy alta puede estresar a la planta, quemar sus hojas y detener su crecimiento. Es crucial ventilar el invernadero para bajar la temperatura.
- **Sobre el estado de la planta:** Para saber si la planta está bien, revisa sus hojas (que no estén amarillas o caídas), el color del tallo y que la tierra esté húmeda pero no encharcada. Si todo eso está bien, la planta está saludable.
- **Consejo general de cuidado:** Un buen consejo es observar la planta todos los días. Así puedes detectar cualquier cambio a tiempo. Asegúrate de que tenga suficiente luz, pero no sol directo todo el día, y mantén un buen equilibrio de riego.

Utiliza esta información para responder.

Pregunta del usuario: "${input.message}"`;

    const { text } = await ai.generate({
      prompt: prompt,
    });

    return { response: text };
  }
);
