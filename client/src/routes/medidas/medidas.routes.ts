import { MEDIDAS_ROUTE } from "../index";
// import { IMeasurement } from "../../interfaces/Measurement.interfaces";
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

        console.log("body:", body);

        const res = await fetch(MEDIDAS_ROUTE + "/medidas", {
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