import { PROGRESS_ROUTE } from "../index";
import { getClientIdCache } from '../../cache/auth'

const progressRoute = `${PROGRESS_ROUTE}`;

export const getAll = async () => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        const res = await fetch(`${progressRoute}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        
        const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}