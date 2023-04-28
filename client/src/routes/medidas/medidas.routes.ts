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

export const fetchOne = async (body: string, start: string, end: string): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${MEDIDAS_ROUTE}/consultar?table=${body}&start=${start}&end=${end}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const resData = await res.json();

		if (resData === null || resData === undefined) {
            return null;
        }
		
		return resData;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const updateMeasure = async(body:string, measure:string, id:string): Promise<any | IData<any>> => {
	try {
		const token = getClientIdCache();

		if(token === null) {
			return null;
		}

		const res = await fetch(`${MEDIDAS_ROUTE}/edit?table=${body}&measurement=${measure}&id=${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }
        
        return data;

	} catch(error) {
		console.log(error);
		return null;
	}
}

export const deleteMeasure = async(body:string, id:string): Promise<any | IData<any>> => {
	try {
		const token = getClientIdCache();

		if(token === null) {
			return null;
		}

		const res = await fetch(`${MEDIDAS_ROUTE}/delete?table=${body}&id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data: any = await res.json();

        if (data === null || data === undefined) {
            return null;
        }
        
        return data;

	} catch(error) {
		console.log(error);
		return null;
	}
}
