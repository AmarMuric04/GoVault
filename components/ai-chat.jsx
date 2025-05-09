"use client";

import { Message, useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Bot, Trash2 } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { v4 as uuidv4 } from "uuid";

export function Chat({
  title = "AI Agent",
  description = "Ask me anything related to Our Brand! I can help with information, navigating through the website, and more",
  configKey,
  system,
  placeholder,
  initialMessages,
  api,
  pos = {
    side: "right",
    align: "start",
  },
  children,
}) {
  const [chatKey, setChatKey] = useState(() => uuidv4());
  const [inputRows, setInputRows] = useState(1);
  const scrollAreaRef = useRef(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      id: String(chatKey),
      api: api || "/api/chat",
      initialMessages,
      body: {
        configKey,
        system,
      },
    });

  useEffect(() => {
    if (!system && !configKey) {
      console.warn(
        "[Chat] Neither 'system' nor 'configKey' was provided. Default config will be used."
      );
    }

    if (system && configKey) {
      throw new Error(
        "You can't use both 'system' and 'configKey' at the same time. Choose one."
      );
    }
  }, [system, configKey]);

  useEffect(() => {
    const rows = input.split("\n").length;
    setInputRows(Math.min(5, Math.max(1, rows)));
  }, [input]);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const resetConversation = () => {
    setChatKey(() => uuidv4());
  };

  return (
    <div className="w-fit h-fit grid place-items-center">
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>

        <PopoverContent
          side={pos.side}
          align={pos.align}
          sideOffset={20}
          alignOffset={20}
          className={cn(
            "transition-all opacity-100 text-background-foreground border border-border rounded-3xl overflow-hidden",
            "aspect-[8/13] w-[90vw] max-w-md",
            "flex flex-col"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/50 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h2 className="font-semibold">{title}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetConversation}
              title="Clear conversation"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="h-8 w-8 p-1 lg:p-0 lg:h-16 lg:w-16 rounded-full bg-gradient-to-r from-primary to-primary/50 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Welcome to the AI Chat
                </h3>
                <p className="text-accent-foreground max-w-md">{description}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3 animate-pulse">
                    <Avatar className="items-center justify-center bg-gradient-to-r from-primary to-primary/50">
                      <Bot className="h-4 w-4 text-foreground" />
                    </Avatar>
                    <div className="bg-accent rounded-2xl p-3 max-w-[80%]">
                      <div className="h-4 w-24 bg-accent rounded-full mb-2"></div>
                      <div className="h-4 w-64 bg-accent rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border w-full">
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
              <div className="relative flex-1 w-full">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder={placeholder || "Ask something..."}
                  className="resize-none pr-10 py-3 rounded-2xl border-border focus-visible:ring-primary break-words w-full max-w-full"
                  rows={inputRows}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="text-foreground absolute right-2 bottom-2 h-8 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-2 text-sm text-red-500">
                Error: {error.message}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
