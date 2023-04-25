import {
	Fragment,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
	useContext,
} from "react";
import styles from "./styles.module.css";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import ComingSoon from "../../components/ComingSoon/ComingSoon";
import { AppContext } from "../../App";
import { MessagesContext } from "../../layouts/Messages/Messages";
import CreateExercise from "../Workouts/createExercise/CreateExercise";
import EditExercise from "./editExercise/EditExercise"
import createI from "../Workouts/images/create.png";
import { getAll } from "../../routes/exercise/exercise.routes";
import pencil from "./images/pencil.svg";

function Exercises() {
	const { addStaticMsg } = useContext(MessagesContext);
	const { user } = useContext(AppContext);
	const [isOpenEditExercise, setIsOpenEditExercise] = useState<boolean>(false);
	const [isOpenCreateExercise, setIsOpenCreateExercise] =
		useState<boolean>(false);
	
	const [filter, setFilter] = useState<any>("");
	const [id, setId] = useState<any>("");
	const [exercices, setExercises] = useState<any>([]);

	function editar(id:string) {
		setId(id);
		setIsOpenEditExercise(true);
	}
	
	const getAllController = ():void => {
		const doFetch = async ():Promise<void> => {
			const resData = await getAll(filter);

			if (resData === null) {
                addStaticMsg("Error al obtener las dietas", "danger");
                return;
            }

            if (resData.msg !== "") {
                addStaticMsg(resData.msg, "danger");
                return;
            }

            const data = resData.data.data;

			setExercises(data);
		};
		void doFetch();
	}

	useEffect(() => {
		getAllController();
	}, [filter])
	
	return (
		<>
			{user?.role === "Administrador" && (
				<>
					<CreateExercise
						isOpen={isOpenCreateExercise}
						setIsOpen={setIsOpenCreateExercise}
					/>
					<EditExercise
						isOpen = {isOpenEditExercise}
						setIsOpen={setIsOpenEditExercise}
						id={id}
					/>
				</>
			)}
			<Dashboard>
			<div className={styles.layout}>
				{user?.role === "Administrador" && (
					<div className={styles.createButtons}>
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
						<div className={styles.ejercicios}>

							<h1>Ejercicios</h1>

							<div className={styles.search_bar}>
								<div className={styles.aux}>
									<input type="text" name="ejercicio" id="ejercicio" placeholder="&#128269;  Buscar ejercicio" onChange={(e) => {setFilter(e.target.value)}}/>
								</div>
							</div>

							<section className={styles.ejercicios_layout}>
								{exercices.length === 0 && (
									<h1>No hay ejercicios registrados</h1>
								)}
								{exercices.length > 0 &&
								(
									exercices.map((exercise: any, key: number) => {
										return (
											<article className={styles.ejercicio_card} key={key}>
												<div className={styles.name}>
													<h2>{exercise.name}</h2>
													{user?.role === "Administrador" && (
														<img src={pencil} alt="Edit Icon" onClick={(e) => {editar(exercise.id)}}/>
													)}	
												</div>
												
												<div className={styles.content}>
													<div className={styles.imagen}>
														<img src={exercise.src} alt="Pull up"/>
													</div>
													
													<div className={styles.descripcion}>
														<h3>Descripción:</h3>
														<p>{exercise.description}</p>
													</div>
												</div>
											</article>
										)
									})
								)}
		
							</section>
						</div>
					</div>
			</Dashboard>
		</>
	);
}

export default Exercises;
