import {
	Fragment,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
	useContext,
} from "react";
import styles from "./Exercises.module.css";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import ComingSoon from "../../components/ComingSoon/ComingSoon";
import { AppContext } from "../../App";
import { MessagesContext } from "../../layouts/Messages/Messages";
import CreateExercise from "../Workouts/createExercise/CreateExercise";
import createI from "../Workouts/images/create.png";

function Exercises() {
	const { addStaticMsg } = useContext(MessagesContext);
	const { user } = useContext(AppContext);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenCreateExercise, setIsOpenCreateExercise] =
		useState<boolean>(false);
	return (
		<>
			{user?.role === "Administrador" && (
				<CreateExercise
					isOpen={isOpenCreateExercise}
					setIsOpen={setIsOpenCreateExercise}
				/>
			)}
			<Dashboard>
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
				<ComingSoon />
			</Dashboard>
		</>
	);
}

export default Exercises;
