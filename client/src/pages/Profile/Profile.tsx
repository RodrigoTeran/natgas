import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Profile.module.css";

function Profile() {
	return (
		<Dashboard>
			<div className={styles.page}>
				<div className={styles.image_section}>
					<img src="" className={styles.pp} />
					<div className={styles.imagen_acciones}>
						<button className={styles.button_editar}>Editar</button>
						<button className={styles.button_eliminar}>Eliminar</button>
					</div>
				</div>
				<div className={styles.cuenta}>
					<div className={styles.cuenta_header}>
						<img src="" className={styles.icon_cuenta} />
						<div className={styles.cuenta_title_subtitle}>
							<h3 className={styles.h3}>Cuenta</h3>
							<p className={styles.subtitle}>Cuenta</p>
						</div>
					</div>
					<div className={styles.cuenta_body}>
						<div className={styles.cuenta_body_row}>
							<div className={styles.cuenta_body_row_title_p}>
								<h5 className={styles.h5}>Nombres:</h5>
								<p className={styles.cuenta_body_row_value}>
									Sebastian Armando
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dashboard>
	);
}

export default Profile;
