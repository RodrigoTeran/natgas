import { useState } from "react";
import styles from "./InfoRegistro.module.css";

function InfoRegistro() {
	const [page1, setPage1] = useState(true);
	const [page2, setPage2] = useState(false);

	const handlePage1 = () => {
		setPage1(true);
	};
	const handlePage2 = () => {
		setPage2(true);
	};

	return (
		<div className={styles.page}>
			<div className={styles.top}>
				<img
					className={styles.icon}
					src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
				/>
				<h1 className={styles.title}>Hola otra vez!</h1>
				<p className={styles.p}>
					Lorem ipsum dolor sit amet <br />
					consectetur adipisicing elit
				</p>
				<input
					className={styles.input_datos}
					type="text"
					name="username"
					placeholder="Username"
					required
				/>

				<h1 className={styles.title}>Hola otra vez!</h1>

				<input
					className={styles.input_datos}
					type="text"
					name="height"
					placeholder="Height"
					required
				/>

				<input
					className={styles.input_datos}
					type="text"
					name="weight"
					placeholder="Weight"
					required
				/>

				<input
					className={styles.submit_datos}
					type="submit"
					value="Mas Datos"
				/>

				<div className={styles.pages_points}>
					<span className={styles.dot}></span>
					<span className={styles.dot}></span>
				</div>
			</div>
		</div>
	);
}

export default InfoRegistro;
