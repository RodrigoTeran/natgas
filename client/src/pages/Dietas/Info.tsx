import React from "react";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Info_styles/Info.module.css";
import { useSearchParams } from "react-router-dom";
import { getDiet, setDietStatus } from "../../routes/diets/diet.routes";
import { useNavigate } from "react-router";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { useEffect, useState, useContext } from "react";
import notFavicon from "./images/notFavico.svg";
import favicon from "./images/favicon.svg";
import notfavicon from "./images/notFavico.svg";

export const Info = () => {
	const navigate = useNavigate();
	const { addStaticMsg } = useContext(MessagesContext);
	const [searchParams] = useSearchParams();

	const [diet, setDiet] = useState<any>({});
	const [isFab, setIsFab] = useState<any>(-1);

	const macros = (macros: any): any => {
		const realCarbs = macros.carbohidratos[0];
		const realProteins = macros.proteina[0];
		const realFat = macros.grasas[0];
		const metaCarbs = macros.carbohidratos[1];
		const metaProteins = macros.proteina[1];
		const metaFat = macros.grasas[1];

		return {
			real: [realCarbs, realProteins, realFat],
			meta: [metaCarbs, metaProteins, metaFat],
		};
	};

	const micros = (micros: any, microName: string): any => {
		if (micros[microName]) {
			const real = micros[microName][0];
			const meta = micros[microName][1];

			return { real: real, meta: meta };
		} else {
			return { real: "---", meta: "---" };
		}
	};

	const setDietStatusController = (dietId: string): void => {
		const doFetch = async (): Promise<void> => {
			if (isFab !== -1) {
				await setDietStatus(false, dietId);
			} else {
				await setDietStatus(true, dietId);
			}

			getDietController();
		};

		void doFetch();
	};

	const getDietController = (): void => {
		const doFetch = async (): Promise<void> => {
			const resData = await getDiet(searchParams.get("dietId"));

			if (resData === null) {
				addStaticMsg("Error al obtener la dieta", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			if (data === null) {
				return;
			}

			setDiet(data.diet);
			setIsFab(data.liked);
		};
		void doFetch();
	};

	useEffect(() => {
		getDietController();
	}, [isFab]);

	return (
		<Dashboard>
			<div className={styles.layout}>
				<div className={styles.titulo}>
					<a href="#" onClick={(e) => navigate("/dietas")}>
						&larr;
					</a>
					<h1>Dieta {diet.name}</h1>
					<img
						src={isFab !== -1 ? favicon : notFavicon}
						onClick={(e) =>
							setDietStatusController(searchParams.get("dietId") || "")
						}
						alt="Icono favoritos"
					/>
				</div>

				<div className={styles.diet_info}>
					{diet.macros && (
						<div className={styles.macros}>
							<h1>Macronutrientes</h1>

							<table className={styles.info}>
								<thead>
									<tr>
										<th>Meta</th>
										<th>Proteínas (g)</th>
										<th>Carbs (g)</th>
										<th>Grasas (g)</th>
										<th>Calorías</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Total</td>
										<td>{macros(JSON.parse(diet.macros)).meta[1]}</td>
										<td>{macros(JSON.parse(diet.macros)).meta[0]}</td>
										<td>{macros(JSON.parse(diet.macros)).meta[2]}</td>
										<td>{diet.calories}</td>
									</tr>
								</tbody>
							</table>

							<table className={styles.info}>
								<thead>
									<tr>
										<th>Real</th>
										<th>Proteínas (g)</th>
										<th>Carbs (g)</th>
										<th>Grasas (g)</th>
										<th>Calorías</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Total</td>
										<td>{macros(JSON.parse(diet.macros)).real[1]}</td>
										<td>{macros(JSON.parse(diet.macros)).real[0]}</td>
										<td>{macros(JSON.parse(diet.macros)).real[2]}</td>
										<td>{diet.calories}</td>
									</tr>
								</tbody>
							</table>
						</div>
					)}

					<div className={styles.alimentos}>
						<h1>Alimentos</h1>

						<table className={styles.info}>
							<thead>
								<tr>
									<th>Alimento</th>
									<th>Cantidad</th>
									<th>Medida</th>
								</tr>
							</thead>
							<tbody>
								{diet.ingredients &&
									diet.ingredients.map((element: any, key: number) => {
										console.log(element)
										return (
											<tr key={key}>
												<td>{JSON.parse(element).name}</td>
												<td>{JSON.parse(element).quantity}</td>
												<td>{JSON.parse(element).unit}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>

					<div className={styles.micros}>
						<h1>Micronutrientes</h1>

						{diet.micros && (
							<table className={styles.alter_info}>
								<thead>
									<tr>
										<th>Nutriente</th>
										<th>Cantidad real(µg)</th>
										<th>Cantidad recomendada(µg)</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Ac. fólico</td>
										<td>{micros(JSON.parse(diet.micros), "Ácido fólico").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Ácido fólico").meta}</td>
									</tr>
									<tr>
										<td>Ac. Grasos mono-in</td>
										<td>{micros(JSON.parse(diet.micros), "Ac grasos mono-in").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Ac grasos mono-in").meta}</td>
									</tr>
									<tr>
										<td>Ac. Grasos poli</td>
										<td>{micros(JSON.parse(diet.micros), "Ac grasos poli").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Ac grasos poli").meta}</td>
									</tr>
									<tr>
										<td>Ac. Grasos saturados</td>
										<td>{micros(JSON.parse(diet.micros), "Ac grasos saturados").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Ac grasos saturados").meta}</td>
									</tr>
									<tr>
										<td>Calcio</td>
										<td>{micros(JSON.parse(diet.micros), "Calcio").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Calcio").meta}</td>
									</tr>
									<tr>
										<td>Ceniza</td>
										<td>{micros(JSON.parse(diet.micros), "Ceniza").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Ceniza").meta}</td>
									</tr>
									<tr>
										<td>Colesterol</td>
										<td>{micros(JSON.parse(diet.micros), "Colesterol").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Colesterol").meta}</td>
									</tr>
									<tr>
										<td>Fibra</td>
										<td>{micros(JSON.parse(diet.micros), "Fibra").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Fibra").meta}</td>
									</tr>
									<tr>
										<td>Folato Eq.</td>
										<td>{micros(JSON.parse(diet.micros), "Folato Eq.").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Folato Eq.").meta}</td>
									</tr>
									<tr>
										<td>Fósforo</td>
										<td>{micros(JSON.parse(diet.micros), "Fósforo").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Fósforo").meta}</td>
									</tr>
									<tr>
										<td>Hierro</td>
										<td>{micros(JSON.parse(diet.micros), "Hierro").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Hierro").meta}</td>
									</tr>
									<tr>
										<td>Magnesio</td>
										<td>{micros(JSON.parse(diet.micros), "Magnesio").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Magnesio").meta}</td>
									</tr>
									<tr>
										<td>Niacina</td>
										<td>{micros(JSON.parse(diet.micros), "Niacina").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Niacina").meta}</td>
									</tr>
									<tr>
										<td>Potasio</td>
										<td>{micros(JSON.parse(diet.micros), "Potasio").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Potasio").meta}</td>
									</tr>
									<tr>
										<td>Riboflavina</td>
										<td>{micros(JSON.parse(diet.micros), "Riboflavina").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Riboflavina").meta}</td>
									</tr>
									<tr>
										<td>Sodio</td>
										<td>{micros(JSON.parse(diet.micros), "Sodio").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Sodio").meta}</td>
									</tr>
									<tr>
										<td>Tiamina</td>
										<td>{micros(JSON.parse(diet.micros), "Tiamina").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Tiamina").meta}</td>
									</tr>
									<tr>
										<td>Vitamina A</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina A").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina A").meta}</td>
									</tr>
									<tr>
										<td>Vitamina B12</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina B12").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina B12").meta}</td>
									</tr>
									<tr>
										<td>Vitamina B6</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina B6").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina B6").meta}</td>
									</tr>
									<tr>
										<td>Vitamina C</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina C").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Vitamina C").meta}</td>
									</tr>
									<tr>
										<td>Zinc</td>
										<td>{micros(JSON.parse(diet.micros), "Zinc").real}</td>
										<td>{micros(JSON.parse(diet.micros), "Zinc").meta}</td>
									</tr>
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</Dashboard>
	);
};
