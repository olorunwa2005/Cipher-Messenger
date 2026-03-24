import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Chat from '@/pages/Chat';
import { AuthProvider } from '@/context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/" element={<Navigate to="/chat" replace />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
