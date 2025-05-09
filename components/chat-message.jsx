import { Avatar } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./code-block";

export function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0 items-center justify-center bg-gradient-to-r from-primary to-primary/50">
          <Bot className="h-4 w-4 text-white" />
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] break-words rounded-2xl px-3 py-1",
          isUser
            ? "bg-gradient-to-r from-primary to-primary/50 text-white"
            : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-full dark:prose-invert break-words">
            <MarkdownRenderer content={message.content} />
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 shrink-0 items-center justify-center bg-accent">
          <User className="h-4 w-4 bg-accent-foreground" />
        </Avatar>
      )}
    </div>
  );
}
