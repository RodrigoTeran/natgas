import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import s from "./ActualizarMeasurements.module.css";
import body from "./../images/body.png";
import { useState, useContext } from "react";
import { createMeasurement } from "../../../routes/medidas/medidas.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import flecha from "../images/flecha-izquierda.png";
import Dashboard from "../../../layouts/Dashboard/Dashboard";
import pencil from "../images/pencil.png";
import writting from "../images/writing.png"

function ActualizarMeasurements() {
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
					addStaticMsg("Error al actualizar la medida", "danger");
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
					arr.push(create_Measurement("leftArm", leftArm));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightArm)) {
				if (rightArm > 0) {
					arr.push(create_Measurement("rightArm", rightArm));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(leftForearm)) {
				if (leftForearm > 0) {
					arr.push(create_Measurement("leftForearm", leftForearm));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightForeArm)) {
				if (rightForeArm > 0) {
					arr.push(create_Measurement("rightForearm", rightForeArm));
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
					arr.push(create_Measurement("leftLeg", leftLeg));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightLeg)) {
				if (rightLeg > 0) {
					arr.push(create_Measurement("rightLeg", rightLeg));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(rightCalve)) {
				if (rightCalve > 0) {
					arr.push(create_Measurement("rightCalve", rightCalve));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}
			if (check(leftCalve)) {
				if (leftCalve > 0) {
					arr.push(create_Measurement("leftCalve", leftCalve));
				} else {
					addStaticMsg("No puedes agregar numero negativos", "danger");
					return;
				}
			}

			if (arr.length < 1) {
				addStaticMsg("Añade las medidas", "danger");
				return;
			}

			await Promise.all(arr);
			navigation("/progreso");
		};
		doFetch();
	};

	return (
		<Dashboard>
			<div className={s.page}>
				<div className={s.edit} onClick={() => navigation("consultar")}>
					<div></div>
					<h3 className={s.h3_sub}> Mas sobre tus medidas</h3>
					<img src={writting} alt="Editar" />
				</div>
				<div className={s.content}>
					<div className={s.left}>
						<img className={s.image} src={body} />
						<div className={s.containerBotones}>
							<button className={s.submit_button} onClick={onSubmit}>
								Actualizar Medidas
							</button>
						</div>
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
												<p className={s.p_medida_unit}>cm</p>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Brazo izq</label>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Brazo der</label>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Antebrazo izq</label>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Antebrazo der</label>
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
												<p className={s.p_medida_unit}>cm</p>
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
												<p className={s.p_medida_unit}>cm</p>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Pierna izq</label>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Pierna der</label>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Pantorrilla der</label>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
									<div className={s.form_individual}>
										<label className={s.label_form}>Pantorilla izq</label>
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
												<p className={s.p_medida_unit}>cm</p>
											</div>
										</div>
									</div>
								</div>
							</form>
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
		</Dashboard>
	);
}

export default ActualizarMeasurements;
