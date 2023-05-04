import styles from "./ConsultarEntrada.module.css";
import leftArrow from "../../icons/left-arrow.png";
import deleteIcon from "../../icons/trash.png";
import download from "../../icons/download.png";
import { Link } from "react-router-dom";
import {
	deleteEntry,
	getEntry,
	updateEntry,
} from "../../../../routes/bitacora/bitacora.routes";
import {
	useState,
	useEffect,
	useContext,
	SetStateAction,
	Dispatch,
} from "react";
import { MessagesContext } from "../../../../layouts/Messages/Messages";
import PopUp from "../../../../components/Modals/PopUp/PopUp";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedBitacora: React.MutableRefObject<string | null>;
}

function ConsultarEntrada({ isOpen, setIsOpen, selectedBitacora }: Props) {
	const { addStaticMsg } = useContext(MessagesContext);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [date, setDate] = useState<any>(new Date());

	const fetchEntry = async () => {
		try {
			const resData = await getEntry(selectedBitacora.current || "");

			if (resData === null) {
				addStaticMsg("Error al obtener la entrada", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			setTitle(data[0].title);
			setContent(data[0].content);
			setDate(new Date(data[0].createdAt).toISOString().split('T')[0]);
			
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			"¿Estás seguro de eliminar esta entrada?"
		);
		if (!confirmDelete) return;

		const success = await deleteEntry(selectedBitacora.current || "");
			setIsOpen(false);
			window.location.reload();

			if (success === null)alert("Error al eliminar la entrada");
	};

	useEffect(() => {
		if (selectedBitacora.current === null) return;
		fetchEntry();
	}, [selectedBitacora.current]);

	const onSubmit = async (e: any) => {
		e.preventDefault();
		if (!title || !content || !date) {
			addStaticMsg("Por favor, rellene todos los campos", "danger");
			return;
		}

		const id = selectedBitacora.current || "";
		if (!id) {
			addStaticMsg("Error al obtener el id de la entrada", "danger");
			return;
		}
		await updateEntry(id, title, content, date);
		addStaticMsg("Cambios guardados existosamente", "success");
		window.location.reload();
	};

	return (
		<PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className={styles.page}>
				<form onSubmit={onSubmit}>
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
								setTitle(event.target.value);
							}}
							placeholder="Untitled"
						/>
						<div className={styles.right}>
							<img
								className={styles.icon}
								src={deleteIcon}
								onClick={handleDelete}
							/>
						</div>
					</div>
					<div className={styles.info_row}>
						<input
							className={styles.date_input}
							name="date"
							type="date"
							data-date-format="DD MMMM YYYY"
							value={date || ""}
							onChange={(event) => {
								setDate(event.target.value);
							}}
						/>
					</div>

					<div className={styles.content}>
						<textarea
							name="content"
							placeholder="Agrega comentarios..."
							value={content}
							onChange={(event) => {
								setContent(event.target.value);
							}}
						/>
					</div>
					<button onClick={onSubmit} className={styles.botonEntrada}>
						Guardar
					</button>
				</form>
			</div>
		</PopUp>
	);
}

export default ConsultarEntrada;
