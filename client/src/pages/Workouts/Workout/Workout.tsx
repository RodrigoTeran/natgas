import PopUp from "../../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction, useEffect, useState, useContext } from "react";
import styles from "./Workout.module.css";
import { getWorkout } from "../../../routes/workouts/workouts.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { ICompleteWorkout } from "../../../interfaces/Workout.interfaces";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    workoutId: string | null;
}


const Workout = ({
    isOpen,
    setIsOpen,
    workoutId
}: Props) => {
    const { addStaticMsg } = useContext(MessagesContext);
    const [workout, setWorkout] = useState<ICompleteWorkout | null>(null);

    const [isLoading, setisLoading] = useState<boolean>(false);

    const clear = (): void => {
        setWorkout(null);
    }

    const getWorkoutController = (): void => {
        if (workoutId === null) return;
        if (workout !== null) return;

        const doFetch = async (): Promise<void> => {
            setisLoading(true);
            const data = await getWorkout(workoutId);
            setisLoading(false);

            if (data === null) {
                addStaticMsg("Error al obtener la rutina", "danger");
                setIsOpen(false);
                return;
            }
            if (data.msg !== "") {
                addStaticMsg(data.msg, "danger");
                setIsOpen(false);
                return;
            }

            const resData = data.data.workout;
            setWorkout(resData);
        }
        void doFetch();
    }

    useEffect(() => {
        if (!isOpen) return;
        if (isLoading) return;
        getWorkoutController();
    }, [workoutId, isOpen, isLoading]);

    return (
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen} callbackClose={clear}>
            <div className={styles.container}>
                {isLoading && (
                    <div>
                        Cargando...
                    </div>
                )}
                {workout !== null && (
                    <>
                        <div>
                            {workout?.name}
                        </div>
                    </>
                )}

            </div>
        </PopUp>
    )
}

export default Workout;