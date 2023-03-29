import styles from "./Bitacora.module.css";
import Table from "./components/Table/Table";
import Tabla from "./components/Table/Table";
import icon from "./icons/arrow-down.png";
import createIcon from "./icons/writing.png";

function Bitacora() {
	return (
		<div className={styles.page}>
			<h2 className={styles.title}>Bitacora</h2>
			<div className={styles.content}>
				<div className={styles.header}>
					<input className={styles.input_search} placeholder="Buscar"></input>
					<div className={styles.scroll}>
						<div className={styles.arrow_box}>
							<img className={styles.arrow_left} src={icon}></img>
						</div>
						<p className={styles.date_range_text}>06 mar - 13 mar</p>
						<div className={styles.arrow_box}>
							<img className={styles.arrow_right} src={icon}></img>
						</div>
					</div>
					<div className={styles.agregar}>
						<img className={styles.createIcon} src={createIcon} alt="Agregar" />
					</div>
				</div>
				<div className={styles.table}>
					<Table />
					<div className={styles.table_body}></div>
				</div>
			</div>
		</div>
	);
}

export default Bitacora;
