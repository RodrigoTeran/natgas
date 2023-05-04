import styles from "./Workout.module.css";
import { IWorkout } from "../../../interfaces/Workout.interfaces";
import volume from "../images/volume.png";
import favYes from "../images/favYes.png";
import favNo from "../images/favNo.png";
import { useContext } from "react";
import { AppContext } from "../../../App";
import frequency from "../images/frequency.png";

const mapLevel = new Map<string, number>();
mapLevel.set("Principiante", 1);
mapLevel.set("Intermedio", 2);
mapLevel.set("Avanzado", 3);

interface Props {
    workout: IWorkout;
    isLiked?: boolean;
    like: (id: string) => any
    visit: (id: string) => any
    edit: (id: string) => any
}

function Workout({
    workout,
    like,
    isLiked = false,
    visit,
    edit
}: Props) {
    const { user } = useContext(AppContext);

    const getLevel = (): number => {
        const l = mapLevel.get(workout.workoutLevelName);
        if (l === undefined) return 3;
        return l;
    }

    return (
        <div className={styles.workout}>

            {user?.role === "Administrador" && (
                <div onClick={() => {
                    edit(workout.id);
                }} className={styles.edit}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                </div>
            )}

            <div className={styles.like} onClick={() => {
                like(workout.id)
            }}>
                <img src={isLiked ? favYes : favNo} alt="Tageado" />
            </div>
            <div onClick={() => {
                visit(workout.id);
            }} className={styles.workout_name} style={{
                paddingLeft: user?.role === "Administrador" ? "60px" : "15px"
            }}>
                {workout.name}
            </div>
            <div className={styles.workout_all}>
                <div className={styles.data}>
                    <div className={styles.data_block}>
                        <div className={styles.data_block_title}>
                            <img src={volume} alt="Nivel" />
                            Nivel:
                        </div>
                        <div className={styles.data_block_data}>
                            {getLevel()}
                        </div>
                    </div>
                    |
                    <div className={`${styles.data_block}`}>
                        <div className={styles.data_block_title}>
                            <img src={frequency} alt="Frequencia" />
                            Frequencia:
                        </div>
                        <div className={styles.data_block_data}>
                            {workout.frequency}
                        </div>
                    </div>
                    |
                    <div className={styles.data_block}>
                        <div className={styles.data_block_title}>
                            <span>

                            </span>
                            Tipo:
                        </div>
                        <div className={styles.data_block_type}>
                            {workout.typeName}
                        </div>
                    </div>
                </div>
                <div className={styles.exercises}>
                    {Array.from(workout.exercises).slice(0, 4).map((exe: string, index: number) => {
                        return (
                            <div key={index} className={styles.exercise}>
                                {exe}
                            </div>
                        )
                    })}
                    {workout.exercises.length > 4 && (
                        <div className={styles.more}>
                            {workout.exercises.length - 4}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Workout;