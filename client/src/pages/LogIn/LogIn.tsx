import styles from "./LogIn.module.css";
import Btn from "./Btns/Btn";
<<<<<<< HEAD
=======
import { logInRoute } from "../../routes/auth/auth.routes";
import { Link } from "react-router-dom";
>>>>>>> dev

function LogIn() {
	return (
		<div className={styles.page}>
<<<<<<< HEAD
			<div>LOGO</div>
			<h1>Hola otra vez!</h1>
			<p>
				Lorem ipsum dolor sit amet <br />
				consectetur adipisicing elit
			</p>
			<Btn color="#1F87FC" provider="Google">
				<div className={styles.content}>
					Inciar sesión con <span className={styles.bold}>Google</span>
				</div>
			</Btn>
			<Btn color="#3C5998" provider="Facebook">
				<div className={styles.content}>
					Inciar sesión con <span className={styles.bold}>Facebook</span>
				</div>
			</Btn>
=======
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
				<Btn color="#1F87FC" provider="Google">
					<div className={styles.content}>
						Inciar sesión con <span className={styles.bold}>Google</span>
					</div>
				</Btn>
				<a href={logInRoute}>Iniciar sesión</a>
				<Btn color="#3C5998" provider="Facebook">
					<div className={styles.content}>
						Inciar sesión con <span className={styles.bold}>Facebook</span>
					</div>
				</Btn>
			</div>
			<div className={styles.bottom}>
				<p className={styles.register_p}>
					Don't have an account yet?{" "}
					<Link className={styles.underlineless} to="/registro">
						<span className={styles.register_span}>Register</span>
					</Link>
				</p>
			</div>
>>>>>>> dev
		</div>
	);
}

export default LogIn;
