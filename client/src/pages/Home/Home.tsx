import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Home.module.css";
import stylesDiets from "./Home.module.css";
import FramePngWorkouts from "./Workout.png";
import FramePngDiets from "./Diet.png";
import Workout from "../Workouts/WorkoutNoFav/Workout";
// import stylesDiets from "../Dietas/General_styles/Dietas.module.css";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import caloriesIcon from "../Dietas/images/calories.svg";
import grasas from "../Dietas/images/grasas.svg";
import carbohidrato from "../Dietas/images/carbohidrato.svg"
import proteina from "../Dietas/images/proteina.svg";
import favicon from "../Dietas/images/favicon.svg";
import Skeleton from "../Workouts/Skeleton/Skeleton";
import { useEffect, useState, Fragment, useContext } from "react";
import { MessagesContext } from "../../layouts/Messages/Messages";
import {
	getFavWorkouts,
} from "../../routes/workouts/workouts.routes";
import {
	getAllFavs
} from "../../routes/diets/diet.routes";

function Home() {
	const { addStaticMsg } = useContext(MessagesContext);

	const [allWorkouts, setAllWorkouts] = useState<IWorkout[]>([]);
	const [allDiets, setAllDiets] = useState<any[]>([]);
	const [isLoadingAll, setIsLoadingAll] = useState<boolean>(true);

	const macrosSum = (macros: any): number[] => {
		const carbs = Number.parseInt(macros.carbohidratos);
		const proteins = Number.parseInt(macros.proteina);
		const fat = Number.parseInt(macros.grasas);

		return [carbs, proteins, fat, carbs + fat + proteins];
	}

	const getAllWorkouts = () => {
		return new Promise<boolean>((resolve) => {
			const doFetch = async (): Promise<void> => {
				const resData = await getFavWorkouts();

				// Mostrar mensaje en pantalla si hubo un error
				if (resData === null) {
					addStaticMsg("Error al obtener las rutinas favoritas", "danger");
					resolve(false);
					return;
				}

				if (resData.msg !== "") {
					addStaticMsg(resData.msg, "danger");
					resolve(false);
					return;
				}

				const data = resData.data;

				if (data === null) {
					resolve(false);
					return;
				}

				setAllWorkouts(data.workouts);
				resolve(true);
			};
			void doFetch();
		});
	};

	const getAllDiets = () => {
		return new Promise<boolean>((resolve) => {
			const doFetch = async (): Promise<void> => {
				const resData = await getAllFavs("0", "%");

				if (resData === null) {
					addStaticMsg("Error al obtener las dietas favoritas", "danger");
					resolve(false);
					return;
				}

				if (resData.msg !== "") {
					addStaticMsg(resData.msg, "danger");
					resolve(false);
					return;
				}

				const data = resData.data;

				if (data === null) return;
				setAllDiets(data.diets);
				resolve(true);
			};
			void doFetch();
		});
	};

	const fetchAll = (): void => {
		const arr: any = [];
		arr.push(getAllWorkouts());
		arr.push(getAllDiets());
		const doFetch = async (): Promise<void> => {
			setIsLoadingAll(true);
			await Promise.all(arr);
			setIsLoadingAll(false);
		};
		void doFetch();
	};

	useEffect(() => {
		fetchAll();
	}, []);

	return (
		<Dashboard>
			<div className={styles.home}>
				{isLoadingAll && (
					<Skeleton />
				)}
				{!isLoadingAll && (
					<>
						<div className={styles.workouts}>
							<h1>
								Rutinas Favoritas
							</h1>
							{allWorkouts.length == 0 && (
								<div className={styles.not}>
									Aún no tienes rutinas favoritas
									<img src={FramePngWorkouts} />
								</div>
							)}
							<div className={styles.workouts_container}>
								{allWorkouts.slice(0, 3).map((workout: IWorkout, index: number) => {
									return (
										<Fragment key={index}>
											<Workout
												withControls={false}
												visit={() => { }}
												like={() => { }}
												edit={() => { }}
												isLiked={workout.liked}
												workout={workout}
											/>
										</Fragment>
									);
								})}
							</div>
						</div>
						<div className={styles.diets}>
							<h1>
								Dietas Favoritas
							</h1>
							<div className={styles.diets_container_this}>
								{allDiets.length === 0 && (
									<div className={styles.not}>
										Aún no tienes dietas favoritas
										<img src={FramePngDiets} />
									</div>
								)}
								{allDiets.length > 0 && (allDiets.slice(0, 3).map((element: any, key: any) => {
									let macros;
									if (typeof element.macros === "string") {
										macros = macrosSum(JSON.parse(element.macros));
									} else {
										macros = macrosSum(element.macros);
									}
									return (
										<article key={key} className={stylesDiets.dieta_favorita}>
											<div className={stylesDiets.titulo}>
												<h2 onClick={(e) => { }}>Dieta {element.name}</h2>
												<img className={stylesDiets.favicon} onClick={(e) => { }} src={favicon} alt="Icono favoritos" />
											</div>
											<div className={stylesDiets.calorias} onClick={(e) => { }}>
												<img src={caloriesIcon} alt="Icono calorías" />
												<p><span className={stylesDiets.subtitle}>Energía total:</span> {element.calories} calorías</p>
											</div>

											<div className={stylesDiets.macros} onClick={(e) => { }}>
												<div className={stylesDiets.macros_info}>
													<div className={stylesDiets.macros_item}>
														<img src={carbohidrato} alt="Icono carbs" />
														<p>Carbs</p>
													</div>
													{typeof element.macros === "string" ? (
														<h5>{JSON.parse(element.macros).carbohidratos}</h5>
													) : (
														<h5>{element.macros.carbohidratos}</h5>
													)}

													<div className={stylesDiets.bar}>
														<div className={stylesDiets.color_carbs} style={{
															width: `${macros[0] / macros[3] * 100}%`
														}}>

														</div>
													</div>
												</div>

												<div className={stylesDiets.macros_info}>
													<div className={stylesDiets.macros_item}>
														<img src={proteina} alt="Icono proteina" />
														<p>Proteina</p>
													</div>
													{typeof element.macros === "string" ? (
														<h5>{JSON.parse(element.macros).proteina}</h5>
													) : (
														<h5>{element.macros.proteina}</h5>
													)}
													<div className={stylesDiets.bar}>
														<div className={stylesDiets.color_protein} style={{
															width: `${macros[1] * 100 / macros[3]}%`
														}}>

														</div>
													</div>
												</div>

												<div className={stylesDiets.macros_info}>
													<div className={stylesDiets.macros_item}>
														<img src={grasas} alt="Icono grasas" />
														<p>Grasas</p>
													</div>
													{typeof element.macros === "string" ? (
														<h5>{JSON.parse(element.macros).grasas}</h5>
													) : (
														<h5>{element.macros.grasas}</h5>
													)}
													<div className={stylesDiets.bar}>
														<div className={stylesDiets.color_fats} style={{
															width: `${macros[2] / macros[3] * 100}%`
														}}>

														</div>
													</div>
												</div>
											</div>
										</article>
									)
								}))}
							</div>
						</div>
					</>
				)}

			</div>
		</Dashboard>
	);
}

export default Home;
