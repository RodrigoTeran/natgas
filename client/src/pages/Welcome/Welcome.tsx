import styles from "./Welcome.module.css";
import { useContext } from "react";
import { AppContext } from "../../App";
import BtnPrimary from "./Btns/BtnPrimary/BtnPrimary";
import Menu from "./Menu/Menu";
import iFace from "./icons/facebook.png";
import { Link } from "react-router-dom";

function Welcome() {
	const { user } = useContext(AppContext);

	return (
		<div className={styles.page}>
			<Menu />
			<div className={styles.content}>
				<div className={styles.aux}>
					<div className={styles.typed_out}>
						<div className={styles.title}>Bienvenido al Proyecto ONYX</div>
					</div>
					<p className={styles.p}>
						Una plataforma web donde conseguiras tus objetivos
						físicos, estéticos y de salud de forma eficiente.
						<br/> <br/>
						Con nosotros conseguiras tus objetivos con 
						dietas, rutinas y un monitoreo constante a través 
						de gráficas de progreso y una bitácora totalmente
						personal.
					</p>
					{user === null && (
						<>
							<Link to="/iniciar-sesion">
								<BtnPrimary
									color="#FF6159"
									color_text="white"
									borderColor="transparent"
								>
									Iniciar sesión
								</BtnPrimary>
							</Link>
						</>
					)}
					{user !== null && (
						<Link to="/inicio">
							<BtnPrimary
								color="#FF6159"
								color_text="white"
								borderColor="transparent"
							>
								Ingresar
							</BtnPrimary>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

export default Welcome;
