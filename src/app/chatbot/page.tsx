'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { chat } from '@/ai/flows/chatbot';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const suggestedQuestions = [
  '¿Qué pasa si la humedad baja mucho?',
  '¿Qué pasa si la temperatura es alta?',
  '¿Está bien la planta?',
  'Dame un consejo para mejorar el cuidado de la planta.',
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || input;
    if (content.trim() === '') return;

    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    if (!messageContent) {
      setInput('');
    }
    setIsLoading(true);

    try {
      const result = await chat({ message: content });
      const botMessage: Message = { role: 'bot', content: result.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      toast({
        title: 'Error',
        description: 'No se pudo obtener una respuesta del chatbot.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout title="Asistente Chatbot">
      <div className="flex flex-col h-[calc(100vh-12rem)] max-w-2xl mx-auto">
        {messages.length === 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4 animate-in fade-in">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="rounded-full"
                onClick={() => handleSend(question)}
                disabled={isLoading}
              >
                {question}
              </Button>
            ))}
          </div>
        )}
        <ScrollArea className="flex-1 p-4 border rounded-lg bg-card">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 text-sm max-w-xs md:max-w-md ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 text-sm bg-muted flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-4 flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && !isLoading && handleSend()
            }
            placeholder="Escribe tu pregunta..."
            disabled={isLoading}
          />
          <Button onClick={() => handleSend()} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
