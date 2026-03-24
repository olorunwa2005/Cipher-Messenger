import React from 'react';
import { Shield } from 'lucide-react';

const AuthLayout = ({ children, title, description }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 auth-gradient">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
