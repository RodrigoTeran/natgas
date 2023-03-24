import React, { useState } from "react";
import { Link } from "react-router-dom";
import BtnPrimary from "../Welcome/Btns/BtnPrimary/BtnPrimary";
import Modal from "./Modal/Modal";
import s from "./Measurements.module.css";
import imagenMedidas from "./images/imagen_medidas_v1.png";
import imagenMedidas2 from "./images/imagen_medidas_v2.png";
import flecha from "./images/flecha-izquierda.png";

function Measurements() {
	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleShowModal = () => {
		setShowModal(true);
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
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
							</div>
							<div className={s.form_right}>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
								<div className={s.form_individual}>
									<label className={s.label_form}>Lorem</label>
									<input
										className={s.input}
										type="text"
										placeholder="Lorem Ipsum dolor"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className={s.footer}>
				<div className={s.contenedor_regresar}>
					<img className={s.flechaimg} src={flecha} />
					<p className={s.regresar}>Regresar</p>
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
					</Link>
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
