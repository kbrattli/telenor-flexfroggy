import React, { useEffect, useState } from 'react';

// @ts-ignore
const Countdown = ({ onComplete }) => {
    const [count, setCount] = useState(3);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setFinished(true);
            if (onComplete) onComplete();
        }
    }, [count, onComplete]);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                background: '#000',
            }}
        >
            <span
                style={{
                    fontSize: '18vw',
                    fontWeight: 'bold',
                    color: '#fff',
                    lineHeight: 1,
                    textAlign: 'center',
                }}
            >
                {!finished ? count : 'Go!'}
            </span>
        </div>
    );
};

export default Countdown;