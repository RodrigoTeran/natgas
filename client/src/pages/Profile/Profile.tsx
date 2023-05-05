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
import ayudar from "./icons/gym.svg"
import gym from "./icons/help.svg"
import user from "./icons/user.svg"


function Profile() {
	const { addStaticMsg, addAsyncMsg} = useContext(MessagesContext);
	const [currentlyEditing, setCurrentlyEditing] = useState<boolean>(false);
	const [currentlyEditingEntreno, setCurrentlyEditingEntreno] =
		useState<boolean>(false);
	const [firstName, setFirstName] = useState<string>("Test");
	const [lastName, setLastName] = useState<string>("Test");
	const [username, setUsername] = useState<string>("test");
	const [weight, setWeight] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);
	const [dateOfBirth, setDateOfBirth] = useState<string>("");
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

	const handleEdit = () => {
		setCurrentlyEditing(true);
	};

	const handleCancel = (data: any) => {
		setCurrentlyEditing(false);
		setFirstName(data.firstName);
		setLastName(data.lastName);
		setUsername(data.username);
		setWeight(data.measurementWeight);
		setHeight(data.measurementHeight);
		setDateOfBirth(data.dateOfBirth);
		clientInfo();
	};

	const handleSave = () => {
		setCurrentlyEditing(false);
	};
	const handleEditEntreno = () => {
		setCurrentlyEditingEntreno(true);
	};

	const handleCancelEntreno = (data: any) => {
		setCurrentlyEditingEntreno(false);
		setGoal(data.nameGoal);
		setLevel(data.nameLevel);
		clientInfo();
	};

	const handleDelete = async () => {
		try {
			const id = getClientIdCache();
			if (id === null) {
				console.error("No se pudo obtener el ID del usuario");
				return;
			}
			const res = await addAsyncMsg(
				"Deseas eliminar tu cuenta.\nEsta acción no se puede deshacer"
			);
			if (res === false){
				return;
			}
			await deleteUser(id);
			addStaticMsg("Terminó", "success");
			// window.location.href = "/";
		} catch (error) {
			console.log(error);
		}
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const isValid = () => {
		if (
			firstName.trim() === "" ||
			lastName.trim() === "" ||
			weight === null ||
			height === null ||
			dateOfBirth === null
		) {
			return false;
		}
		return true;
	};

	const onSubmit1 = () => {
		if (!isValid()) {
			return;
		}

		//const formattedDateOfBirth = formatDate(dateOfBirth);

		const doFetch = async (): Promise<void> => {
			const body: any = {
				firstName,
				lastName,
				username,
				weight,
				height,
				dateOfBirth, // :formattedDateOfBirth
				level,
				goal,
			};
			const id = getClientIdCache();

			if (id === null) {
				return;
			}

			let resData;

			resData = await updateBlock1(id, body);

			if (resData === null) {
				addStaticMsg("Error al editar información", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			addStaticMsg("Se editó información del perfil con éxito", "success");
			handleSave();
		};
		void doFetch();
	};
	const onSubmit2 = () => {
		const doFetch = async (): Promise<void> => {
			const body: any = {
				goal,
				level,
			};
			const id = getClientIdCache();

			if (id === null) {
				return;
			}

			let resData;
			resData = await updateBlock2(id, body);

			if (resData === null) {
				addStaticMsg("Error al editar información", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			addStaticMsg("Se editó información del perfil con éxito", "success");
			setCurrentlyEditingEntreno(false);
		};
		void doFetch();
	};

	const clientInfo = async () => {
		const doFetch = async (): Promise<void> => {
			const id = getClientIdCache();
			if (id === null) {
				//console.log("error de id");
				return;
			}
			try {
				const resData = await fetchInfo(id);

				if (resData === null) {
					addStaticMsg("Error al obtener la información del cliente", "danger");
					return;
				}
				const data = resData.data;

				setFirstName(data.firstName);
				setLastName(data.lastName);
				setUsername(data.username);
				setWeight(data.measurementWeight);
				setHeight(data.measurementHeight);
				setDateOfBirth(data.dateOfBirth);
				setGoal(data.nameGoal);
				setLevel(data.nameLevel);
				setIsMetaOpciones(data.nameGoal as any);
				setIsNivelOpciones(data.nameLevel as any);
			} catch (e) {
				console.log(e);
			}
		};
		void doFetch();
	};

	const getCurrentData = () => {
		return {
			firstName: firstName,
			lastName: lastName,
			username: username,
			measurementWeight: weight,
			measurementHeight: height,
			dateOfBirth: dateOfBirth,
			nameGoal: goal,
			nameLevel: level,
		};
	};

	useEffect(() => {
		clientInfo();
	}, []);

	return (
		<Dashboard>
			<div className={styles.page}>
				<div className={styles.body}>
					<div className={styles.cuenta}>
						<div className={styles.blankspace}></div>
						<div className={styles.cuenta_header}>
							<img src={user} className={styles.icon_cuenta} />
							<div className={styles.cuenta_title_subtitle}>
								<h3 className={styles.h3}>Cuenta</h3>
								<p className={styles.subtitle}>Edita tu información</p>
							</div>
						</div>
						<div className={styles.cuenta_body}>
							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Nombre de Usuario:</h5>
								<div className={styles.blank}></div>
								<div className={styles.cuenta_body_row}>
									{currentlyEditing ? (
										<input
											type="text"
											value={username}
											className={`${styles.cuenta_body_row_value} ${
												currentlyEditing ? styles.active : ""
											}`}
											onChange={(e) => {
												setUsername(e.target.value);
											}}
										/>
									) : (
										<p className={styles.cuenta_body_row_value}>{username}</p>
									)}

									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEdit()}
									/>
								</div>
							</div>
							<div className={styles.test}></div>
							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Nombres:</h5>
								<div className={styles.blank}></div>
								<div className={styles.cuenta_body_row}>
									{currentlyEditing ? (
										<input
											type="text"
											value={firstName}
											className={`${styles.cuenta_body_row_value} ${
												currentlyEditing ? styles.active : ""
											}`}
											onChange={(e) => {
												setFirstName(e.target.value);
											}}
										/>
									) : (
										<p className={styles.cuenta_body_row_value}>{firstName}</p>
									)}

									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEdit()}
									/>
								</div>
							</div>
							<div className={styles.test}></div>

							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Apellidos:</h5>
								<div className={styles.blank}></div>
								<div className={styles.cuenta_body_row}>
									{currentlyEditing ? (
										<input
											type="text"
											value={lastName}
											className={`${styles.cuenta_body_row_value} ${
												currentlyEditing ? styles.active : ""
											}`}
											onChange={(e) => {
												setLastName(e.target.value);
											}}
										/>
									) : (
										<p className={styles.cuenta_body_row_value}>{lastName}</p>
									)}

									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEdit()}
									/>
								</div>
							</div>
							<div className={styles.test}></div>

							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Peso:</h5>
								<div className={styles.blank}></div>
								<div className={styles.cuenta_body_row}>
									{currentlyEditing ? (
										<input
											type="number"
											min={1}
											step={1}
											value={height}
											className={`${styles.cuenta_body_row_value} ${
												currentlyEditing ? styles.active : ""
											}`}
											onChange={(e) => {
												setHeight(Number(e.target.value));
											}}
										/>
									) : (
										<p className={styles.cuenta_body_row_value}>{height}</p>
									)}

									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEdit()}
									/>
								</div>
							</div>
							<div className={styles.test}></div>

							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Altura:</h5>
								<div className={styles.blank}></div>
								<div className={styles.cuenta_body_row}>
									{currentlyEditing ? (
										<input
											type="number"
											min={1}
											step={1}
											value={weight}
											className={`${styles.cuenta_body_row_value} ${
												currentlyEditing ? styles.active : ""
											}`}
											onChange={(e) => {
												setWeight(Number(e.target.value));
											}}
										/>
									) : (
										<p className={styles.cuenta_body_row_value}>{weight}</p>
									)}

									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEdit()}
									/>
								</div>
							</div>
							<div className={styles.test}></div>

							<div className={styles.cuenta_body_individual}>
								<h5 className={styles.h5}>Fecha de nacimiento:</h5>
								<div className={styles.blank}></div>
								<div className={styles.cuenta_body_row}>
									{currentlyEditing ? (
										<input
											type="date"
											value={dateOfBirth}
											className={`${styles.cuenta_body_row_value} ${
												currentlyEditing ? styles.active : ""
											}`}
											onChange={(e) => {
												setDateOfBirth(e.target.value);
											}}
										/>
									) : (
										<p className={styles.cuenta_body_row_value}>
											{new Date(dateOfBirth).toLocaleDateString()}
										</p>
									)}

									<img
										src={arrow}
										className={styles.arrow_img}
										onClick={() => handleEdit()}
									/>
								</div>
							</div>
							{currentlyEditing && (
								<>
									<div className={styles.botones_input}>
										<button
											className={styles.button_cancelar}
											onClick={() => handleCancel(getCurrentData())}
										>
											Cancelar
										</button>
										<button
											className={styles.button_guardar}
											onClick={onSubmit1}
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
							<img src={gym} className={styles.icon_entrenamiento} />
							<div className={styles.entrenamiento_title_subtitle}>
								<h3 className={styles.h3}>Entrenamiento</h3>
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
							</div>{" "}
							<div className={styles.test}></div>
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
											onClick={() => handleCancelEntreno(getCurrentData())}
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
							<img src={ayudar} className={styles.icon_ayuda} />
							<div className={styles.ayuda_title_subtitle}>
								<h3 className={styles.h3}>Ayuda</h3>
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
							<div className={styles.test}></div>

							<div className={styles.ayuda_body_individual}>
								<Link to="/contact" className={styles.link}>
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
