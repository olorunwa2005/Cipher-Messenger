import React, { useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical, Shield, ChevronLeft, Search } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import { motion, AnimatePresence } from 'framer-motion';

const ChatArea = () => {
    const { activeChat, messages, sendMessage, isTyping } = useChat();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    if (!activeChat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-background">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6">
                    <Shield size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">End-to-End Encrypted</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    Choose a conversation from the sidebar to start messaging securely.
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-background to-secondary/5">
            {/* Chat Header */}
            <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b bg-background/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3 min-w-0">
                    <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                        <ChevronLeft size={20} />
                    </Button>
                    <Avatar
                        src={activeChat.avatar}
                        fallback={activeChat.name.charAt(0)}
                        status={activeChat.status}
                    />
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold truncate leading-none">{activeChat.name}</h3>
                            {activeChat.encrypted && <Shield size={12} className="text-green-500" />}
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            {activeChat.status === 'online' ? 'Active now' : 'Last seen recently'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1 lg:gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Search size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hidden sm:flex">
                        <Phone size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hidden sm:flex">
                        <Video size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <MoreVertical size={18} />
                    </Button>
                </div>
            </header>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth">
                <div className="max-w-5xl mx-auto space-y-2">
                    {/* Encryption Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-medium border border-green-500/20">
                            <Shield size={10} />
                            Messages are end-to-end encrypted. No one outside this chat can read them.
                        </div>
                    </div>

                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChatBubble message={msg} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-secondary/50 p-3 rounded-2xl rounded-tl-none inline-flex gap-1">
                                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input Area */}
            <ChatInput onSend={sendMessage} />
        </div>
    );
};

export default ChatArea;
