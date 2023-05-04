import { useContext, useState } from "react";
import styles from "./InfoRegistro.module.css";
import { useNavigate } from "react-router-dom";
import { MessagesContext } from "../../layouts/Messages/Messages";
import Dropdown from "../../components/Dropdown/Dropdown";
import { updateInfo } from "../../routes/auth/auth.routes";
import { getClientIdCache } from "../../cache/auth";
import IconMale from "../../images/maleIcon.png";
import IconF from "../../images/IconF.png";

function InfoRegistro() {
	const { addStaticMsg } = useContext(MessagesContext);
	const navigation = useNavigate();
	const [page1, setPage1] = useState(true);
	const [page2, setPage2] = useState(false);
	const [username, setUsername] = useState<string>("");
	const [height, setHeight] = useState<number>();
	const [weight, setWeight] = useState<number>();
	const [birthDate, setBirthDate] = useState<any>("");
	const [goal, setGoal] = useState<string>("");
	const [level, setLevel] = useState<string>("");
	const [sex, setSex] = useState<"M" | "F">();

	//
	const [isOpenMeta, setIsOpenMeta] = useState<boolean>(false);
	const [isMetaOpciones, setIsMetaOpciones] = useState<
		"1" | "2" | "3" | "Selecciona Meta"
	>("Selecciona Meta");
	const [isOpenNivel, setIsOpenNivel] = useState<boolean>(false);
	const [isNivelOpciones, setIsNivelOpciones] = useState<
		"1" | "2" | "3" | "Selecciona Nivel"
	>("Selecciona Nivel");

	const handlePage1 = () => {
		if (!isValid1()) {
			return;
		}
		setPage1(false);
		setPage2(true);
	};

	const isValid1 = () => {
		if (username.trim() == "" || height == null || weight == null) {
			addStaticMsg("No puedes dejar campos vacios", "danger");
			return false;
		}
		if (height < 0 || weight < 0) {
			addStaticMsg("No puedes poner números negativos", "danger");
			return false;
		}

		return true;
	};

	const isValid2 = () => {
		if (birthDate == null || goal == "" || level == "" || sex == null) {
			addStaticMsg("No puedes dejar campos vacios", "danger");
			return false;
		}
		return true;
	};

	const onSubmit = (e: any) => {
		e.preventDefault();

		if (!isValid2()) {
			return;
		}

		const doFetch = async (): Promise<void> => {
			const body: any = {
				username,
				height,
				weight,
				dateOfBirth: birthDate,
				goal,
				level,
				sex,
			};

			let id = await getClientIdCache();

			if (id === null) {
				addStaticMsg("No se pudo obtener el ID del cliente", "danger");
				return;
			}

			const resData = await updateInfo(id, body);

			if (resData === null) {
				addStaticMsg("Error al agregar información", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			addStaticMsg("Información registrada exitosamente", "success");
			navigation("/medidas");
		};

		doFetch();
	};

	return (
		<div className={styles.page}>
			{page1 && (
				<>
					<h1 className={styles.title}>ONYX</h1>
					<div className={styles.greet}>
						<h3 className={styles.greeth3}>¡Bienvenidos!</h3>
						<p className={styles.p_sub}>
						</p>
					</div>
					{/* <h2>Registro</h2> */}
					<form
						className={styles.content}
						onClick={(event) => {
							event?.preventDefault();
						}}
					>
						<div className={styles.row_medida_input}>
							<input
								className={styles.input_datos}
								type="text"
								name="username"
								placeholder="Nombre de usuario"
								onChange={(event) => {
									setUsername(event.target.value);
								}}
							/>
						</div>
						<h4 className={styles.greeth4}>Mas información</h4>
						<div className={styles.row_medida_input}>
							<input
								className={styles.input_datos}
								type="number"
								name="height"
								placeholder="Altura"
								onChange={(event) => {
									setHeight(Number(event.target.value));
								}}
							/>
							<div className={styles.medida_unit}>
								<p className={styles.p_medida_unit}>cm</p>
							</div>
						</div>
						<div className={styles.row_medida_input}>
							<input
								className={styles.input_datos}
								type="number"
								name="weight"
								placeholder="Peso"
								onChange={(event) => {
									setWeight(Number(event.target.value));
								}}
							/>
							<div className={styles.medida_unit}>
								<p className={styles.p_medida_unit}>kg</p>
							</div>
						</div>
						<input
							className={styles.submit_datos}
							type="submit"
							value="Mas Datos"
							onClick={handlePage1}
						/>
					</form>
				</>
			)}

			{page2 && (
				<>
					<h1 className={styles.title2}>ONYX</h1>

					<form
						className={styles.content}
						// onClick={(event) => {
						// 	event.preventDefault();
						// }}
					>
						<label className={styles.label_input}>
							Fecha de Nacimiento
							<input
								className={styles.input_datos2}
								type="date"
								name="date"
								onChange={(event) => {
									setBirthDate(event.target.value);
								}}
								required
							/>
						</label>
						<label className={styles.label_input}>
							Meta
							<div className={styles.label_input}>
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
							</div>
						</label>
						<label className={styles.label_input}>
							Nivel
							<div className={styles.label_input}>
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
							</div>
						</label>

						<div className={styles.label_input}>
							Sexo
							<div className={styles.aux}>
								<label className={styles.option_sex} htmlFor="male">
									<div className={styles.option_sex_individual}>
										<input
											className={styles.input_radius}
											type="radio"
											name="sex"
											id="male"
											onChange={() => {
												setSex("M");
											}}
										/>
										<img className={styles.option_sex_img} src={IconMale} />
										<p className={styles.option_sex_p}>Masculino</p>
									</div>
								</label>

								<label className={styles.option_sex} htmlFor="female">
									<div className={styles.option_sex_individual}>
										<input
											className={styles.input_radius}
											type="radio"
											name="sex"
											id="female"
											onChange={() => {
												setSex("F");
											}}
										/>

										<img className={styles.option_sex_img} src={IconF} />
										<p className={styles.option_sex_p}>Femenino</p>
									</div>
								</label>
							</div>
						</div>

						<input
							className={styles.submit_datos}
							type="submit"
							value="Mas Datos"
							onClick={onSubmit}
						/>
					</form>
				</>
			)}
			<div className={styles.pages_points}>
				{page1 ? (
					<>
						<span className={styles.active}></span>
						<span className={styles.dot}></span>
					</>
				) : (
					<>
						<span className={styles.dot}></span>
						<span className={styles.active}></span>
					</>
				)}
			</div>
		</div>
	);
}

export default InfoRegistro;
