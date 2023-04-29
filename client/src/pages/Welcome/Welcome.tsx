import styles from "./Welcome.module.css";
import { useContext } from "react";
import { AppContext } from "../../App";
import BtnPrimary from "./Btns/BtnPrimary/BtnPrimary";
import Menu from "./Menu/Menu";
import iFace from "./icons/facebook.png";
import image_right from "./image/welcome_image_v1.png";
import { Link } from "react-router-dom";

function Welcome() {
	const { user } = useContext(AppContext);

	return (
		<div className={styles.page}>
			<Menu />
			<div className={styles.content}>
				<div className={styles.left}>
					<h2 className={styles.title}>Proyecto ONYX</h2>
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
							{/* <Link to="/iniciar-sesion">
								<BtnPrimary
									message="Signup"
									color="transparent"
									color_text="white"
									borderColor="white"
									children={""}
								/>
							</Link> */}
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

					<div className={styles.icons}>
						<img className={styles.icon} src={iFace} />
						<img className={styles.icon} src={iFace} />
						<img className={styles.icon} src={iFace} />
					</div>
				</div>
				<div className={styles.right}>
					{/*<img className={styles.image_right} src={image_right} />*/}
				</div>
			</div>
		</div>
	);
}

export default Welcome;
