import React, { useState, FC, useEffect } from 'react';
import Router from 'next/router';
import { TokenService } from '@/services/token.service';

export const withAuth = <P extends object>(Component: FC<P>) => {
    const AuthGuard = (props: P) => {
        const [isReady, setIsReady] = useState(false);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            try {
                setIsAuthenticated(TokenService.verify());
            } finally {
                setIsReady(true);
            }
        }, []);

        if (!isReady) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }

        if (!isAuthenticated && isReady) {
            Router.push('/login');
        }

        return <Component {...props} />;
    };

    return AuthGuard;
};
