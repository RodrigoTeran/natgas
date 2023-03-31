import { AUTH_ROUTE, CLIENT_ROUTE } from "../index";
import { IUser } from "../../interfaces/User.interfaces";
import type { IData } from "../routes.types";
import { getClientIdCache } from "../../cache/auth";

// Messages complete
export const getAuthClient = async (): Promise<IData<{
    user: IUser
}> | null> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(AUTH_ROUTE, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        // return data.data.user;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    };
}

export interface IRegisterBody {
    username: string;
    height: number;
    weight: number;
    dateOfBirth: Date;
    goal: string;
    level: string;
    sex: "F" | "M";
}

// TODO: messages
export const registerClient = async (body: IRegisterBody): Promise<IData<{
    user: IUser
}> | null> => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(`${CLIENT_ROUTE}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();

        if (data === null || data === undefined) {
            return null;
        }

        // return data.data.user;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    };
}