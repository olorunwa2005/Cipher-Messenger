import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/features/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
        navigate('/chat');
    };

    return (
        <div className="dark">
            <AuthLayout
                title="Welcome Back"
                description="Enter your credentials to access your secure messages"
            >
                <Card className="border-none shadow-2xl bg-secondary/50 backdrop-blur-xl">
                    <CardContent className="pt-8 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground px-1" htmlFor="email">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
                                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
                                Sign In
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link to="/signup" className="text-primary font-semibold hover:underline">
                                Register now
                            </Link>
                        </p>
                    </CardContent>
                </Card>

                <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground opacity-60">
                    <Shield size={12} />
                    End-to-End Encrypted
                </div>
            </AuthLayout>
        </div>
    );
};

// Import Shield here if not imported globally
import { Shield } from 'lucide-react';

export default Login;
