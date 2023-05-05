import { Fragment, useState } from "react";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Home.module.css";
import BitacoraContent from "../Bitacora/BitacoraContent";
import { ProgresoHome } from "../Progreso/ProgresoHome";
import DietasFavsHome from "../Dietas/DietasFavsHome";
import WorkoutsHome from "../Workouts/WorkoutsHome";

function Home() {
	return (
		<Dashboard>
			<div className={styles.content}>
				<div className={styles.left}>
					<div className={styles.section_dietas}>
						<h3>Dietas Favoritas</h3>

						<DietasFavsHome />
					</div>
					<div className={styles.section_rutinas}>
						<h3>Rutinas Favoritas</h3>
						<WorkoutsHome />
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.section_progreso}>
						<h3>Progreso</h3>
						<ProgresoHome />
					</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<BitacoraContent />
			</div>
		</Dashboard>
	);
}

export default Home;
