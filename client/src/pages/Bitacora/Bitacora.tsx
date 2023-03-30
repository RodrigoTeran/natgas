import { Link } from "react-router-dom";
import styles from "./Bitacora.module.css";
import Table from "./components/Table/Table";
import arrow from "./icons/arrow-down.png";
import createIcon from "./icons/writing.png";
import Layout from "../../layouts/Dashboard/Dashboard";
import { useEffect, useRef, useState } from "react";
import { getEntries } from "../../routes/bitacora/bitacora.routes";
import { DataRow } from "./components/Table/Table";

function Bitacora() {
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [rows, setRows] = useState<DataRow[]>([]);

	const fetchController = useRef(false);

	const anotherWeek = (): number => {
		const currentDateAnother = new Date(currentDate);

		return new Date(
			currentDateAnother.setDate(currentDateAnother.getDate() + 6)
		).getDate();
	};

	const addRow = (data: any) => {
		const dateF = new Date(data.aDate);

		const dateGood =
			dateF.getFullYear() +
			"-" +
			(dateF.getMonth() + 1) +
			"-" +
			dateF.getDate();

		const newRow: DataRow = {
			col1: dateF.toLocaleString("en-us", { weekday: "long" }),
			col2: dateGood,
			col3: data.title,
			col4: data.content,
			col5: data.id,
		};
		console.log(data);
		setRows((currentValue) => [...currentValue, newRow]);
	};

	const getEntriesC = () => {
		const doFetch = async (): Promise<void> => {
			const data = await getEntries(currentDate);

			if (data === null) return;

			for (let i = 0; i < data.length; i++) {
				addRow(data[i]);
			}
		};
		doFetch();
	};

	useEffect(() => {
		if (fetchController.current) return;
		fetchController.current = true;

		getEntriesC();
	}, []);

	return (
		<Layout>
			<div className={styles.page}>
				<h2 className={styles.title}>Bitacora</h2>
				<div className={styles.content}>
					<div className={styles.header}>
						<div className={styles.search_container}>
							<input
								className={styles.input_search}
								placeholder="Buscar"
							></input>
						</div>
						<div className={styles.scroll}>
							<div className={styles.arrow_box}>
								<img
									alt="flecha"
									className={styles.arrow_left}
									src={arrow}
								></img>
							</div>
							<p className={styles.date_range_text}>
								{currentDate.getDate()} - {anotherWeek()}
							</p>
							<div className={styles.arrow_box}>
								<img
									alt="flecha"
									className={styles.arrow_right}
									src={arrow}
								></img>
							</div>
						</div>
						<Link className={styles.link} to="/agregar-entrada">
							<div className={styles.agregar}>
								<img
									className={styles.createIcon}
									src={createIcon}
									alt="Agregar"
								/>
							</div>
						</Link>
					</div>
					<div className={styles.table}>
						<Table rows={rows} />
						<div className={styles.table_body}></div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Bitacora;
