import styles from "./Workout.module.css";
import { IWorkout } from "../../../interfaces/Workout.interfaces";
import volume from "../images/volume.png";
import favYes from "../images/favYes.png";
import favNo from "../images/favNo.png";
import frequency from "../images/frequency.png";

const mapLevel = new Map<string, number>();
mapLevel.set("Principiante", 1);
mapLevel.set("Intermedio", 2);
mapLevel.set("Avanzado", 3);

interface Props {
    workout: IWorkout;
    isLiked?: boolean;
    like: (id: string) => any
}

function Workout({
    workout,
    like,
    isLiked = false
}: Props) {


    const getLevel = (): number => {
        const l = mapLevel.get(workout.workoutLevelName);
        if (l === undefined) return 3;
        return l;
    }

    return (
        <div className={styles.workout}>
            <div className={styles.like} onClick={() => {
                like(workout.id)
            }}>
                <img src={isLiked ? favYes : favNo} alt="Tageado" />
            </div>
            <div className={styles.workout_name}>
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