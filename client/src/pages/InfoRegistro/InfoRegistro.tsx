import { useState } from "react";
import Register_Page1 from "./pages/Register_Page1/Register_Page1";
import Register_Page2 from "./pages/Register_Page2/Register_Page2";
import styles from "./InfoRegistro.module.css";

function InfoRegistro() {
	const [page1, setPage1] = useState(false);
	const [page2, setPage2] = useState(true);

	const handlePage1 = () => {
		setPage1(true);
	};
	const handlePage2 = () => {
		setPage2(true);
	};

	return (
		<div className={styles.page}>
			{page1 && <Register_Page1 />}
			{page2 && <Register_Page2 />}
			<div className={styles.pages_points}>
				<span className={styles.dot}></span>
				<span className={styles.dot}></span>
			</div>
		</div>
	);
}

export default InfoRegistro;
