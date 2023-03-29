import { Link } from "react-router-dom";
import styles from "./Bitacora.module.css";
import Table from "./components/Table/Table";
import arrow from "./icons/arrow-down.png";
import createIcon from "./icons/writing.png";

function Bitacora() {
	return (
		<div className={styles.page}>
			<h2 className={styles.title}>Bitacora</h2>
			<div className={styles.content}>
				<div className={styles.header}>
					<div className={styles.search_container}>
						<input className={styles.input_search} placeholder="Buscar"></input>
					</div>
					<div className={styles.scroll}>
						<div className={styles.arrow_box}>
							<img alt="flecha" className={styles.arrow_left} src={arrow}></img>
						</div>
						<p className={styles.date_range_text}>06 mar - 13 mar</p>
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
					<Table />
					<div className={styles.table_body}></div>
				</div>
			</div>
		</div>
	);
}

export default Bitacora;
