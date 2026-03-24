import React, { useState, useRef } from 'react';
import { Send, Plus, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const ChatInput = ({ onSend }) => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSend(text);
            setText('');
            inputRef.current?.focus();
        }
    };

    return (
        <div className="p-4 bg-background/50 backdrop-blur-md border-t">
            <form onSubmit={handleSubmit} className="relative flex items-end gap-2 max-w-5xl mx-auto">
                <div className="flex gap-1 mb-1">
                    <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                        <Plus size={20} />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground hidden sm:flex">
                        <Paperclip size={18} />
                    </Button>
                </div>

                <div className="relative flex-1">
                    <textarea
                        ref={inputRef}
                        rows={1}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Type a secure message..."
                        className="w-full resize-none py-3 px-4 pr-12 rounded-2xl bg-secondary/50 border-none focus:ring-1 focus:ring-primary/50 text-sm scrollbar-hide maxHeight-[200px]"
                        style={{ height: 'auto', minHeight: '44px' }}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 bottom-1.5 rounded-full text-muted-foreground hover:text-primary"
                    >
                        <Smile size={20} />
                    </Button>
                </div>

                <Button
                    type="submit"
                    size="icon"
                    disabled={!text.trim()}
                    className="rounded-xl h-11 w-11 shrink-0 transition-all duration-200 enabled:scale-105 active:enabled:scale-95 shadow-lg shadow-primary/20"
                >
                    <Send size={18} />
                </Button>
            </form>
        </div>
    );
};

export default ChatInput;
