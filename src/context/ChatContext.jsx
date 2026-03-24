import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

const initialConversations = [
    {
        id: '1',
        name: 'Sarah Connor',
        avatar: '',
        status: 'online',
        lastMessage: 'The future is not set.',
        time: '2:45 PM',
        unread: 2,
        encrypted: true
    },
    {
        id: '2',
        name: 'James Bond',
        avatar: '',
        status: 'offline',
        lastMessage: 'Shaken, not stirred.',
        time: 'Yesterday',
        unread: 0,
        encrypted: true
    },
    {
        id: '3',
        name: 'Sherlock Holmes',
        avatar: '',
        status: 'online',
        lastMessage: 'Elementary, my dear Watson.',
        time: 'Monday',
        unread: 0,
        encrypted: true
    },
];

const initialMessages = {
    '1': [
        { id: 'm1', content: 'Are you there?', sender: 'them', time: '2:40 PM', status: 'read' },
        { id: 'm2', content: 'The future is not set. There is no fate but what we make for ourselves.', sender: 'them', time: '2:45 PM', status: 'read' },
    ],
    '2': [
        { id: 'm3', content: 'Mission accomplished.', sender: 'them', time: '10:00 AM', status: 'read' },
        { id: 'm4', content: 'Shaken, not stirred.', sender: 'them', time: '10:05 AM', status: 'read' },
    ]
};

export const ChatProvider = ({ children }) => {
    const [conversations, setConversations] = useState(initialConversations);
    const [activeTab, setActiveTab] = useState('1');
    const [messages, setMessages] = useState(initialMessages);
    const [isTyping, setIsTyping] = useState(false);

    const activeChat = conversations.find(c => c.id === activeTab);

    const sendMessage = (content) => {
        const newMessage = {
            id: Date.now().toString(),
            content,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setMessages(prev => ({
            ...prev,
            [activeTab]: [...(prev[activeTab] || []), newMessage]
        }));

        // Mock response
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const response = {
                    id: (Date.now() + 1).toString(),
                    content: 'I received your secure message.',
                    sender: 'them',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: 'read'
                };
                setMessages(prev => ({
                    ...prev,
                    [activeTab]: [...(prev[activeTab] || []), response]
                }));
            }, 2000);
        }, 1000);
    };

    return (
        <ChatContext.Provider value={{
            conversations,
            activeTab,
            setActiveTab,
            activeChat,
            messages: messages[activeTab] || [],
            sendMessage,
            isTyping
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
