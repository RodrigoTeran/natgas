import React, { useState } from "react";
import styles from "./Table.module.css";

interface DataRow {
	col1: string;
	col2: string;
	col3: string;
	col4: string;
}

const Table: React.FC = () => {
	const [rows, setRows] = useState<DataRow[]>([]);

	const addRow = () => {
		const newRow: DataRow = {
			col1: `Miercoles`,
			col2: `28/03/2023`,
			col3: `S 3x5 100kg OHP 3x5 60`,
			col4: `Tuve una molestia pequeña en la rodilla`,
		};
		setRows([...rows, newRow]);
	};

	return (
		<div className={styles.page}>
			<button onClick={addRow}>Agregar fila</button>
			<table>
				<thead>
					<tr>
						<th className={styles.col1}>Día</th>
						<th className={styles.col2}>Fecha</th>
						<th className={styles.col3}>Entreno</th>
						<th className={styles.col4}>Comentarios</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr key={index}>
							<td className={styles.td_col1}>
								<div className={styles.cell_content}>{row.col1}</div>
							</td>
							<td className={styles.td_col2}>
								<div className={styles.cell_content}>{row.col2}</div>
							</td>
							<td className={styles.td_col3}>
								<div className={styles.cell_content}>{row.col3}</div>
							</td>
							<td className={styles.td_col4}>
								<div className={styles.cell_content}>{row.col4}</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
