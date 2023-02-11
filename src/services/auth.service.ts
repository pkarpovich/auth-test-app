import { HttpService } from '@/services/http.service';
import { TokenService } from '@/services/token.service';

interface ILoginResponse {
    ip: string;
}

export class AuthService {
    static async login(email: string, password: string): Promise<boolean> {
        const { ip } = await HttpService.get<ILoginResponse>(
            'https://api.ipify.org?format=json',
        );

        TokenService.save(ip);

        return true;
    }

    static logout(): void {
        TokenService.destroy();
    }
}
