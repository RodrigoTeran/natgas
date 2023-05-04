import PopUp from "../../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction, useEffect, useState, useContext, Fragment } from "react";
import styles from "./Workout.module.css";
import stylesFav from "../WorkoutFav/Workout.module.css";
import { mapLevel } from "../WorkoutFav/Workout";
import { getWorkout } from "../../../routes/workouts/workouts.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { ICompleteWorkout, IImageWorkout, IExerciseWorkout } from "../../../interfaces/Workout.interfaces";
import volume from "../images/volume.png";
import frequency from "../images/frequency.png";

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
    const [indexImage, setIndexImage] = useState<number>(0);

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

    const getLevel = (): number => {
        if (workout === null) return 0;
        const l = mapLevel.get(workout.workoutLevelName);
        if (l === undefined) return 3;
        return l;
    }

    useEffect(() => {
        if (!isOpen) return;
        if (isLoading) return;
        getWorkoutController();
    }, [workoutId, isOpen, isLoading]);

    return (
        <PopUp isOpen={isOpen} setIsOpen={setIsOpen} callbackClose={clear} className={styles.pop}>
            <div className={styles.container}>
                {isLoading && (
                    <div>
                        Cargando...
                    </div>
                )}
                {workout !== null && (
                    <>
                        <div className={styles.title}>
                            {workout?.name}
                        </div>
                        <div className={styles.images}>
                            <div className={styles.images_aside}></div>
                            <div className={styles.images_main}>
                                <img src={workout.images[indexImage].src} alt={workout.name} />
                            </div>
                            <div className={styles.images_aside}>
                                {workout.images.map((image: IImageWorkout, index: number) => {
                                    if (index === indexImage) return (
                                        <Fragment key={index}></Fragment>
                                    )
                                    return (
                                        <div onClick={() => {
                                            setIndexImage(index);
                                        }} key={index}>
                                            <img src={image.src} alt={workout.name} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.numbers}>
                            <div className={stylesFav.data_block}>
                                <div className={stylesFav.data_block_title}>
                                    <img src={volume} alt="Nivel" />
                                    Nivel
                                </div>
                                <div className={stylesFav.data_block_data}>
                                    {Array.from(Array(getLevel()).keys()).map((lev: number) => {
                                        return (
                                            <div className={stylesFav.level_active} key={lev}></div>
                                        )
                                    })}
                                    {Array.from(Array(3 - getLevel()).keys()).map((lev: number) => {
                                        return (
                                            <div className={stylesFav.level_notactive} key={lev}></div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={`${stylesFav.data_block}`}>
                                <div className={stylesFav.data_block_title}>
                                    <img src={frequency} alt="Frequencia" />
                                    Frequencia
                                </div>
                                <div className={stylesFav.data_block_data}>
                                    {Array.from(Array(workout.frequency).keys()).map((freq: number) => {
                                        return (
                                            <div className={stylesFav.frequency_active} key={freq}></div>
                                        )
                                    })}
                                    {Array.from(Array(6 - workout.frequency).keys()).map((freq: number) => {
                                        return (
                                            <div className={stylesFav.frequency_notactive} key={freq}></div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={stylesFav.data_block}>
                                <div className={stylesFav.data_block_title}>
                                    <span>

                                    </span>
                                    Tipo
                                </div>
                                <div className={stylesFav.data_block_type}>
                                    {workout.typeName}
                                </div>
                            </div>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.description}>
                                <div className={styles.description_title}>
                                    Descripción
                                </div>
                                <p style={{
                                    whiteSpace: "pre-line"
                                }}>
                                    {workout.description}
                                </p>
                            </div>
                            <div className={styles.exercises}>
                                <div className={styles.exercises_title}>
                                    Ejercicios
                                </div>
                                <div className={styles.exercises_data}>
                                    {workout.exercises.map((exercise: IExerciseWorkout, index: number) => {
                                        return (
                                            <div key={index}>
                                                {exercise.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.complete_exercises}>
                                {workout.exercises.map((exercise: IExerciseWorkout, index: number) => {
                                    return (
                                        <div key={index} className={styles.complete_exercises_container}>
                                            <div className={styles.complete_exercises_container_title}>
                                                {exercise.name}
                                            </div>
                                            <div className={styles.complete_exercises_container_data}>
                                                <div className={styles.complete_exercises_container_data_img}>
                                                    <img src={exercise.src} alt={exercise.name} />
                                                </div>
                                                <div className={styles.complete_exercises_container_info}>
                                                    <div className={styles.complete_exercises_container_info_des}>
                                                        Descripción:
                                                    </div>
                                                    <p>
                                                        {exercise.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}

            </div>
        </PopUp>
    )
}

export default Workout;