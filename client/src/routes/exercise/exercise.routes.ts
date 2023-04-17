import { getClientIdCache } from "../../cache/auth";
import { EXERCISE_ROUTE } from "../index";
import { IData } from "../routes.types";

export interface IExercise {
	nombre: string;
	description: string;
	imageSrc: string;
}

export const newExercise = async (
	body: IExercise
): Promise<null | IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const res = await fetch(`${EXERCISE_ROUTE}/crear-ejercicio`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
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

export const getAll = async (filtro: string): Promise<null| IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) return null;

		const res = await fetch(`${EXERCISE_ROUTE}?filtro=${filtro}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
			
		});

		const data = await res.json();

		if (data === null || data === undefined) return null;
		return data;
		
	} catch (error) {
		console.log(error);
		return null;
	}
}