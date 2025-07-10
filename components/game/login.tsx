import React, { useState } from 'react';

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
        // redirect to start game page
        return (
            <div style={{
                background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80) center/cover',
                minHeight: '100vh',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'serif',
                textShadow: '2px 2px 8px #000'
            }}>
                <h1>Ave, Citizen!</h1>
                <p>Welcome to the Roman Empire. You are logged in.</p>
                <span role="img" aria-label="laurel">🏛️</span>
            </div>
        );
    }

    return (
        <div style={{
            background: 'linear-gradient(135deg, #b9935a 0%, #6b4226 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'serif'
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid #b9935a',
                    borderRadius: '16px',
                    padding: '2rem 3rem',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '320px'
                }}
            >
                <h2 style={{ color: '#fff', marginBottom: '1.5rem', letterSpacing: '2px' }}>
                    Welcome to Telenorium
                </h2>
                <label style={{ color: '#fff', marginBottom: '1rem', fontWeight: 'bold', width: '100%' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem 2.5rem 0.5rem 0.5rem',
                                borderRadius: '8px',
                                border: '1px solid #b9935a',
                                background: '#fffbe6',
                                fontFamily: 'serif',
                                position: 'relative'
                            }}
                        />
                        <span
                            onClick={() => setShowPassword(v => !v)}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color: '#b9935a',
                                fontSize: '1.2rem',
                                zIndex: 2
                            }}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            tabIndex={0}
                            role="button"
                        >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                    </div>
                </label>
                <button
                    type="submit"
                    style={{
                        background: '#b9935a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1.5rem',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                >
                    Enter Telenorium
                </button>
                {error && (
                    <div style={{ color: '#ffdddd', background: '#6b4226', borderRadius: '8px', padding: '0.5rem 1rem', marginTop: '1rem' }}>
                        {error}
                    </div>
                )}
                <div style={{ marginTop: '2rem', color: '#fff', fontSize: '2rem' }}>
                    <span role="img" aria-label="roman helmet">🪖</span>
                    <span role="img" aria-label="laurel">🏛️</span>
                </div>
            </form>
        </div>
    );
};

export default Login;