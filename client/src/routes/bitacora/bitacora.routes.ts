import { getClientIdCache } from "../../cache/auth";
import { BITACORA_ROUTE } from "../index";

interface ICreateEntry {
    aDate: Date;
    title: string;
    content: string;
}

export const createEntry = async (body: ICreateEntry) => {
    try {

        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        console.log("body:", body);

        // serialize
        // deserialize
        const res = await fetch(`${BITACORA_ROUTE}/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(body)
        });

        const resData = await res.json();

        console.log("resData:", resData);

    } catch (error) {
        console.error(error);
    }
};

export interface IGetEntriesData {
    aDate: string;
    content: string;
    title: string;
}

export const getEntries = async (date: Date): Promise<IGetEntriesData[] | null> => {
    try {

        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        // serialize
        // deserialize
        const res = await fetch(`${BITACORA_ROUTE}/${date}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const resData = await res.json();

        return resData.data;

    } catch (error) {
        console.error(error);
        return null;
    }
};