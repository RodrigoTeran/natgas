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

export const update = async (id: string, name: string, description: string, imageId: string, src: string): Promise<null| IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) return null;

		const res = await fetch(`${EXERCISE_ROUTE}/editar`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token
			},
			
			body: JSON.stringify({
				id: id,
				name: name,
				description: description,
				imageId: imageId,
				src: src,
			})
		});

		const data = await res.json();

		if (data === null || data === undefined) return null;
		return data;
		
	} catch (error) {
		console.log(error);
		return null;
	}
}


export const fetchOne = async (id: string): Promise<null| IData<any>> => {
	try {
		const token = getClientIdCache();

		if (token === null) return null;

		const res = await fetch(`${EXERCISE_ROUTE}/ejercicio?id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token
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