import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register_Page1.module.css";

function Register_Page1() {
	const navigation = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [height, setHeight] = useState<number>();
	const [weight, setWeight] = useState<number>();
	const [birthDate, setBirthDate] = useState<Date>();
	const [goal, setGoal] = useState<string>("");
	const [level, setLevel] = useState<string>("");
	const [sex, setSex] = useState<string>("");

	const isValid1 = () => {
		if (username.trim() == "" || height == null || weight == null) {
			return false;
		}
	};

	const isValid2 = () => {
		if (birthDate == null || goal == "" || level == "" || sex == "") {
			return false;
		}
	};

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
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<br/> <br/>
				<div className={styles.row_medida_input}>
					<input
						className={styles.input_datos}
						type="number"
						name="height"
						placeholder="Height"
						onChange={(event) => {
							setHeight(Number(event.target.value));
						}}
					/>
					<div className={styles.medida_unit}>
						<p className={styles.p_medida_unit}>cm</p>
					</div>
				</div>
				<div className={styles.row_medida_input}>
					<input
						className={styles.input_datos}
						type="number"
						name="weight"
						placeholder="Weight"
						onChange={(event) => {
							setWeight(Number(event.target.value));
						}}
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
