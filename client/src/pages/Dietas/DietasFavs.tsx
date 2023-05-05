import Dashboard from "../../layouts/Dashboard/Dashboard";
import { getAllFavs, setDietStatus } from "../../routes/diets/diet.routes";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./General_styles/Dietas.module.css";
import favicon from "./images/favicon.svg";
import { useNavigate } from "react-router";
import caloriesIcon from "./images/calories.svg";
import grasas from "./images/grasas.svg";
import carbohidrato from "./images/carbohidrato.svg";
import proteina from "./images/proteina.svg";
import { useEffect, useState, useContext } from "react";
import { MessagesContext } from "../../layouts/Messages/Messages";

function DietasFavs() {
	const { addStaticMsg } = useContext(MessagesContext);
	const navigate = useNavigate();

	const [caloriasOpen, setCaloriasOpen] = useState(false);
	const [ingredientFilter, setIngredientFilter] = useState("%");
	const [calorieFilter, setCalorieFilter] = useState(0);

	const [calories, setCalories] = useState<any>([]);
	const [diets, setDiets] = useState<any>([]);

	const filterCalories = (filter: number) => {
		setCaloriasOpen(false);
		setCalorieFilter(filter);
	};

	const macrosSum = (macros: any): number[] => {
		const carbs = Number.parseInt(macros.carbohidratos);
		const proteins = Number.parseInt(macros.proteina);
		const fat = Number.parseInt(macros.grasas);

		return [carbs, proteins, fat, carbs + fat + proteins];
	};

	const setDietStatusController = (dietId: string): void => {
		const doFetch = async (): Promise<void> => {
			await setDietStatus(false, dietId);

			getAllFavsController();
		};

		void doFetch();
	};

	const getAllFavsController = (): void => {
		const doFetch = async (): Promise<void> => {
			const resData = await getAllFavs(
				calorieFilter.toString(),
				ingredientFilter
			);

			if (resData === null) {
				addStaticMsg("Error al obtener las dietas favoritas", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			if (data === null) return;
			setDiets(data.diets);
			setCalories(data.calories);
		};
		void doFetch();
	};

	useEffect(() => {
		getAllFavsController();
	}, [calorieFilter, ingredientFilter]);

	return (
		<Dashboard>
			<div className={styles.layout}>
				<div className={styles.dietas}>
					<h1> Dietas favoritas </h1>

					<div className={styles.dietas}>
						<div className={styles.search_bar}>
							<div className={styles.aux}>
								{calories.length > 0 && (
									<Dropdown
										text={
											calorieFilter == 0 ? "Calorias" : calorieFilter.toString()
										}
										isOpen={caloriasOpen}
										setIsOpen={setCaloriasOpen}
									>
										<div className={styles.selection_calories}>
											<div
												onClick={() => {
													filterCalories(0);
												}}
												key={calories.length}
											>
												Default
											</div>
											{calories.map((element: string, key: number) => {
												return (
													<div
														onClick={() => {
															filterCalories(Number.parseInt(element));
														}}
														key={key}
													>
														{element}
													</div>
												);
											})}
										</div>
									</Dropdown>
								)}
							</div>

							<div className={styles.aux}>
								<input
									onChange={(e) => {
										setIngredientFilter(e.target.value);
									}}
									type="text"
									name="alimentos"
									id="alimentos"
									placeholder="&#128269;  Buscar alimento"
								/>
							</div>
						</div>
					</div>
					<section>
						{diets.length === 0 && (
							<>
								<div className={styles.dietless_container}>
									<img
										className={styles.dietless_img}
										src="https://cdn-icons-png.flaticon.com/512/607/607870.png"
									/>
									<p className={styles.p_dietless}>No hay dietas</p>
									<p className={styles.p_dietless_bold}>
										Agrega tus dietas favoritas
									</p>
								</div>
							</>
						)}
						{diets.length > 0 &&
							diets.map((element: any, key: any) => {
								const macros = macrosSum(JSON.parse(element.macros));

								return (
									<article key={key} className={styles.dieta_favorita}>
										<div className={styles.titulo}>
											<h2
												onClick={(e) =>
													navigate(`/dietas/info?dietId=${element.id}`)
												}
											>
												Dieta {element.name}
											</h2>
											<img
												className={styles.favicon}
												onClick={(e) => {
													setDietStatusController(element.id);
												}}
												src={favicon}
												alt="Icono favoritos"
											/>
										</div>

										<div
											className={styles.calorias}
											onClick={(e) =>
												navigate(`/dietas/info?dietId=${element.id}`)
											}
										>
											<img src={caloriesIcon} alt="Icono calorías" />
											<p>
												<span className={styles.subtitle}>Energía total:</span>{" "}
												{element.calories} calorías
											</p>
										</div>

										<div
											className={styles.macros}
											onClick={(e) =>
												navigate(`/dietas/info?dietId=${element.id}`)
											}
										>
											<div className={styles.macros_info}>
												<div className={styles.macros_item}>
													<img src={carbohidrato} alt="Icono carbs" />
													<p>Carbs</p>
												</div>
												<h5>{JSON.parse(element.macros).carbohidratos}</h5>
												<div className={styles.bar}>
													<div
														className={styles.color_carbs}
														style={{
															width: `${(macros[0] / macros[3]) * 100}%`,
														}}
													></div>
												</div>
											</div>

											<div className={styles.macros_info}>
												<div className={styles.macros_item}>
													<img src={proteina} alt="Icono proteina" />
													<p>Proteina</p>
												</div>
												<h5>{JSON.parse(element.macros).proteina}</h5>
												<div className={styles.bar}>
													<div
														className={styles.color_protein}
														style={{
															width: `${(macros[1] * 100) / macros[3]}%`,
														}}
													></div>
												</div>
											</div>

											<div className={styles.macros_info}>
												<div className={styles.macros_item}>
													<img src={grasas} alt="Icono grasas" />
													<p>Grasas</p>
												</div>
												<h5>{JSON.parse(element.macros).grasas}</h5>
												<div className={styles.bar}>
													<div
														className={styles.color_fats}
														style={{
															width: `${(macros[2] / macros[3]) * 100}%`,
														}}
													></div>
												</div>
											</div>
										</div>
									</article>
								);
							})}
					</section>

					<div className={styles.btn_container}>
						<button
							onClick={() => {
								navigate("/dietas");
							}}
							id={styles.ver_todo}
						>
							Regresar
						</button>
					</div>
				</div>
			</div>
		</Dashboard>
	);
}

export default DietasFavs;
