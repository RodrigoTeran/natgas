import { Link } from "react-router-dom";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Profile.module.css";
import arrow from "../Bitacora/icons/left-arrow.png";
import placeholder from "../Workouts/images/placeholder-image.jpg";
import { useContext, useEffect, useState } from "react";
import {
	deleteUser,
	fetchInfo,
	updateBlock1,
	updateBlock2,
} from "../../routes/auth/auth.routes";
import { getClientIdCache } from "../../cache/auth";
import { MessagesContext } from "../../layouts/Messages/Messages";
import Dropdown from "../../components/Dropdown/Dropdown";

function Profile() {
	const { addStaticMsg } = useContext(MessagesContext);
	const [currentlyEditing, setCurrentlyEditing] = useState<boolean>(false);
	const [currentlyEditingEntreno, setCurrentlyEditingEntreno] =
		useState<boolean>(false);
	const [nombres, setNombres] = useState<string>("");
	const [apellidos, setApellidos] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [weight, setWeight] = useState<number>();
	const [height, setHeight] = useState<number>();
	const [birthDate, setBirthDate] = useState<string>("");
	const [goal, setGoal] = useState<string>("Placeholder");
	const [level, setLevel] = useState<string>("Placeholder");
	const [isOpenMeta, setIsOpenMeta] = useState<boolean>(false);
	const [isMetaOpciones, setIsMetaOpciones] = useState<
		"1" | "2" | "3" | "-- Selecciona Meta --"
	>("-- Selecciona Meta --");
	const [isOpenNivel, setIsOpenNivel] = useState<boolean>(false);
	const [isNivelOpciones, setIsNivelOpciones] = useState<
		"1" | "2" | "3" | "-- Selecciona Nivel --"
	>("-- Selecciona Nivel --");

	const handleEdit = (field: string) => {
		setCurrentlyEditing(true);
	};

	const handleCancel = () => {
		setCurrentlyEditing(false);
	};

	const handleSave = () => {
		// proximos fetches
		setCurrentlyEditing(false);
	};
	const handleEditEntreno = () => {
		setCurrentlyEditingEntreno(true);
	};

	const handleCancelEntreno = () => {
		setCurrentlyEditingEntreno(false);
	};

	// const handleSaveEntreno = () => {
	// 	// proximos fetches
	// 	setCurrentlyEditingEntreno(false);
	// };

	const handleDelete = async () => {
		try {
			const id = getClientIdCache();
			console.log(id);
			if (id === null) {
				console.error("No se pudo obtener el ID del usuario");
				return;
			}
			await deleteUser(id);
			console.log("Usuario eliminado");
			window.location.href = "/";
		} catch (error) {
			console.log(error);
		}
	};

	const isValid = () => {
		if (
			nombres.trim() === "" ||
			apellidos.trim() === "" ||
			weight === null ||
			height === null ||
			birthDate === null
		) {
			return false;
		}
		return true;
	};

	const onSubmit1 = () => {
		if (!isValid()) {
			return;
		}

		const doFetch = async (): Promise<void> => {
			const body: any = {
				nombres,
				apellidos,
				username,
				height,
				weight,
				dateOfBirth: birthDate,
			};
			const id = getClientIdCache();
			console.log(id);

			if (id === null) {
				return;
			}

			let resData;

			resData = await updateBlock1(id, body);

			if (resData === null) {
				addStaticMsg("Error al agregar ejercicio", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			addStaticMsg("Se editó un ejercicio con éxito", "success");
		};
		void doFetch();
	};
	const onSubmit2 = () => {
		// if (!isValid()) {
		// 	return;
		// }

		const doFetch = async (): Promise<void> => {
			const body: any = {
				goal,
				level,
			};
			const id = getClientIdCache();
			console.log(id);

			if (id === null) {
				return;
			}

			let resData;
			resData = await updateBlock2(id, body);
			console.log("resData", resData);

			if (resData === null) {
				addStaticMsg("Error al agregar ejercicio", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			addStaticMsg("Se editó un ejercicio con éxito", "success");
			setCurrentlyEditingEntreno(false);
		};
		void doFetch();
	};

	const clientInfo = async () => {
		const doFetch = async (): Promise<void> => {
			const id = getClientIdCache();
			console.log(id);
			if (id === null) {
				console.log("error de id");
				return;
			}
			try {
				const resData = await fetchInfo(id);

				if (resData === null) {
					addStaticMsg("Error al obtener la info del cliente", "danger");
					return;
				}
				const data = resData.data;
				console.log(data.firstname);

				setNombres(data.firstName);
				setApellidos(data.lastName);
				setUsername(data.username);
			} catch (e) {
				console.log(e);
			}
		};
		void doFetch();
	};
	// useEffect(() => {
	// 	clientInfo();
	// }, []);

	const renderEditableField = (
		fieldKey: string,
		fieldValue: string | number,
		label: string
	) => {
		return (
			<div className={styles.cuenta_body_individual}>
				<div className={styles.titulo_botones_row}>
					<h5 className={styles.h5}>{label}:</h5>
				</div>

				<div className={styles.cuenta_body_row}>
					{currentlyEditing ? (
						<input
							type="text"
							value={fieldValue}
							className={`${styles.cuenta_body_row_value} ${
								currentlyEditing ? styles.active : ""
							}`}
							onChange={(e) => {
								if (fieldKey === "nombres") {
									setNombres(e.target.value);
								} else if (fieldKey === "apellidos") {
									setApellidos(e.target.value);
								} else if (fieldKey === "weight") {
								} else if (fieldKey === "username") {
									setUsername(e.target.value);
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
					{/* <div className={styles.image_section}>
						<img
							src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
							className={styles.pp}
						/>
						<div className={styles.imagen_acciones}>
							<button className={styles.button_editar}>Editar</button>
							<button className={styles.button_eliminar}>Eliminar</button>
						</div>
					</div> */}
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
							{renderEditableField("username", username, "Username")}
							{renderEditableField("weight", `${weight} kg`, "Peso")}
							{renderEditableField("height", `${height} metros`, "Altura")}
							{renderEditableField(
								"birthDate",
								birthDate,
								"Fecha de Nacimiento"
							)}
							{currentlyEditing && (
								<>
									<div className={styles.botones_input}>
										<button
											className={styles.button_cancelar}
											onClick={handleCancel}
										>
											Cancelar
										</button>
										<button
											className={styles.button_guardar}
											onClick={handleSave}
										>
											Guardar
										</button>
									</div>
								</>
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
							<div className={styles.entrenamiento_body_individual}>
								<h5 className={styles.h5}>Meta:</h5>
								<div className={styles.blank}></div>
								<div className={styles.entrenamiento_body_row}>
									{currentlyEditingEntreno ? (
										<Dropdown
											text={isMetaOpciones}
											isOpen={isOpenMeta}
											setIsOpen={setIsOpenMeta}
											classDivChild={styles.child}
											classBtn={styles.btn}
										>
											{["Subir de peso", "Mantener peso", "Bajar de peso"].map(
												(freq: string) => {
													return (
														<div
															key={freq}
															onClick={() => {
																setIsMetaOpciones(freq as any);
																setIsOpenMeta(false);
																setGoal(freq);
																{
																	console.log("user", username);
																}
															}}
															className={`${
																isMetaOpciones === freq && styles.active
															}`}
														>
															{freq}
														</div>
													);
												}
											)}
											{console.log(goal)}
										</Dropdown>
									) : (
										<p className={styles.entrenamineto_body_row_value}>
											{goal}
										</p>
									)}

									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEditEntreno()}
									/>
								</div>
							</div>
							<div className={styles.entrenamiento_body_individual}>
								<h5 className={styles.h5}>Nivel:</h5>
								<div className={styles.blank}></div>
								<div className={styles.entrenamiento_body_row}>
									{currentlyEditingEntreno ? (
										<Dropdown
											text={isNivelOpciones}
											isOpen={isOpenNivel}
											setIsOpen={setIsOpenNivel}
											classDivChild={styles.child}
											classBtn={styles.btn}
										>
											{[
												"Sedentario",
												"Ejercicio 2 veces por semana",
												"Caminata diaria",
												"4-5 días de gym",
												"Alto rendimiento",
											].map((freq: string) => {
												return (
													<div
														key={freq}
														onClick={() => {
															setIsNivelOpciones(freq as any);
															setIsOpenNivel(false);
															setLevel(freq);
														}}
														className={`${
															isNivelOpciones === freq && styles.active
														}`}
													>
														{freq}
													</div>
												);
											})}
											{console.log(level)}
										</Dropdown>
									) : (
										<p className={styles.entrenamineto_body_row_value}>
											{level}
										</p>
									)}
									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEditEntreno()}
									/>
								</div>
							</div>

							{currentlyEditingEntreno && (
								<>
									<div className={styles.botones_input}>
										<button
											className={styles.button_cancelar}
											onClick={handleCancelEntreno}
										>
											Cancelar
										</button>
										<button
											className={styles.button_guardar}
											onClick={onSubmit2}
										>
											Guardar
										</button>
									</div>
								</>
							)}
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
					<button className={styles.btn_eliminar_cuenta} onClick={handleDelete}>
						Eliminar Cuenta
					</button>
					<div className={styles.blankspace}></div>
				</div>
			</div>
		</Dashboard>
	);
}

export default Profile;
