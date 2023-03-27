import styles from "./TopMenuModal.module.css";
import { clearClientIdCache } from "../../../../cache/auth";

function TopMenuModal() {

	const logout = (): void => {
		clearClientIdCache();
		window.location.reload();
	};

	return (
		<div className={styles.page}>
			<div className={styles.individual}>
				<img
					className={styles.icon}
					src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
				/>
				<p className={styles.p}>Perfil</p>
			</div>
			<div className={styles.border}></div>
			<div className={styles.individual}>
				<img
					className={styles.icon}
					src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
				/>
				<p onClick={logout} className={styles.p}>Cerrar Sesion</p>
			</div>
		</div>
	);
}

export default TopMenuModal;
