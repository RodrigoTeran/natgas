import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./Create.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function CreateWorkout({
    isOpen,
    setIsOpen
}: Props) {

    return (
        <PopUp
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className={styles.create}>
                <div className={styles.create_title}>
                    Crear Workout
                </div>
            </div>
        </PopUp>
    )
}

export default CreateWorkout;