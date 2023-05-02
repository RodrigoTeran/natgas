import styles from "./TopMenuModal.module.css";
import { clearClientIdCache } from "../../../../cache/auth";
import { Link } from "react-router-dom";

function TopMenuModal() {
	const logout = (): void => {
		clearClientIdCache();
		window.location.reload();
	};

	return (
		<div className={styles.page}>
			<Link to="/perfil" className={styles.link}>
				<div className={styles.individual}>
					<p className={styles.p}>Perfil</p>
				</div>
			</Link>
			<div className={styles.border}></div>
			<div className={styles.individual}>
				<p onClick={logout} className={styles.p}>
					Cerrar Sesión
				</p>
			</div>
		</div>
	);
}

export default TopMenuModal;
