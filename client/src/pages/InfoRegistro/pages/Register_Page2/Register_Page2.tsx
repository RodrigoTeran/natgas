import { useState } from "react";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import styles from "./Register_Page2.module.css";

function Register_Page2() {
	const [isOpenMeta, setIsOpenMeta] = useState<boolean>(false);
	const [isMetaOpciones, setIsMetaOpciones] = useState<
		"1" | "2" | "3" | "Cualquiera"
	>("Cualquiera");
	const [isOpenNivel, setIsOpenNivel] = useState<boolean>(false);
	const [isNivelOpciones, setIsNivelOpciones] = useState<
		"1" | "2" | "3" | "Cualquiera"
	>("Cualquiera");

	return (
		<div className={styles.page}>
			<img
				className={styles.icon}
				src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
			/>
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
							text="prueba"
							isOpen={isOpenMeta}
							setIsOpen={setIsOpenMeta}
							classDivChild={styles.child}
							classBtn={styles.btn}
						>
							{["1", "2", "3", "4", "5", "6", "Cualquiera"].map(
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
					Objetivo
					<div className={styles.label_input}>
						<Dropdown
							text="prueba"
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

				<div className={styles.option_sex}>
					<div className={styles.option_sex_individual}>
						<input className={styles.input_radius} type="radio" name="male" />
						<img
							className={styles.option_sex_img}
							src="https://cdn-icons-png.flaticon.com/512/921/921071.png"
						/>
						<p className={styles.option_sex_p}>Male</p>
					</div>
					<div className={styles.option_sex_individual}>
						<input className={styles.input_radius} type="radio" name="male" />
						<img
							className={styles.option_sex_img}
							src="https://cdn-icons-png.flaticon.com/512/3231/3231499.png"
						/>
						<p className={styles.option_sex_p}>Female</p>
					</div>
				</div>

				<input
					className={styles.submit_datos}
					type="submit"
					value="Mas Datos"
				/>
			</form>
		</div>
	);
}

export default Register_Page2;
