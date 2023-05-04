import { error } from "console";
import { getClientIdCache } from "../../cache/auth";
import { BITACORA_ROUTE } from "../index";
import { IData } from "../routes.types";
import { unparse } from "papaparse";
import * as XLSX from "xlsx";

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

export interface IDeleteEntryData {
	aDate: string;
	content: string;
	title: string;
}

export const deleteEntry = async (id: string): Promise<boolean | null> => {
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

		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Download entries


export const downloadEntries = async (): Promise<void> => {
  const token = getClientIdCache();
  if (token === null) {
    throw new Error("Something went wrong");
  }

  const res = await fetch(`${BITACORA_ROUTE}/downloadEntries`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (res.status !== 200) {
    throw new Error("Something went wrong");
  }

  const jsonRes = await res.json();
	const rows = jsonRes.data;
  if (rows === null) {
    return;
  }

  // Crear un workbook y agregar una hoja de cálculo
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Bitacora");

  // Convertir el workbook a un ArrayBuffer
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Crear un Blob y descargar el archivo
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `bitacora_usuario_${token}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// const downloadExcel = (
//   notesJSONArray: Array<jsonNotes>,
//   productsJSONArray: Array<jsonProducts>,
//   excelName: string
// ) => {
//   const newExcelSheetNotes: xlsx.WorkSheet = xlsx.utils.json_to_sheet(
//     notesJSONArray
//   );
//   const newExcelSheetProducts: xlsx.WorkSheet = xlsx.utils.json_to_sheet(
//     productsJSONArray
//   );
//   const newWorkBook: xlsx.WorkBook = xlsx.utils.book_new();
//   newWorkBook.SheetNames = ["Por Nota", "Por Prendas"];
//   newWorkBook.Sheets = {
//     "Por Nota": newExcelSheetNotes,
//     "Por Prendas": newExcelSheetProducts,
//   };
//   xlsx.writeFile(newWorkBook, excelName);
// };
