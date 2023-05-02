import { Link } from "react-router-dom";
import styles from "./Bitacora.module.css";
import Table from "./components/Table/Table";
import arrow from "./icons/arrow-down.png";
import createIcon from "./icons/writing.png";
import download from "./icons/download.png";
import Layout from "../../layouts/Dashboard/Dashboard";
import { useEffect, useRef, useState, useContext } from "react";
import { getEntries } from "../../routes/bitacora/bitacora.routes";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { DataRow } from "./components/Table/Table";
import ConsultarEntrada from "./pages/consultarEntrada/ConsultarEntrada";
import { downloadEntries } from "../../routes/bitacora/bitacora.routes";

function Bitacora() {
	const { addStaticMsg } = useContext(MessagesContext);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [rows, setRows] = useState<DataRow[]>([]);
	const [isBitacoraOpen, setIsBitacoraOpen] = useState<boolean>(false);
	const [searchText, setSearchText] = useState("");
	const [allRows, setAllRows] = useState<DataRow[]>([]);

	const fetchController = useRef(false);
	const selectedBitacora = useRef<string | null>(null);

	const prevWeek = (): Date => {
		const currentDateAnother = new Date(currentDate);

		return new Date(
			currentDateAnother.setDate(currentDateAnother.getDate() - 6)
		);
	};

	const nextWeek = (): Date => {
		const currentDateAnother = new Date(currentDate);

		return new Date(
			currentDateAnother.setDate(currentDateAnother.getDate() + 6)
		);
	};

	const addRow = (data: any) => {
		const dateF = new Date(data.createdAt);

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
		setRows((currentValue) => [...currentValue, newRow]);
	};

	const getEntriesC = () => {
		const doFetch = async (): Promise<void> => {
			const resData = await getEntries(currentDate, "", "");

			if (resData === null) {
				addStaticMsg("Error al obtener las entradas", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			for (let i = 0; i < data.length; i++) {
				addRow(data[i]);
			}
		};
		doFetch();
	};

	const createRow = (data: any) => {
		const dateF = new Date(data.createdAt);
		const dateGood =
			dateF.getFullYear() +
			"-" +
			(dateF.getMonth() + 1) +
			"-" +
			dateF.getDate();

		return {
			col1: dateF.toLocaleString("en-us", { weekday: "long" }),
			col2: dateGood,
			col3: data.title,
			col4: data.content,
			col5: data.id,
		};
	};

	const searchEntries = async (input: string) => {
		const resData = await getEntries(currentDate, input, input);

		if (resData === null) {
			addStaticMsg("Error al obtener las entradas", "danger");
			return;
		}

		if (resData.msg !== "") {
			addStaticMsg(resData.msg, "danger");
			return;
		}

		const data = resData.data;
		const newRows: DataRow[] = [];

		for (let i = 0; i < data.length; i++) {
			const newRow = createRow(data[i]);
			newRows.push(newRow);
		}

		setRows(newRows);
	};

	useEffect(() => {
		getEntriesC();
	}, [currentDate]);

	return (
		<>
			<ConsultarEntrada
				isOpen={isBitacoraOpen}
				setIsOpen={setIsBitacoraOpen}
				selectedBitacora={selectedBitacora}
			/>
			<Layout>
				<div className={styles.page}>
					<h2 className={styles.title}>Bitacora</h2>
					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.search_container}>
								<input
									className={styles.input_search}
									placeholder="Buscar"
									value={searchText}
									onChange={(e) => {
										setSearchText(e.target.value);
										searchEntries(e.target.value);
									}}
								></input>
							</div>
							<div className={styles.scroll}>
								<div
									className={styles.arrow_box}
									onClick={(e) => setCurrentDate(prevWeek())}
								>
									<img
										alt="flecha"
										className={styles.arrow_left}
										src={arrow}
									></img>
								</div>
								<p className={styles.date_range_text}>
									{currentDate.getDate() +
										" / " +
										currentDate.toLocaleString("default", { month: "short" }) +
										" / " +
										currentDate.getFullYear()}{" "}
									&nbsp;&nbsp; - &nbsp; &nbsp;{" "}
									{nextWeek().getDate() +
										" / " +
										nextWeek().toLocaleString("default", { month: "short" }) +
										" / " +
										nextWeek().getFullYear()}
								</p>
								<div
									className={styles.arrow_box}
									onClick={(e) => setCurrentDate(nextWeek())}
								>
									<img
										alt="flecha"
										className={styles.arrow_right}
										src={arrow}
									></img>
								</div>
							</div>
							<div className={styles.agregar}>
								<Link to="/agregar-entrada">
									<img
										className={styles.createIcon}
										src={createIcon}
										alt="Agregar"
									/>
								</Link>
							</div>
							<div onClick={downloadEntries}>
								<img className={styles.icon} src={download} alt="Descargar" />
							</div>
						</div>
						<div className={styles.table}>
							<Table
								rows={rows}
								selectedBitacora={selectedBitacora}
								setIsOpen={setIsBitacoraOpen}
							/>
							<div className={styles.table_body}></div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Bitacora;
