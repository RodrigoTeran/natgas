import styles from "./Register.module.css";
import Btn from "../LogIn/Btns/Btn";
import { Link } from "react-router-dom";

function Register() {
	return (
		<div className={styles.page}>
			<div className={styles.top}>
				<img
					className={styles.icon}
					src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
				/>
				<h1 className={styles.title}>Bounjourno!</h1>
				<p className={styles.p}>
					Lorem ipsum dolor sit amet <br />
					consectetur adipisicing elit
				</p>
				<Link className={styles.underlineless} to="/info-registro">
					<Btn color="#1F87FC" provider="Google">
						<div className={styles.content}>
							Inciar sesión con <span className={styles.bold}>Google</span>
						</div>
					</Btn>
				</Link>
				<Btn color="#3C5998" provider="Facebook">
					<div className={styles.content}>
						Inciar sesión con <span className={styles.bold}>Facebook</span>
					</div>
				</Btn>
			</div>
			<div className={styles.bottom}>
				<p className={styles.register_p}>
					Don't have an account yet?{" "}
					<span className={styles.register_span}>Register</span>
				</p>
			</div>
		</div>
	);
}

export default Register;
