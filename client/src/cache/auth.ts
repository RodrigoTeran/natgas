const CACHE_CLIENT = "client";

export const getClientIdCache = (): string | null => {
    try {
        const localClientId: string | null = localStorage.getItem(CACHE_CLIENT);

        if (localClientId === null) return null;

        const clientId: string = JSON.parse(localClientId);

        return clientId;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const setClientIdCache = (clientId: string): void => {
    try {
        const stringifiedClientId = JSON.stringify(clientId);

        localStorage.setItem(CACHE_CLIENT, stringifiedClientId);
    } catch (error) {
        console.error(error);
    }
}

export const clearClientIdCache = (): void => {
    try {
        localStorage.removeItem(CACHE_CLIENT);
    } catch (error) {
        console.error(error);
    }
}