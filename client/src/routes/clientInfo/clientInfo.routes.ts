import { getClientIdCache } from "../../cache/auth";
import { REGISTER_ROUTE } from "../index";
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

		const res = await fetch(`${REGISTER_ROUTE}/info-cliente/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(body),
		});

		const resData = await res.json();
		console.log(resData);
		return resData;
	} catch (error) {
		console.error(error);
		return null;
	}
};
