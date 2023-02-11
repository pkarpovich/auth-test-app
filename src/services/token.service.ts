import nookies from 'nookies';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

const TOKEN_KEY = 'token';

export interface ITokenContext {
    cookies: NextApiRequestCookies;
}

export class TokenService {
    static get(ctx: ITokenContext | null): string | null {
        const cookies = nookies.get({ req: ctx });
        const token = cookies[TOKEN_KEY];

        return token ? atob(token) : null;
    }

    static save(token: string): void {
        nookies.set(null, TOKEN_KEY, btoa(token), {
            path: '/',
        });
    }

    static destroy(): void {
        nookies.destroy(null, TOKEN_KEY, {
            path: '/',
        });
    }

    static verify(ctx: ITokenContext | null = null): boolean {
        const token = this.get(ctx);

        return !!token;
    }
}
