import { EXERCISE_ROUTE } from "../index";
import { getClientIdCache } from "../../cache/auth";
import { IData } from "../routes.types";

interface IExercise {
	nombre: string;
	description: string;
	imageId: string;
}

export const newExercise = async (
	body: IExercise
): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${EXERCISE_ROUTE}/new`, {
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
