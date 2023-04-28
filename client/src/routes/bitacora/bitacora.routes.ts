import { getClientIdCache } from "../../cache/auth";
import { BITACORA_ROUTE } from "../index";
import { IData } from "../routes.types";

interface ICreateEntry {
	aDate: Date;
	title: string;
	content: string;
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
	aDate: string;
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
	aDate: string;
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
	aDate: string;
	content: string;
	title: string;
}

export const updateEntry = async (
	id: string,
	aDate: Date,
	title: string,
	content: string
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
			body: JSON.stringify({ id, aDate, title, content }),
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

// delete entry

export interface IDeleteEntryData {
	aDate: string;
	content: string;
	title: string;
}

export const deleteEntry = async (
	id: string
): Promise<IDeleteEntryData[] | null> => {
	try {
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

		return resData.data as IDeleteEntryData[];
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Download entries

export const downloadExcel = async (): Promise<void> => {
  try {
    const token = getClientIdCache();
    if (token === null) {
      throw new Error("Something went wrong");
    }

    const res = await fetch(`${BITACORA_ROUTE}/downloadExcel`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    // Cambia la respuesta a Blob
    const blob = await res.blob();

    // Crea un enlace temporal para iniciar la descarga del archivo
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Bitacora.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};
