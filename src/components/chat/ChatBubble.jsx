import React from 'react';
import { cn } from '@/components/ui/Button';
import { Check, CheckCheck } from 'lucide-react';

const ChatBubble = ({ message }) => {
    const isMe = message.sender === 'me';

    return (
        <div className={cn(
            "flex flex-col mb-4 max-w-[80%] md:max-w-[70%]",
            isMe ? "ml-auto items-end" : "mr-auto items-start"
        )}>
            <div className={cn(
                "relative p-3 px-4 rounded-2xl text-sm shadow-sm",
                isMe
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-secondary/80 text-foreground rounded-tl-none backdrop-blur-sm border border-border/50"
            )}>
                <p className="leading-relaxed">{message.content}</p>

                <div className={cn(
                    "flex items-center gap-1 mt-1 text-[10px]",
                    isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                    <span>{message.time}</span>
                    {isMe && (
                        <span>
                            {message.status === 'read' ? (
                                <CheckCheck size={12} className="text-white" />
                            ) : (
                                <Check size={12} className="text-white/70" />
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
