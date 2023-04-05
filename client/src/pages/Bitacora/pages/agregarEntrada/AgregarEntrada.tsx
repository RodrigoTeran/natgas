import styles from "./AgregarEntrada.module.css";
import leftArrow from "../../icons/left-arrow.png";
import deleteIcon from "../../icons/trash.png";
import download from "../../icons/download.png";
import { Link, useNavigate } from "react-router-dom";
import { createEntry } from "../../../../routes/bitacora/bitacora.routes";
import { MessagesContext } from "../../../../layouts/Messages/Messages";
import { useState, useContext } from "react";

function AgregarEntrada() {
	const navigation = useNavigate();

	const { addStaticMsg } = useContext(MessagesContext);

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [date, setDate] = useState<any>(new Date());

	// A React no le gusta llamar funciones asincroncas directamente del
	// html... por eso cree una sin async, que dentro de ella
	// llama a una funcion asincrona
	const onSubmit = () => {
		const doFetch = async (): Promise<void> => {
			const body: any = {
				title,
				content,
				aDate: date,
			};
			const resData = await createEntry(body);

			if (resData === null) {
				addStaticMsg("Error al agregar entrada", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			navigation("/bitacora");
		};
		doFetch();
	};

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<div className={styles.regresar}>
					<Link className={styles.link} to="/bitacora">
						<img className={styles.icon} src={leftArrow} />
					</Link>
					<Link className={styles.link} to="/bitacora">
						<p className={styles.close}>Regresar</p>
					</Link>
				</div>
				<input
					className={styles.title_input}
					type="text"
					name="title"
					id="my-input"
					value={title}
					onChange={(event) => {
						// event es la variable que tiene como valor
						// el input

						// para acceder al valor actual de input
						// lo accedemos de event.target.value
						setTitle(event.target.value);
					}}
					placeholder="Untitled"
				/>
				<div className={styles.right}>
					{/* <img className={styles.icon} src={create} /> */}
					<img className={styles.icon} src={deleteIcon} />
					<img className={styles.icon} src={download} />
				</div>
			</div>
			<div className={styles.info_row}>
				<input
					className={styles.date_input}
					name="date"
					type="date"
					value={date}
					onChange={(event) => {
						// event es la variable que tiene como valor
						// el input

						// para acceder al valor actual de input
						// lo accedemos de event.target.value
						setDate(event.target.value);
					}}
				/>
			</div>

			<div className={styles.content}>
				<textarea
					name="content"
					className={styles.agregar_textarea}
					placeholder="Agrega comentarios..."
					value={content}
					onChange={(event) => {
						// event es la variable que tiene como valor
						// el input

						// para acceder al valor actual de input
						// lo accedemos de event.target.value
						setContent(event.target.value);
					}}
				/>
			</div>
			<button onClick={onSubmit} className={styles.botonEntrada}>
				Guardar
			</button>
		</div>
	);
}

export default AgregarEntrada;
