import PopUp from "../../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Workout.module.css";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    workoutId: string;
}


const Workout = ({
    isOpen,
    setIsOpen,
    workoutId
}: Props) => {

    const [isLoading, setisLoading] = useState<boolean>(false);

    const clear = (): void => {

    }

    const getWorkoutController = (): void => {
        const doFetch = async (): Promise<void> => {
            
        }
        void doFetch();
    }

    useEffect(() => {
        if (!isOpen) return;
        if (isLoading) return;

    }, [workoutId, isOpen, isLoading]);

    return (
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen} callbackClose={clear}>
            <div className={styles.container}>
                <div>
                    Todo aqui
                </div>
            </div>
        </PopUp>
    )
}

export default Workout;