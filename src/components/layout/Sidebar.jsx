import React, { useState } from 'react';
import { Search, Settings, Edit3, ShieldCheck, LogOut } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/components/ui/Button';
import SettingsDrawer from './SettingsDrawer';

const Sidebar = ({ className }) => {
    const { conversations, activeTab, setActiveTab } = useChat();
    const { user, logout } = useAuth();
    const [search, setSearch] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className={cn("flex flex-col h-full bg-secondary/30 border-r backdrop-blur-xl", className)}>
                {/* Sidebar Header */}
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
                            <ShieldCheck size={28} />
                            <span>Cipher</span>
                        </div>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Edit3 size={18} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => setIsSettingsOpen(true)}
                            >
                                <Settings size={18} />
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations..."
                            className="pl-9 h-9 bg-secondary/50 border-none rounded-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
                    <div className="space-y-1">
                        {filteredConversations.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setActiveTab(chat.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                                    activeTab === chat.id
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-secondary/50 text-foreground"
                                )}
                            >
                                <Avatar
                                    src={chat.avatar}
                                    fallback={chat.name.charAt(0)}
                                    status={chat.status}
                                />
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="font-semibold truncate">{chat.name}</h4>
                                        <span className="text-[10px] text-muted-foreground opacity-70">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs text-muted-foreground truncate pr-2">
                                            {chat.lastMessage}
                                        </p>
                                        {chat.unread > 0 && (
                                            <span className="flex items-center justify-center min-w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t bg-secondary/20">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <Avatar fallback="D" size="sm" className="bg-primary/20 text-primary" />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold truncate leading-none mb-1">Demo User</p>
                                <p className="text-[10px] text-muted-foreground truncate">demo@cipher.me</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground hover:text-destructive">
                            <LogOut size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
};

export default Sidebar;
