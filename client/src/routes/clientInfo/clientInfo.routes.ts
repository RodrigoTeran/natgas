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
		console.log(data);
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
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
