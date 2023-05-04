import { useState } from "react";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import styles from "./Register_Page2.module.css";
import { useNavigate } from "react-router-dom";

function Register_Page2() {
	const navigation = useNavigate();

	const [isOpenMeta, setIsOpenMeta] = useState<boolean>(false);
	const [isMetaOpciones, setIsMetaOpciones] = useState<
		"1" | "2" | "3" | "Cualquiera"
	>("Cualquiera");
	const [isOpenNivel, setIsOpenNivel] = useState<boolean>(false);
	const [isNivelOpciones, setIsNivelOpciones] = useState<
		"1" | "2" | "3" | "Cualquiera"
	>("Cualquiera");

	const onSubmit = () => {
		navigation("/medidas");
	};

	return (
		<div className={styles.page}>
			<h1>ONYX</h1>
			{/* <img
				className={styles.icon}
				src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
			/> */}
			<form className={styles.content}>
				<label className={styles.label_input}>
					Fecha de Nacimiento
					<input
						className={styles.input_datos2}
						type="date"
						name="date"
						required
					/>
				</label>

				<label className={styles.label_input}>
					Meta
					<div className={styles.label_input}>
						<Dropdown
							text="Bajar de peso"
							isOpen={isOpenMeta}
							setIsOpen={setIsOpenMeta}
							classDivChild={styles.child}
							classBtn={styles.btn}
						>
							{["1", "2", "3", "4", "5", "6", "Selecciona"].map(
								(freq: string) => {
									return (
										<div
											key={freq}
											onClick={() => {
												setIsMetaOpciones(freq as any);
												setIsOpenMeta(false);
											}}
											className={`${isMetaOpciones === freq && styles.active}`}
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
							text="Caminar diario"
							isOpen={isOpenNivel}
							setIsOpen={setIsOpenNivel}
							classDivChild={styles.child}
							classBtn={styles.btn}
						>
							{["1", "2", "3", "4", "5", "6", "Cualquiera"].map(
								(freq: string) => {
									return (
										<div
											key={freq}
											onClick={() => {
												setIsNivelOpciones(freq as any);
												setIsOpenNivel(false);
											}}
											className={`${isNivelOpciones === freq && styles.active}`}
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
					Sexo 		
					<div className={styles.option_sex}>
						<label htmlFor="male">
							<div className={styles.option_sex_individual} >
								<input className={styles.input_radius} type="radio" name="sex" id="male" />
								<img
									className={styles.option_sex_img}
									src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
								/>
								<p className={styles.option_sex_p}>Masculino</p>
							</div>
						</label>
						<label htmlFor="female">
							<div className={styles.option_sex_individual}>
								<input className={styles.input_radius} type="radio" name="sex" id="female"/>
								<img
									className={styles.option_sex_img}
									src="https://cdn-icons-png.flaticon.com/512/3231/3231499.png"
								/>
								<p className={styles.option_sex_p}>Femenino</p>
							</div>
						</label>
					</div>
				</label>					
				<input
					className={styles.submit_datos}
					type="submit"
					value="Mas Datos"
					onClick={onSubmit}
				/>
			</form>
		</div>
	);
}

export default Register_Page2;
