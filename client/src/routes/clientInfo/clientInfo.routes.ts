import { getClientIdCache } from "../../cache/auth";
import { CLIENT_ROUTE } from "../index";
import { IData } from "../routes.types";

export interface IClient {
	username: string;
	height: number;
	weight: number;
	dateOfBirth: any;
	goal: string;
	level: string;
	sex: string;
}

export const updateInfo = async (
	id: string,
	body: IClient
): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${CLIENT_ROUTE}/info-cliente/${id}`, {
			method: "PUT",
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

export const changeUserRole = async (
	targetUserId: string,
	newRoleId: string
): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${CLIENT_ROUTE}/editarRol`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({ targetUserId, newRoleId }),
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export type IUserAll = {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	rol: string;
	rolId: string;
};

export interface IGetAllUsersData {
	users: IUserAll[];
}

export const getAllUsers = async (
	page: number
): Promise<null | IData<IGetAllUsersData>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${CLIENT_ROUTE}/usuarios?page=${page}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();

		if (data === null || data === undefined) {
			return null;
		}

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getUserSexData = async (): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${CLIENT_ROUTE}/consultar-estadisticas/sex`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		console.log(data);
		if (data === null || data === undefined) {
			return null;
		}
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getUserJournalData = async (): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${CLIENT_ROUTE}/consultar-estadisticas/journal`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();

		if (data === null || data === undefined) {
			return null;
		}
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getUserGoalData = async (): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${CLIENT_ROUTE}/consultar-estadisticas/goal`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();

		if (data === null || data === undefined) {
			return null;
		}
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}