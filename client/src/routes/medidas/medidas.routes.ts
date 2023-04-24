import { MEDIDAS_ROUTE } from "../index";
import { getClientIdCache } from "../../cache/auth";
import { IData } from "../routes.types";

interface IMeasurement {
	measurement: number;
	tableName: string;
}

// Messages complete
export const createMeasurement = async (
	body: IMeasurement
): Promise<null | IData<IMeasurement>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(MEDIDAS_ROUTE, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(body),
		});

		const resData = await res.json();
		return resData;
	} catch (error) {
		console.error(error);
		return null;
	}
};
