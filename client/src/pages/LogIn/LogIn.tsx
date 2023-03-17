import styles from "./LogIn.module.css";
import Btn from "./Btns/Btn";

function LogIn() {
	return (
		<div className={styles.page}>
			<div>LOGO</div>
			<h1>Hola otra vez!</h1>
			<p>
				Lorem ipsum dolor sit amet <br />
				consectetur adipisicing elit
			</p>
			<Btn provider="Google">Inciar sesión con Google</Btn>
			<Btn provider="Facebook">Inciar sesión con Facebook</Btn>
		</div>
	);
}

export default LogIn;
