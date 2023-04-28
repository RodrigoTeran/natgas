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
	sex: "m" | "f";
}

export const registerClient = async (
	body: IClient
): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${CLIENT_ROUTE}/register`, {
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
