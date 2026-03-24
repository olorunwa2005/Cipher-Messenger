import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatArea from '@/features/chat/ChatArea';
import { ChatProvider, useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const ChatContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { activeChat } = useChat();

    return (
        <div className="flex h-screen bg-background overflow-hidden dark">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:flex w-80 lg:w-96 border-r border-border/50" />

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-sm z-50 md:hidden shadow-2xl"
                        >
                            <Sidebar className="w-full border-none h-full" />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 text-muted-foreground md:hidden"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <X size={20} />
                            </Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 relative h-full">
                {/* Mobile Menu Button (Floating) */}
                {!isSidebarOpen && (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="md:hidden absolute top-3 left-4 z-20 rounded-full bg-background/50 backdrop-blur border border-border/50 shadow-md"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu size={20} />
                    </Button>
                )}

                <ChatArea />
            </main>
        </div>
    );
};

const Chat = () => {
    return (
        <ChatProvider>
            <ChatContent />
        </ChatProvider>
    );
};

export default Chat;
