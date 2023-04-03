import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import s from "./Measurements.module.css";
import imagenMedidas2 from "./images/imagen_medidas_v2.png";
import { useState, useContext } from "react";
import { createMeasurement } from "../../routes/medidas/medidas.routes";
import { MessagesContext } from "../../layouts/Messages/Messages";

function Measurements() {
	const navigation = useNavigate();
	const { addStaticMsg } = useContext(MessagesContext);

	const [neck, setNeck] = useState<number>(0);
	const [chest, setChest] = useState<number>(0);
	const [leftArm, setLeftArm] = useState<number>(0);
	const [rightArm, setRightArm] = useState<number>(0);
	const [leftForearm, setLeftForearm] = useState<number>(0);
	const [rightForeArm, setRightForeArm] = useState<number>(0);
	const [waist, setWaist] = useState<number>(0);
	const [hip, setHip] = useState<number>(0);
	const [leftLeg, setLeftLeg] = useState<number>(0);
	const [rightLeg, setRightLeg] = useState<number>(0);
	const [rightCalve, setRightCalve] = useState<number>(0);
	const [leftCalve, setLeftCalve] = useState<number>(0);

	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleShowModal = () => {
		setShowModal(true);
	};

	const create_Measurement = (tableName: string, measurement: number) => {
		return new Promise((resolve) => {
			const doFetch = async (): Promise<void> => {
				const body: any = {
					tableName,
					measurement,
				};
				const resData = await createMeasurement(body);

				if (resData === null) {
					addStaticMsg("Error al crear medida", "danger");
					resolve(false);
					return;
				}

				if (resData.msg !== "") {
					addStaticMsg(resData.msg, "danger");
					resolve(false);
					return;
				}

				resolve(true);
			};
			doFetch();
		});
	};

	const check = (value: any): boolean => {
		return value !== 0;
	};

	const onSubmit = () => {
		const doFetch = async (): Promise<void> => {
			const arr: any = [];

			if (check(neck)) {
				if (neck > 0) {
					arr.push(create_Measurement("neck", neck));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(chest)) {
				if (chest > 0) {
					arr.push(create_Measurement("chest", chest));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(leftArm)) {
				if (leftArm > 0) {
					arr.push(create_Measurement("leftarm", leftArm));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightArm)) {
				if (rightArm > 0) {
					arr.push(create_Measurement("rightarm", rightArm));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(leftForearm)) {
				if (leftForearm > 0) {
					arr.push(create_Measurement("leftforearm", leftForearm));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightForeArm)) {
				if (rightForeArm > 0) {
					arr.push(create_Measurement("rightforearm", rightForeArm));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(waist)) {
				if (waist > 0) {
					arr.push(create_Measurement("waist", waist));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(hip)) {
				if (hip > 0) {
					arr.push(create_Measurement("hip", hip));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(leftLeg)) {
				if (leftLeg > 0) {
					arr.push(create_Measurement("leftleg", leftLeg));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightLeg)) {
				if (rightLeg > 0) {
					arr.push(create_Measurement("rightleg", rightLeg));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightCalve)) {
				if (rightCalve > 0) {
					arr.push(create_Measurement("rightcalve", rightCalve));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(leftCalve)) {
				if (leftCalve > 0) {
					arr.push(create_Measurement("leftcalve", leftCalve));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}

			if (arr.length < 12) {
				addStaticMsg("Añade las medidas", "danger");
				return;
			}

			await Promise.all(arr);
			navigation("/inicio");
		};
		doFetch();
	};

	return (
		<div className={s.page}>
			<header className={s.header}>
				<h1 className={s.h1}>Logo</h1>
			</header>
			<h2 className={s.h2}>Registro de Medidas</h2>
			<div className={s.content}>
				<div className={s.left}>
					<img className={s.image} src={imagenMedidas2} />
				</div>
				<div className={s.right}>
					<div className={s.container_form}>
						<form className={s.form}>
							<div className={s.form_left}>
								<div className={s.form_individual}>
									<label className={s.label_form}>Pecho</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											id="my-input"
											placeholder="Agregar medida..."
											onChange={(event) => {
												setChest(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Cuello</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setNeck(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Brazo Izquierdo</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setLeftArm(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Brazo Derecho</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setRightArm(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Antebrazo izquierdo</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setLeftForearm(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Antebrazo Derecho</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setRightForeArm(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
							</div>
							<div className={s.form_right}>
								<div className={s.form_individual}>
									<label className={s.label_form}>Cintura</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setWaist(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Cadera</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setHip(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Pierna Izquierda</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setLeftLeg(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Pierna Derecha</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setRightLeg(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Pantorrilla derecha</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setRightCalve(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Pantorrilla Izquierda</label>
									<div className={s.row_medida_input}>
										<input
											className={s.input}
											type="number"
											min={0}
											placeholder="Agregar medida..."
											id="my-input"
											onChange={(event) => {
												setLeftCalve(Number(event.target.value));
											}}
										/>
										<div className={s.medida_unit}>
											<p className={s.p_medida_unit}>mm</p>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className={s.containerBotones}>
						<button className={s.omitir_btn} onClick={handleShowModal}>
							Omitir
						</button>

						<button className={s.submit_button} onClick={onSubmit}>
							Añadir Medidas
						</button>
					</div>
				</div>
			</div>

			{showModal && (
				<Modal
					handleClose={handleCloseModal}
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
			)}
		</div>
	);
}

export default Measurements;
