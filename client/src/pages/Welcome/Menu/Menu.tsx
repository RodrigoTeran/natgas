import styles from "./Menu.module.css";
import { Link } from "react-router-dom";

function Menu() {
	return (
		<div className={styles.page}>
			<div className={styles.start}>
				<Link className={styles.link} to="/bienvenido">
					<p className={styles.logo_text}>Logo</p>
				</Link>
			</div>
			<div className={styles.end}>
				<Link className={styles.link} to="/bienvenido">
					<p className={styles.individual}>Inicio</p>
				</Link>
				<p className={styles.individual}>Lorem</p>
				<p className={styles.individual}>Lorem</p>
				<Link className={styles.link} to="/contact">
					<p className={styles.individual}>Contáctanos</p>
				</Link>
			</div>
		</div>
	);
}

export default Menu;
