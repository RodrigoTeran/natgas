import { useNavigate } from "react-router-dom";
import styles from "./Register_Page1.module.css";

function Register_Page1() {
	const navigation = useNavigate();
	const onSubmit = () => {
		navigation("/info-registro-dos");
	};

	return (
		<div className={styles.page}>
			<h1>ONYX</h1>
			{/* <img
				className={styles.icon}
				src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
			/> */}
			<h2 className={styles.title}>Registro</h2>

			<form className={styles.content}>
				<input
					className={styles.input_datos}
					type="text"
					name="username"
					placeholder="Username"
					required
				/>
				<br/> <br/>
				<div className={styles.row_medida_input}>
					<input
						className={styles.input_datos}
						type="text"
						name="height"
						placeholder="Height"
						required
					/>
					<div className={styles.medida_unit}>
						<p className={styles.p_medida_unit}>cm</p>
					</div>
				</div>
				<div className={styles.row_medida_input}>
					<input
						className={styles.input_datos}
						type="text"
						name="weight"
						placeholder="Weight"
						required
					/>
					<div className={styles.medida_unit}>
						<p className={styles.p_medida_unit}>kg</p>
					</div>
				</div>
				<input
					className={styles.submit_datos}
					type="submit"
					value="Mas Datos"
					onClick={onSubmit}
				/>
			</form>
		</div>
	);
}

export default Register_Page1;
