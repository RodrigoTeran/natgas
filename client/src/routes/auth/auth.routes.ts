import { AUTH_ROUTE, CLIENT_ROUTE } from "../index";
import { IUser } from "../../interfaces/User.interfaces";
import { getClientIdCache } from "../../cache/auth";

export const getAuthClient = async (): Promise<null | IUser> => {
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

        return data.data.user;
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

export const registerClient = async (body: IRegisterBody): Promise<null | IUser> => {
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

        return data.data.user;
    } catch (error) {
        console.error(error);
        return null;
    };
}