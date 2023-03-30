import styles from "./Register_Page1.module.css";

function Register_Page1() {
	return (
		<div className={styles.page}>
			<img
				className={styles.icon}
				src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
			/>
			<h1 className={styles.title}>Hola otra vez!</h1>
			<p className={styles.p}>
				Lorem ipsum dolor sit amet <br />
				consectetur adipisicing elit
			</p>
			<form className={styles.content}>
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
			</form>
		</div>
	);
}

export default Register_Page1;
