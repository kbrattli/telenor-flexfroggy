import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CORRECT_PASSWORD = 'Julius5G';

const Login = () => {
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setLoggedIn(true);
            setError('');
        } else {
            setError('Incorrect password. The gates of Telenorium remain closed.');
        }
    };

    if (loggedIn) {
        return (
            <div className="min-h-screen bg-telenor-dark-blue text-white flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-2">Ave, Citizen!</h1>
                <p className="text-lg text-white/70">Welcome to the Roman Empire. You are logged in.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-telenor-dark-blue to-telenor-mid-blue">
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col items-center min-w-[320px]"
            >
                <h2 className="text-white mb-6 text-xl font-semibold tracking-wide">
                    Welcome to Telenorium
                </h2>
                <label className="text-white mb-4 font-bold w-full">
                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 pr-10 rounded-lg border border-white/30 bg-white/90 text-telenor-dark-blue placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-telenor-mid-blue focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-telenor-mid-blue hover:text-telenor-dark-blue transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </label>
                <Button
                    type="submit"
                    className="w-full mt-2 bg-telenor-blue text-telenor-dark-blue font-semibold hover:bg-telenor-blue/90 transition-colors"
                >
                    Enter Telenorium
                </Button>
                {error && (
                    <div className="mt-4 text-telenor-hot-pink bg-telenor-hot-pink/10 rounded-lg px-4 py-2 text-sm">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;
