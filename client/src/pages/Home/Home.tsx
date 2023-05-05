import { Fragment, useState } from "react";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import Bitacora from "../Bitacora/Bitacora";
import { Data } from "../Progreso/Data/Data";
import type { IMeasurements } from "../Progreso/Progress.types";
import styles from "./Home.module.css";
//
import Skeleton from "../Workouts/Skeleton/Skeleton";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import WorkoutFav from "../Workouts/WorkoutFav/Workout";
import {
	getFavWorkouts,
	likeUnlikeWorkout,
} from "../../routes/workouts/workouts.routes";
import DietasFavs from "../Dietas/DietasFavs";
import { useNavigate } from "react-router-dom";
//
import { getAllFavs, setDietStatus } from "../../routes/diets/diet.routes";
import favicon from "../Dietas/images/favicon.svg";
import caloriesIcon from "../Dietas/images/calories.svg";
import grasas from "../Dietas/images/grasas.svg";
import carbohidrato from "../Dietas/images/carbohidrato.svg";
import proteina from "../Dietas/images/proteina.svg";
import BitacoraContent from "../Bitacora/BitacoraContent";
import { ProgresoHome } from "../Progreso/ProgresoHome";
import DietasFavsHome from "../Dietas/DietasFavsHome";
import WorkoutsHome from "../Workouts/WorkoutsHome";
//

function Home() {
	const navigate = useNavigate();
	const [esponjaBody, setEsponjaBody] = useState<any>([]);
	const [esponjaValue, setEsponjaValue] = useState<any>("Agregar...");
	const [esponjaStart, setEsponjaStart] = useState<any>("0000-01-01 00:00:00");
	const [esponjaEnd, setEsponjaEnd] = useState<any>("9999-12-31 23:59:59");
	const [value, setValue] = useState<any>("Agregar...");
	const [garyValue, setGaryValue] = useState<any>("Agregar...");
	const [patricioValue, setPatricioValue] = useState<any>("Agregar...");
	const [calamardoValue, setCalamardoValue] = useState<any>("Agregar...");
	const [esponjaMeasurements, setEsponjaMeasurements] = useState<IMeasurements>(
		{}
	);
	//
	const [isLoadingFavs, setIsLoadingFavs] = useState<boolean>(true);
	const [favWorkouts, setFavWorkouts] = useState<IWorkout[]>([]);
	const [viewWorkout, setViewWorkout] = useState<string | null>(null);
	const [isOpenViewWorkout, setIsOpenViewWorkout] = useState<boolean>(false);
	const [editWorkout, setEditWorkout] = useState<string | null>(null);
	const [isOpenEditWorkout, setIsOpenEditWorkout] = useState<boolean>(false);
	//
	//
	const [diets, setDiets] = useState<any>([]);
	const [calorieFilter, setCalorieFilter] = useState(0);
	const [ingredientFilter, setIngredientFilter] = useState("%");
	const [calories, setCalories] = useState<any>([]);

	//

	const handleChange = (e: any, pointer: number): void => {
		if (pointer === 0) setValue(e.target.value);
		if (pointer === 1) setGaryValue(e.target.value);
		if (pointer === 2) setPatricioValue(e.target.value);
		if (pointer === 3) setCalamardoValue(e.target.value);
		if (pointer === 4) setEsponjaValue(e.target.value);
	};

	const dictionary = new Map<string, string>();
	dictionary.set("chest", "Pecho");
	dictionary.set("hip", "Cadera");
	dictionary.set("leftArm", "Brazo izq");
	dictionary.set("leftCalve", "Pantorrilla izq");
	dictionary.set("leftForearm", "Antebrazo izq");
	dictionary.set("leftLeg", "Pierna izq");
	dictionary.set("neck", "Cuello");
	dictionary.set("rightArm", "Brazo der");
	dictionary.set("rightCalve", "Pantorrilla der");
	dictionary.set("rightForearm", "Antebrazo der");
	dictionary.set("rightLeg", "Pierna der");
	dictionary.set("waist", "Cintura");
	dictionary.set("weight", "Peso");

	const body = [
		"chest",
		"hip",
		"leftArm",
		"leftCalve",
		"leftForearm",
		"leftLeg",
		"neck",
		"rightArm",
		"rightCalve",
		"rightForearm",
		"rightLeg",
		"waist",
	];

	//
	const getFavWorkoutsController = (): void => {
		const doFetch = async (): Promise<void> => {
			setIsLoadingFavs(true);
			const resData = await getFavWorkouts();

			// Mostrar mensaje en pantalla si hubo un error
			if (resData === null) {
				// addStaticMsg("Error al obtener las rutinas favoritas", "danger");
				return;
			}

			if (resData.msg !== "") {
				// addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			setIsLoadingFavs(false);

			if (data === null) return;

			setFavWorkouts(data.workouts);
		};
		void doFetch();
	};
	const like = (workoutId: string) => {
		const doFetch = async (): Promise<void> => {
			const resData = await likeUnlikeWorkout(workoutId);
			if (resData === null) {
				// addStaticMsg("Error al darle like a una rutina", "danger");
				return;
			}

			if (resData.msg !== "") {
				// addStaticMsg(resData.msg, "danger");
				return;
			}
			// getAllWorkoutsController();
			getFavWorkoutsController();
		};
		void doFetch();
	};
	const visit = (id: string): void => {
		setViewWorkout(id);
		setIsOpenViewWorkout(true);
	};

	const edit = (id: string): void => {
		setEditWorkout(id);
		setIsOpenEditWorkout(true);
	};
	//

	//
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
				// addStaticMsg("Error al obtener las dietas favoritas", "danger");
				return;
			}

			if (resData.msg !== "") {
				// addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			if (data === null) return;
			setDiets(data.diets);
			setCalories(data.calories);
		};
		void doFetch();
	};

	//

	return (
		<Dashboard>
			<div className={styles.content}>
				<div className={styles.left}>
					<div className={styles.section_dietas}>
						<h3>Dietas Favoritas</h3>

						<DietasFavsHome />
					</div>
					<div className={styles.section_rutinas}>
						<h3>Rutinas Favoritas</h3>
						<WorkoutsHome />
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.section_progreso}>
						<h3>Progreso</h3>
						<ProgresoHome />
					</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<BitacoraContent />
			</div>
		</Dashboard>
	);
}

export default Home;
