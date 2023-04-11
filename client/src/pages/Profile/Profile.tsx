import { Link } from "react-router-dom";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Profile.module.css";
import arrow from "../Bitacora/icons/left-arrow.png";
import placeholder from "../Workouts/images/placeholder-image.jpg";

function Profile() {
	return (
		<Dashboard>
			<div className={styles.page}>
				<div className={styles.body}>
					<div className={styles.image_section}>
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
							className={styles.pp}
						/>
						<div className={styles.imagen_acciones}>
							<button className={styles.button_editar}>Editar</button>
							<button className={styles.button_eliminar}>Eliminar</button>
						</div>
					</div>
					<div className={styles.cuenta}>
						<div className={styles.cuenta_header}>
							<img src={placeholder} className={styles.icon_cuenta} />
							<div className={styles.cuenta_title_subtitle}>
								<h3 className={styles.h3}>Cuenta</h3>
								<p className={styles.subtitle}>Edita tu información</p>
							</div>
						</div>
						<div className={styles.cuenta_body}>
							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Nombres:</h5>
								<div className={styles.cuenta_body_row}>
									<p className={styles.cuenta_body_row_value}>
										Sebastian Armando
									</p>
									<img src={arrow} className={styles.arrow_img} />
								</div>
							</div>
							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Apellidos:</h5>
								<div className={styles.cuenta_body_row}>
									<p className={styles.cuenta_body_row_value}>Flores Lemus</p>
									<img src={arrow} className={styles.arrow_img} />
								</div>
							</div>
							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Peso:</h5>
								<div className={styles.cuenta_body_row}>
									<p className={styles.cuenta_body_row_value}>65 kg</p>
									<img src={arrow} className={styles.arrow_img} />
								</div>
							</div>
							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Altura:</h5>
								<div className={styles.cuenta_body_row}>
									<p className={styles.cuenta_body_row_value}>1.73 metros</p>
									<img src={arrow} className={styles.arrow_img} />
								</div>
							</div>
							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Fecha de Nacimiento:</h5>
								<div className={styles.cuenta_body_row}>
									<p className={styles.cuenta_body_row_value}>19 / 02 / 2023</p>
									<img src={arrow} className={styles.arrow_img} />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.entrenamiento}>
						<div className={styles.entrenamiento_header}>
							<img src={placeholder} className={styles.icon_entrenamiento} />
							<div className={styles.entrenamiento_title_subtitle}>
								<h3 className={styles.h3}>Entrenamiento</h3>
								<p className={styles.subtitle}>Lorem ipsum dolor sit</p>
							</div>
						</div>
						<div className={styles.entrenamiento_body}>
							<div className={styles.entrenamiento_body_individual}>
								<h5 className={styles.h5}>Meta:</h5>
								<div className={styles.entrenamiento_body_row}>
									<p className={styles.entrenamiento_body_row_value}>
										Bajar de peso
									</p>
									<img src={arrow} className={styles.arrow_img} />
								</div>
							</div>
							<div className={styles.entrenamiento_body_individual}>
								<h5 className={styles.h5}>Nivel:</h5>
								<div className={styles.entrenamiento_body_row}>
									<p className={styles.entrenamiento_body_row_value}>
										Caminar Diario
									</p>
									<img src={arrow} className={styles.arrow_img} />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.ayuda}>
						<div className={styles.ayuda_header}>
							<img src={placeholder} className={styles.icon_ayuda} />
							<div className={styles.ayuda_title_subtitle}>
								<h3 className={styles.h3}>Ayuda</h3>
								<p className={styles.subtitle}>Lorem ipsum dolor sit</p>
							</div>
						</div>
						<div className={styles.ayuda_body}>
							<div className={styles.ayuda_body_individual}>
								<Link to="/faq" className={styles.link}>
									<div className={styles.ayuda_body_row}>
										<p className={styles.ayuda_body_row_value}>FAQ</p>
										<img src={arrow} className={styles.arrow_img} />
									</div>
								</Link>
							</div>
							<div className={styles.ayuda_body_individual}>
								<Link to="/contactanos" className={styles.link}>
									<div className={styles.ayuda_body_row}>
										<p className={styles.ayuda_body_row_value}>Contáctanos</p>
										<img src={arrow} className={styles.arrow_img} />
									</div>
								</Link>
							</div>
						</div>
					</div>
					<button className={styles.btn_eliminar_cuenta}>
						Eliminar Cuenta
					</button>
					<div className={styles.blankspace}></div>
				</div>
			</div>
		</Dashboard>
	);
}

export default Profile;
