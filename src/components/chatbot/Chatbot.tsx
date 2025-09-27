'use client';

import { useState }.from('react');
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, X, MessageSquare, User } from 'lucide-react';
import { chat } from '@/ai/flows/chat';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';


type Message = {
    role: 'user' | 'model';
    content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const genkitHistory = messages.map(m => ({
            role: m.role,
            content: m.content,
        }));
        
      const result = await chat({history: genkitHistory, prompt: input});
      const modelMessage: Message = { role: 'model', content: result.response };
      setMessages((prev) => [...prev, modelMessage]);

    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = { role: 'model', content: 'Sorry, I am having trouble connecting. Please try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[60vh] flex flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                Gardening Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                     {message.role === 'model' && (
                        <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                        </Avatar>
                     )}
                     <div className={cn("rounded-lg px-3 py-2 max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                        <p className="text-sm">{message.content}</p>
                     </div>
                      {message.role === 'user' && (
                        <Avatar className="w-8 h-8">
                            <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                        </Avatar>
                     )}
                  </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-3 py-2 bg-secondary flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
                <Input
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}