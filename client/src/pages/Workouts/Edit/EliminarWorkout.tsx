import PopUp from "../../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction } from "react";
import styles from "./Delete.module.css";
import { deleteWorkout } from "../../../routes/workouts/workouts.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { useContext } from "react";
import { useNavigate } from "react-router";


interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    workoutId: string;
}

export const EliminarWorkout = ({
    isOpen,
    setIsOpen,
    workoutId
}: Props) => {
    const { addStaticMsg } = useContext(MessagesContext);
    const navigate = useNavigate();
    
    const _delete = (): void => {
		if (workoutId === null) return;
		const ask = async (): Promise<void> => {
			const data = await deleteWorkout(workoutId);
			if (data === null) {
				addStaticMsg("Error al eliminar la rutina", "danger");
				return;
			}

			if (data.msg !== "") {
				addStaticMsg(data.msg, "danger");
				return;
			}

			//lastDeleted.current = workoutId;
			addStaticMsg("Rutina eliminada con éxito", "success");
			setIsOpen(false);
		};
		void ask();
	}
  
    return (
    <>
        <PopUp
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className={styles.layout}>
                <h2>Eliminar rutina</h2>
                <h4>¿Estás seguro de que deseas eliminar esta rutina?</h4>
                <p>(Se eliminara toda la información perteneciente a esta rutina)</p>  
                
                <div className={styles.buttons}>
                    <button id={styles.yes} onClick={(e) => _delete()}>Aceptar</button>
                    <button id={styles.no} onClick={(e) => setIsOpen(false)}>Cancelar</button> 
                </div>
            </div>
        </PopUp>
    </>
  )
}
