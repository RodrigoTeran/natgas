import { getClientIdCache } from "../../cache/auth";
import { BITACORA_ROUTE } from "../index";
import { IData } from "../routes.types";

interface ICreateEntry {
	title: string;
	content: string;
	date: Date;
}

// Messages complete
export const createEntry = async (
	body: ICreateEntry
): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		// serialize
		// deserialize
		const res = await fetch(`${BITACORA_ROUTE}/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(body),
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export interface IGetEntriesData {
	createdAt: string;
	content: string;
	title: string;
}

// Messages complete
export const getEntries = async (
	date: Date,
	title: string,
  	content: string
): Promise<IData<IGetEntriesData[]> | null> => {
	try {
		const token = getClientIdCache();
		const queryParams = new URLSearchParams({ title, content });
		
		if (token === null) {
			return null;
		}

		// serialize
		// deserialize
		const res = await fetch(`${BITACORA_ROUTE}/${date}?${queryParams}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const resData = await res.json();

		// return resData.data;
		return resData;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export interface IGetEntryData {
	createdAt: string;
	content: string;
	title: string;
}

// Messages complete
export const getEntry = async (
	id: string
): Promise<IData<IGetEntriesData[]> | null> => {
	try {
		// token is clientId
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		// serialize
		// deserialize
		const res = await fetch(`${BITACORA_ROUTE}/consultar-entrada/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const resData = await res.json();

		// return resData.data;
		return resData;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export interface IEditEntriesData {
	content: string;
	title: string;
}

export const updateEntry = async (
	id: string,
	title: string,
	content: string,
	createdAt: Date
): Promise<IEditEntriesData[] | null> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			throw new Error("Something went wrong");
		}

		const res = await fetch(`${BITACORA_ROUTE}/consultar-entrada/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({ id, title, content, createdAt }),
		});

		console.log(res);

		if (res.status !== 200) {
			throw new Error("Something went wrong");
		}

		const resData = await res.json();

		return resData.data as IEditEntriesData[];
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const deleteEntry = async (
		id: string
	): Promise<void | null> => {
		try{
			const token = getClientIdCache();

			if (token === null) {
				throw new Error("Something went wrong");
			}

			const res = await fetch(`${BITACORA_ROUTE}/consultar-entrada/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			});

			if (res.status !== 200) {
				throw new Error("Something went wrong");
			}

			const resData = await res.json();
			
			return null;
		} catch (error) {
			console.error(error);
			return null;
		}
	};
