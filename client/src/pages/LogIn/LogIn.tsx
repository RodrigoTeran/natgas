import styles from "./LogIn.module.css";
import Btn from "./Btns/Btn";
import { AUTH_ROUTE } from "../../routes/index";
import { Link } from "react-router-dom";

function LogIn() {
	return (
		<div className={styles.page}>
			<div className={styles.top}>
				<div>
				<h1 className={styles.titulo}>ONYX</h1>
				</div>
				{/* <img
					className={styles.icon}
					src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
				/> */}
				<div>
				<h2 className={styles.title}>¡Hola otra vez!</h2>
				</div>

				<div>
				<p className={styles.p}>
					Ingresa con tu cuenta de Google
				</p>
				</div>
				<div>
				<a className={styles.button_login} href={`${AUTH_ROUTE}/google`}>
					<img
						className={styles.img_icon}
						src="https://static.vecteezy.com/system/resources/previews/010/353/285/non_2x/colourful-google-logo-on-white-background-free-vector.jpg"
					/>
					<p className={styles.p_button}>Ingresa</p>
				</a>
				</div>
			</div>
			{/* <div className={styles.bottom}>
				<p className={styles.register_p}>
					Don't have an account yet?{" "}
					<Link className={styles.underlineless} to="/registro">
						<span className={styles.register_span}>Register</span>
					</Link>
				</p>
			</div> */}
		</div>
	);
}

export default LogIn;
