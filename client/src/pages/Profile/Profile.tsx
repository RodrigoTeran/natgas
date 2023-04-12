import { Link } from "react-router-dom";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Profile.module.css";
import arrow from "../Bitacora/icons/left-arrow.png";
import placeholder from "../Workouts/images/placeholder-image.jpg";
import { useState } from "react";

function Profile() {
	const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
	const [nombres, setNombres] = useState<string>("Sebastian Armando");
	const [apellidos, setApellidos] = useState<string>("Flores Lemus");
	const [weight, setWeight] = useState<number>(60);
	const [height, setHeight] = useState<number>(1.7);
	const [birthDate, setBirthDate] = useState<string>("19 / 02 / 2023");
	const [goal, setGoal] = useState<string>("Bajar de peso");
	const [level, setLevel] = useState<string>("Caminar diario");

	const handleEdit = (field: string) => {
		setCurrentlyEditing(field);
	};

	const handleCancel = () => {
		setCurrentlyEditing(null);
	};

	const handleSave = () => {
		// proximos fetches
		setCurrentlyEditing(null);
	};

	const renderEditableField = (
		fieldKey: string,
		fieldValue: string | number,
		label: string
	) => {
		return (
			<div className={styles.cuenta_body_individual}>
				<div className={styles.titulo_botones_row}>
					<h5 className={styles.h5}>{label}:</h5>
					{currentlyEditing === fieldKey && (
						<div className={styles.botones_input}>
							<button className={styles.button_cancelar} onClick={handleCancel}>
								Cancelar
							</button>
							<button className={styles.button_guardar} onClick={handleSave}>
								Guardar
							</button>
						</div>
					)}
				</div>

				<div className={styles.cuenta_body_row}>
					{currentlyEditing === fieldKey ? (
						<input
							type="text"
							value={fieldValue}
							className={`${styles.cuenta_body_row_value} ${
								currentlyEditing === fieldKey ? styles.active : ""
							}`}
							onChange={(e) => {
								if (fieldKey === "nombres") {
									setNombres(e.target.value);
								} else if (fieldKey === "apellidos") {
									setApellidos(e.target.value);
								} else if (fieldKey === "weight") {
									setWeight(parseFloat(e.target.value));
								} else if (fieldKey === "height") {
									setHeight(parseFloat(e.target.value));
								} else if (fieldKey === "birthDate") {
									setBirthDate(e.target.value);
								} else if (fieldKey === "goal") {
									setGoal(e.target.value);
								} else if (fieldKey === "level") {
									setLevel(e.target.value);
								}
							}}
						/>
					) : (
						<p className={styles.cuenta_body_row_value}>{fieldValue}</p>
					)}
					<img
						src={arrow}
						className={styles.arrow_img}
						onClick={() => handleEdit(fieldKey)}
					/>
				</div>
			</div>
		);
	};
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
							{renderEditableField("nombres", nombres, "Nombres")}
							{renderEditableField("apellidos", apellidos, "Apellidos")}
							{renderEditableField("weight", `${weight} kg`, "Peso")}
							{renderEditableField("height", `${height} metros`, "Altura")}
							{renderEditableField(
								"birthDate",
								birthDate,
								"Fecha de Nacimiento"
							)}
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
							{renderEditableField("goal", goal, "Meta")}
							{renderEditableField("level", level, "Nivel")}
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
