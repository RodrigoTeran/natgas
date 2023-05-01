import Bitacora from "../../models/Bitacora/bitacora.model";
import * as XLSX from "xlsx";
import * as path from "path";
import { Buffer } from "buffer";
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';

export const findByUserLogic = async (date, userId, title, content) => {
	try {
		const rows = await Bitacora.findByUser(
			userId,
			new Date(date),
			title,
			content
		);
		return rows;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// Find entry by user and week date
export const findByUser = async (req, res) => {
	const { date } = req.params;
	const { title, content } = req.query;
	try {
		const rows = await findByUserLogic(date, req.user.id, title, content);
		if (rows === null) {
			res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
			return;
		}

		res.json({
			auth: true,
			msg: "",
			data: rows,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

// Write a new entry to the database
export const newEntry = async (req, res) => {
	const { aDate, title, content } = req.body;

	try {
		const newEntry = new Bitacora(new Date(aDate), title, content);
		await newEntry.newEntry(req.user.id);
		res.json({ msg: "", data: {}, auth: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

// Display data from a specific entry
export const fetchEntry = async (req, res) => {
	// Request params
	const { id } = req.params;
	const clientId = req.user.id;

	// Validate request
	if (!id || !clientId)
		res
			.status(400)
			.json({ msg: "Los datos no son válidos", auth: true, data: {} });

	try {
		const entry = await Bitacora.fetchEntry(clientId, id);
		if (!entry) {
			res
				.status(404)
				.json({ msg: "Entrada no encontrada", auth: true, data: {} });
			return;
		}
		res.json({
			auth: true,
			msg: "",
			// Aqui se manda la informacion de la entrada
			data: entry,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export const updateEntry = async (req, res) => {
	const { id } = req.params;
	const { aDate, title, content } = req.body;
	try {
		const entry = await Bitacora.fetchEntry(req.user.id, id);
		if (entry == null) {
			return res.status(404).json({
				msg: "Entrada no encontrada",
				auth: true,
				data: {},
			});
		}

		entry.aDate = aDate;
		entry.title = title;
		entry.content = content;

		await Bitacora.updateEntry(req.user.id, id, entry);

		res.json({
			auth: true,
			msg: "Entrada actualizada exitosamente",
			data: entry,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

// Delete an entry
export const deleteEntry = async (req, res) => {
	const { id } = req.params;
	try {
		const entry = await Bitacora.fetchEntry(req.user.id, id);
		if (entry == null) {
			return res.status(404).json({
				msg: "Entrada no encontrada",
				auth: true,
				data: {},
			});
		}
		await Bitacora.deleteEntry(req.user.id, id);
		res.json({
			auth: true,
			msg: "Entrada eliminada exitosamente",
			data: entry,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};


export const sendCSV = async (req, res) => {
  try {
    const rows = await findByUserLogic(req.params.date, req.user.id, req.query.title, req.query.content);
    if (rows === null) {
      res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
      return;
    }

		console.log(rows);
		console.log(rows[0].aDate);
		console.log(rows[0].aDate.toISOString().split('T')[0]);
		console.log("--------------")

    const csvData = rows.map(row => ({
      id: row.id,
      aDate: row.aDate,
      title: row.title,
      content: row.content,
    }));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bitacora.csv');
    
    const csvStream = fastcsv.write(csvData, { headers: true });
    csvStream.pipe(res).on('finish', () => res.end());

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
  }
};


// export const generateExcel = async () => {
// 	const data = ['hola', 'mundo'];
// 	const workbook = XLSX.utils.book_new();
// 	const worksheet = XLSX.utils.json_to_sheet(data);
// 	XLSX.utils.book_append_sheet(workbook, worksheet, "Bitacora");
// 	const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
// 	return buffer;
// };

// export const generateCSV = (data: any[], filename: string) => {
//   const ws = fs.createWriteStream(filename);
//   fastcsv
//     .write(data, { headers: true })
//     .pipe(ws)
//     .on('finish', () => {
//       console.log('CSV file created successfully.');
//     });
// };

// // Export to excel
// export async function downloadExcel(req, res): Promise<void> {
//   const { date } = req.params;
//   const { title, content } = req.query;

//   try {
//     const data = await findByUserLogic(date, req.user.id, title, content);
// 		console.log(data);

//     const buffer = await generateExcel();
//     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//     res.setHeader("Content-Disposition", "attachment; filename=Bitacora.xlsx");
//     res.send(buffer);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
//   }
// }

