import { Fragment, useEffect, useRef, useState, useContext } from "react";
import Layout from "../../layouts/Dashboard/Dashboard";
import WorkoutFav from "./WorkoutFav/Workout";
import WorkoutNoFav from "./WorkoutNoFav/Workout";
import Dropdown from "../../components/Dropdown/Dropdown";
import Skeleton from "./Skeleton/Skeleton";
import {
	getAllWorkouts,
	getFavWorkouts,
	likeUnlikeWorkout,
} from "../../routes/workouts/workouts.routes";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { AppContext } from "../../App";
import styles from "./Workouts.module.css";
import CreateWorkout from "./Create/Create";
import WorkoutView from "./Workout/Workout";
import EditWorkout from "./Edit/Edit";
import CreateExercise from "./createExercise/CreateExercise";
import createI from "./images/create.png";

function Workouts() {
	const { addStaticMsg } = useContext(MessagesContext);
	const { user } = useContext(AppContext);
	const controllerWorkout = useRef<boolean>(false);
	const [favWorkouts, setFavWorkouts] = useState<IWorkout[]>([]);
	const [allWorkouts, setAllWorkouts] = useState<IWorkout[]>([]);
	const [isLoadingFavs, setIsLoadingFavs] = useState<boolean>(true);
	const [isLoadingAll, setIsLoadingAll] = useState<boolean>(true);

	const [isOpenCreateWorkout, setIsOpenCreateWorkout] =
		useState<boolean>(false);
	const [isOpenCreateExercise, setIsOpenCreateExercise] =
		useState<boolean>(false);
	const [isOpenEditWorkout, setIsOpenEditWorkout] =
		useState<boolean>(false);
	const [isOpenViewWorkout, setIsOpenViewWorkout] =
		useState<boolean>(false);
	const [viewWorkout, setViewWorkout] = useState<string | null>(null);

	const [isOpenFrequency, setIsOpenFrequency] = useState<boolean>(false);
	const [isOpenLevel, setIsOpenLevel] = useState<boolean>(false);
	const [isOpenType, setIsOpenType] = useState<boolean>(false);
	const [editWorkout, setEditWorkout] = useState<string | null>(null);

	const [search, setSearch] = useState<string>("");
	const [optionFrequency, setOptionFrequency] = useState<
		"1" | "2" | "3" | "4" | "5" | "6" | "Cualquiera"
	>("Cualquiera");
	const [optionLevel, setOptionLevel] = useState<
		"Principiante" | "Intermedio" | "Avanzado" | "Cualquiera"
	>("Cualquiera");
	const [optionType, setOptionType] = useState<
		"Fuerza" | "Hipertrofia" | "Híbrido" | "Cualquiera"
	>("Cualquiera");

	const visit = (id: string): void => {
		setViewWorkout(id);
		setIsOpenViewWorkout(true);
	};

	const edit = (id: string): void => {
		setEditWorkout(id);
		setIsOpenEditWorkout(true);
	};

	const getFavWorkoutsController = (): void => {
		const doFetch = async (): Promise<void> => {
			setIsLoadingFavs(true);
			const resData = await getFavWorkouts();

			// Mostrar mensaje en pantalla si hubo un error
			if (resData === null) {
				addStaticMsg("Error al obtener las rutinas favoritas", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			setIsLoadingFavs(false);

			if (data === null) return;

			setFavWorkouts(data.workouts);
		};
		void doFetch();
	};

	const getAllWorkoutsController = (): void => {
		const doFetch = async (): Promise<void> => {
			setIsLoadingAll(true);
			let query = "";

			if (search.trim() !== "") {
				query += "search=" + search;
			}
			if (optionFrequency !== "Cualquiera") {
				query += "frequency=" + optionFrequency;
			}
			if (optionLevel !== "Cualquiera") {
				query += "level=" + optionLevel;
			}
			if (optionType !== "Cualquiera") {
				query += "type=" + optionType;
			}

			const resData = await getAllWorkouts(query);

			if (resData === null) {
				addStaticMsg("Error al obtener las rutinas", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			setIsLoadingAll(false);

			if (data === null) return;

			setAllWorkouts(data.workouts);
		};
		void doFetch();
	};

	const like = (workoutId: string) => {
		const doFetch = async (): Promise<void> => {
			const resData = await likeUnlikeWorkout(workoutId);
			if (resData === null) {
				addStaticMsg("Error al darle like a una rutina", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}
			getAllWorkoutsController();
			getFavWorkoutsController();
		};
		void doFetch();
	};

	useEffect(() => {
		getAllWorkoutsController();
	}, [optionFrequency, optionLevel, optionType, isOpenCreateExercise]);

	useEffect(() => {
		if (search.trim() !== "") return;
		getAllWorkoutsController();
	}, [search]);

	useEffect(() => {
		if (controllerWorkout.current) return;
		controllerWorkout.current = true;

		getFavWorkoutsController();
	}, []);

	return (
		<>
			{user?.role === "Administrador" && (
				<>
					<CreateWorkout
						getAllWorkoutsController={getAllWorkoutsController}
						isOpen={isOpenCreateWorkout}
						setIsOpen={setIsOpenCreateWorkout}
					/>
					<EditWorkout
						workoutId={editWorkout}
						getAllWorkoutsController={getAllWorkoutsController}
						isOpen={isOpenEditWorkout}
						setIsOpen={setIsOpenEditWorkout}
					/>
					<CreateExercise
						isOpen={isOpenCreateExercise}
						setIsOpen={setIsOpenCreateExercise}
					/>
				</>
			)}
			<WorkoutView
				workoutId={viewWorkout}
				isOpen={isOpenViewWorkout}
				setIsOpen={setIsOpenViewWorkout}
			/>
			<Layout>
				<div className={styles.workouts_fav}>
					<div className={styles.wrapper}>
						{user?.role === "Administrador" && (
							<div className={styles.createButtons}>
								<div
									className={styles.createButtonIndividual}
									onClick={() => {
										setIsOpenCreateWorkout(true);
									}}
								>
									<img src={createI} />
									Añadir workout
								</div>
								<div
									className={styles.createButtonIndividual}
									onClick={() => {
										setIsOpenCreateExercise(true);
									}}
								>
									<img src={createI} />
									Añadir Ejercicio
								</div>
							</div>
						)}
						<div className={styles.workouts_container}>
							<h2>Workouts Favoritos</h2>
							{isLoadingFavs ? (
								<div
									className={`${styles.loader} ${isLoadingFavs && styles.loader_open
										}`}
								>
									<Skeleton />
								</div>
							) : (
								<div className={styles.workouts_container_wrapper}>
									{favWorkouts.length == 0 && (
										<div className={styles.workoutless_container}>
											<img
												className={styles.workoutless_img}
												src="https://cdn-icons-png.flaticon.com/512/607/607870.png"
											/>
											<p className={styles.p_workoutsless}>No hay workouts</p>
											<p className={styles.p_workoutsless_bold}>
												Agrega tus workouts favoritos
											</p>
										</div>
									)}
									{favWorkouts.map((workout: IWorkout, index: number) => {
										if (!workout.liked)
											return <Fragment key={index}></Fragment>;
										return (
											<Fragment key={index}>
												<WorkoutFav
													like={like}
													edit={edit}
													visit={visit}
													isLiked={workout.liked}
													workout={workout}
												/>
											</Fragment>
										);
									})}
								</div>
							)}
						</div>
						<div className={styles.workouts_container}>
							<h2>Buscar Otros Workouts</h2>
							<div className={styles.workouts_search}>
								<div className={styles.workouts_search_wrapper}>
									<label>
										<input
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);
											}}
											type="text"
											placeholder="Buscar"
										/>
									</label>
									{search.trim() !== "" && (
										<button onClick={getAllWorkoutsController}>Buscar</button>
									)}
								</div>
								<div className={styles.workouts_search_selects}>
									<Dropdown
										text="Frecuencia"
										isOpen={isOpenFrequency}
										setIsOpen={setIsOpenFrequency}
										classDivChild={styles.child}
										classBtn={styles.btn}
									>
										{["1", "2", "3", "4", "5", "6", "Cualquiera"].map(
											(freq: string) => {
												return (
													<div
														key={freq}
														onClick={() => {
															setOptionFrequency(freq as any);
															setIsOpenFrequency(false);
														}}
														className={`${optionFrequency === freq && styles.active
															}`}
													>
														{freq}
													</div>
												);
											}
										)}
									</Dropdown>
									<Dropdown
										text="Nivel"
										isOpen={isOpenLevel}
										setIsOpen={setIsOpenLevel}
										classDivChild={styles.child}
										classBtn={styles.btn}
									>
										{[
											"Principiante",
											"Intermedio",
											"Avanzado",
											"Cualquiera",
										].map((level: string) => {
											return (
												<div
													key={level}
													onClick={() => {
														setOptionLevel(level as any);
														setIsOpenLevel(false);
													}}
													className={`${optionLevel === level && styles.active
														}`}
												>
													{level}
												</div>
											);
										})}
									</Dropdown>
									<Dropdown
										text="Tipo"
										isOpen={isOpenType}
										setIsOpen={setIsOpenType}
										classDivChild={styles.child}
										classBtn={styles.btn}
									>
										{["Fuerza", "Hipertrofia", "Híbrido", "Cualquiera"].map(
											(typeW: string) => {
												return (
													<div
														key={typeW}
														onClick={() => {
															setOptionType(typeW as any);
															setIsOpenType(false);
														}}
														className={`${optionType === typeW && styles.active
															}`}
													>
														{typeW}
													</div>
												);
											}
										)}
									</Dropdown>
								</div>
							</div>

							{isLoadingAll ? (
								<Skeleton />
							) : (
								<div className={styles.workouts_container_wrapper}>
									{allWorkouts.length == 0 && (
										<div className={styles.workoutless_container}>
											<img
												className={styles.workoutless_img}
												src="https://cdn-icons-png.flaticon.com/512/607/607870.png"
											/>
											<p className={styles.p_workoutsless}>No hay workouts</p>
											<p className={styles.p_workoutsless_bold}>
												No hay workouts registrados
											</p>
										</div>
									)}
									{allWorkouts.map((workout: IWorkout, index: number) => {
										return (
											<Fragment key={index}>
												<WorkoutNoFav
													visit={visit}
													like={like}
													edit={edit}
													isLiked={workout.liked}
													workout={workout}
												/>
											</Fragment>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Workouts;
