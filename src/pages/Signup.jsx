import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/features/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, User, Mail, Lock, CheckCircle2 } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simply navigate for demo
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="dark">
            <AuthLayout
                title="Create Account"
                description="Join Cipher Messenger for secure, private communication"
            >
                <Card className="border-none shadow-2xl bg-secondary/50 backdrop-blur-xl">
                    <CardContent className="pt-8 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground px-1" htmlFor="name">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-10"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground px-1" htmlFor="email">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground px-1" htmlFor="password">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-2 px-1 text-xs text-muted-foreground">
                                <CheckCircle2 size={14} className="mt-0.5 text-primary" />
                                <span>By signing up, you agree to our privacy-first terms of service.</span>
                            </div>

                            <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
                                Create Account
                            </Button>
                        </form>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </AuthLayout>
        </div>
    );
};

export default Signup;
