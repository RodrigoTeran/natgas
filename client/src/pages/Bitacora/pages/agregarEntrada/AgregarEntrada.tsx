import styles from "./AgregarEntrada.module.css";
import create from "../../icons/writing.png";
import leftArrow from "../../icons/left-arrow.png";
import deleteIcon from "../../icons/trash.png";
import download from "../../icons/download.png";
import { Link } from "react-router-dom";

function AgregarEntrada() {
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
					placeholder="Untitled"
				/>
				<div className={styles.right}>
					{/* <img className={styles.icon} src={create} /> */}
					<img className={styles.icon} src={deleteIcon} />
					<img className={styles.icon} src={download} />
				</div>
			</div>
			<div className={styles.info_row}>
				<input className={styles.date_input} name="date" type="date" />
			</div>

			<div className={styles.content}>
				<textarea name="content" placeholder="Agrega comentarios..." />
			</div>
		</div>
	);
}

export default AgregarEntrada;
