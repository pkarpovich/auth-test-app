export class HttpService {
    static async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        return response.json();
    }
}
