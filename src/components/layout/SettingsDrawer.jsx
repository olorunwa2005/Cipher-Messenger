import React from 'react';
import { X, User, Bell, Shield, Moon, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

const SettingsItem = ({ icon: Icon, label, value, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary text-muted-foreground group-hover:text-primary transition-colors">
                <Icon size={18} />
            </div>
            <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-xs text-muted-foreground">{value}</span>}
            <ChevronRight size={16} className="text-muted-foreground" />
        </div>
    </button>
);

const SettingsDrawer = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="p-4 flex items-center justify-between border-b">
                            <h2 className="text-lg font-bold">Settings</h2>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {/* Profile Section */}
                            <div className="flex flex-col items-center text-center space-y-3 py-4">
                                <div className="relative">
                                    <Avatar fallback="D" size="xl" className="h-24 w-24 bg-primary/10 text-primary" />
                                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 border-2 border-background">
                                        <User size={14} />
                                    </Button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Demo User</h3>
                                    <p className="text-sm text-muted-foreground">demo@cipher.me</p>
                                </div>
                            </div>

                            {/* Settings Groups */}
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">Account</h4>
                                <SettingsItem icon={User} label="Profile Details" value="Demo User" />
                                <SettingsItem icon={Shield} label="Privacy & Security" />
                                <SettingsItem icon={Bell} label="Notifications" value="On" />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">Appearance</h4>
                                <SettingsItem icon={Moon} label="Dark Mode" value="System" />
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">Support</h4>
                                <SettingsItem icon={HelpCircle} label="Help Center" />
                            </div>
                        </div>

                        <div className="p-4 border-t">
                            <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive gap-3 h-12">
                                <LogOut size={18} />
                                Logout
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SettingsDrawer;
