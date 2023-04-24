import { PROGRESS_ROUTE } from "../index";
import { getClientIdCache } from '../../cache/auth'

const progressRoute = `${PROGRESS_ROUTE}`;

export const getAll = async (body: string[], start: Date, end: Date) => {
    try {
        const token = getClientIdCache();

        if (token === null) return null;

        let aux =`${progressRoute}?start=${start}&end=${end}`;

        for(let i = 0; i < body.length; i++){
            aux += `&table${i + 1}=${body[i]}`;
        }
        
        const res = await fetch(aux, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data: any = await res.json();

        if(data === null || data === undefined){
            return null;
        }

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}