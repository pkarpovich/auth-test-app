import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { TokenService } from '@/services/token.service';

export async function ProtectedRoute(
    context: GetServerSidePropsContext,
    redirectTo: string | null = null,
    getProps?: () => GetServerSideProps,
) {
    const isAuthenticated = TokenService.verify(context.req);

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: redirectTo ?? '/login',
            },
        };
    }

    if (getProps) {
        return {
            props: getProps(),
        };
    }

    return {
        props: {},
    };
}
