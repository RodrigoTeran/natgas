import { IMAGES_ROUTE } from "../index";
import { getClientIdCache } from "../../cache/auth";

// Messages complete
export const uploadImage = async (file: File): Promise<null | string> => {
	try {
		const token = getClientIdCache();

		if (token === null) {
			return null;
		}

		const body = new FormData();
		body.append("image", file);

		// const apiUrl = `${IMAGES_ROUTE}/upload`;
		// console.log("API URL:", apiUrl);

		const res = await fetch(`${IMAGES_ROUTE}/upload`, {
			method: "POST",
			headers: {
				Authorization: token,
			},
			body,
		});
		const data: any = await res.json();

		if (data === null || data === undefined) {
			return null;
		}

		const urlData = data.data;
		const url = urlData.url;
		if (url === undefined) return null;
		console.log("Token: ", token);
		console.log("Res: ", res);
		console.log("Data: ", data);
		return url;
	} catch (error) {
		console.error(error);
		return null;
	}
};
