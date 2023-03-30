import { MEDIDAS_ROUTE } from "../index";
import { getClientIdCache } from "../../cache/auth";

interface IMeasurement {
    measurement: number;
    tableName: string;
}

export const createMeasurement = async (body: IMeasurement) => {
    try {
        const token = getClientIdCache();

        if (token === null) {
            return null;
        }

        const res = await fetch(MEDIDAS_ROUTE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(body)
        });

        const resData = await res.json();

    } catch (error) {
        console.error(error);
    }
};