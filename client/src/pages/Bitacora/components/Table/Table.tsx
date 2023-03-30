import React from "react";
import styles from "./Table.module.css";

export interface DataRow {
	col1: string;
	col2: string;
	col3: string;
	col4: string;
}

interface Props {
	rows: DataRow[];
}

const Table = ({ rows }: Props) => {
	return (
		<div className={styles.page}>
			{/* <button onClick={addRow}>Agregar fila</button> */}
			<table>
				<thead>
					<tr>
						<th className={styles.col1}>Día</th>
						<th className={styles.col2}>Fecha</th>
						<th className={styles.col3}>Título</th>
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
