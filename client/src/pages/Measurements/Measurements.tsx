import { Link, useNavigate } from "react-router-dom";
import BtnPrimary from "../Welcome/Btns/BtnPrimary/BtnPrimary";
import Modal from "./Modal/Modal";
import s from "./Measurements.module.css";
import imagenMedidas from "./images/imagen_medidas_v1.png";
import imagenMedidas2 from "./images/imagen_medidas_v2.png";
import flecha from "./images/flecha-izquierda.png";
import { useState } from "react";
import { createMeasurement } from "../../routes/medidas/medidas.routes";

function Measurements() {
	const navigation = useNavigate();

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
				await createMeasurement(body);
				resolve(true);
			};
			doFetch();
		});
	};

	const onSubmit = () => {
		const doFetch = async (): Promise<void> => {
			const res = await Promise.all([
				create_Measurement("neck", neck),
				create_Measurement("chest", chest),
				create_Measurement("leftarm", leftArm),
				create_Measurement("rightarm", rightArm),
				create_Measurement("leftforearm", leftForearm),
				create_Measurement("rightforearm", rightForeArm),
				create_Measurement("waist", waist),
				create_Measurement("hip", hip),
				create_Measurement("leftleg", leftLeg),
				create_Measurement("rightleg", rightLeg),
				create_Measurement("rightcalve", rightCalve),
				create_Measurement("leftcalve", leftCalve),
			]);
			navigation("/home");
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
					<img className={s.image} src={imagenMedidas} />
				</div>
				<div className={s.right}>
					<div className={s.container_form}>
						<form className={s.form}>
							<div className={s.form_left}>
								<div className={s.form_individual}>
									<label className={s.label_form}>Chest</label>
									<input
										className={s.input}
										type="text"
										id="my-input"
										value={chest}
										placeholder="Agregar medida..."
										onChange={(event) => {
											setChest(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Neck</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={neck}
										onChange={(event) => {
											setNeck(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Left Arm</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={leftArm}
										onChange={(event) => {
											setLeftArm(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Right Arm</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={rightArm}
										onChange={(event) => {
											setRightArm(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Left Forearm</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={leftForearm}
										onChange={(event) => {
											setLeftForearm(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Right Forearm</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={rightForeArm}
										onChange={(event) => {
											setRightForeArm(Number(event.target.value));
										}}
									/>
								</div>
							</div>
							<div className={s.form_right}>
								<div className={s.form_individual}>
									<label className={s.label_form}>Waist</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={waist}
										onChange={(event) => {
											setWaist(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Hip</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={hip}
										onChange={(event) => {
											setHip(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Left Leg</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={leftLeg}
										onChange={(event) => {
											setLeftLeg(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Right Leg</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={rightLeg}
										onChange={(event) => {
											setRightLeg(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Right Calve</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={rightCalve}
										onChange={(event) => {
											setRightCalve(Number(event.target.value));
										}}
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Left Calve</label>
									<input
										className={s.input}
										type="text"
										placeholder="Agregar medida..."
										id="my-input"
										value={leftCalve}
										onChange={(event) => {
											setLeftCalve(Number(event.target.value));
										}}
									/>
								</div>
							</div>
						</form>
					</div>
					<div className={s.containerBotones}>
						<button className={s.omitir_btn} onClick={handleShowModal}>
							Omitir
						</button>
						<Link to="/iniciar-sesion">
							<BtnPrimary
								message="Siguiente"
								color="#FF6159"
								color_text="white"
								borderColor="transparent"
								children={""}
							/>
							<button onClick={onSubmit}>Prueba</button>
						</Link>
					</div>
				</div>
			</div>

			{showModal && (
				<Modal
					handleClose={handleCloseModal}
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
			)}
			<div className={s.contenedor_regresar}>
				<img className={s.flechaimg} src={flecha} />
				<p className={s.regresar}>Regresar</p>
			</div>
		</div>
	);
}

export default Measurements;
