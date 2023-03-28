import { Fragment, useEffect, useRef, useState } from "react";
import Layout from "../../layouts/Dashboard/Dashboard";
import WorkoutFav from "./WorkoutFav/Workout";
import WorkoutNoFav from "./WorkoutNoFav/Workout";
import Dropdown from "../../components/Dropdown/Dropdown";
import { getWorkouts } from "../../routes/workouts/workouts.routes";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import styles from "./Workouts.module.css";

function Workouts() {

    const controllerWorkout = useRef<boolean>(false);
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [isOpenFrequency, setIsOpenFrequency] = useState<boolean>(false);
    const [isOpenLevel, setIsOpenLevel] = useState<boolean>(false);
    const [isOpenType, setIsOpenType] = useState<boolean>(false);

    const getWorkoutsController = (): void => {
        const doFetch = async (): Promise<void> => {
            setIsLoading(true);
            const data = await getWorkouts();
            setIsLoading(false);

            if (data === null) return;

            setWorkouts(data.workouts);
        };
        void doFetch();
    }

    useEffect(() => {
        if (controllerWorkout.current) return;
        controllerWorkout.current = true;

        getWorkoutsController();
    }, []);

    return (
        <Layout>
            <div className={styles.workouts_fav}>
                {isLoading && (
                    <div>
                        Cargando...
                    </div>
                )}
                {!isLoading && (
                    <div className={styles.wrapper}>
                        <div className={styles.workouts_container}>
                            <h2>
                                Workouts Favoritos
                            </h2>
                            <div className={styles.workouts_container_wrapper}>
                                {workouts.map((workout: IWorkout, index: number) => {
                                    if (!workout.liked) return (
                                        <Fragment key={index}></Fragment>
                                    )
                                    return (
                                        <Fragment key={index}>
                                            <WorkoutFav isLiked={workout.liked} workout={workout} />
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>

                        <div className={styles.workouts_container}>
                            <h2>
                                Buscar Otros Workouts
                            </h2>
                            <div className={styles.workouts_search}>
                                <label>
                                    <input type="text" placeholder="Buscar" />
                                </label>
                                <div className={styles.workouts_search_selects}>
                                    <Dropdown
                                        text="Frecuencia"
                                        isOpen={isOpenFrequency}
                                        setIsOpen={setIsOpenFrequency}
                                        classDivChild={styles.child}
                                        classBtn={styles.btn}
                                    >
                                        <div>1</div>
                                        <div>2</div>
                                        <div>3</div>
                                        <div>4</div>
                                        <div>5</div>
                                        <div>6</div>

                                    </Dropdown>
                                    <Dropdown
                                        text="Nivel"
                                        isOpen={isOpenLevel}
                                        setIsOpen={setIsOpenLevel}
                                        classDivChild={styles.child}
                                        classBtn={styles.btn}
                                    >
                                        <div>Principiante</div>
                                        <div>Intermedio</div>
                                        <div>Avanzado</div>

                                    </Dropdown>
                                    <Dropdown
                                        text="Tipo"
                                        isOpen={isOpenType}
                                        setIsOpen={setIsOpenType}
                                        classDivChild={styles.child}
                                        classBtn={styles.btn}
                                    >
                                        <div>Fuerza</div>
                                        <div>Hipertrofia</div>
                                        <div>Híbrido</div>

                                    </Dropdown>
                                </div>
                            </div>
                            <div className={styles.workouts_container_wrapper}>
                                {workouts.map((workout: IWorkout, index: number) => {
                                    if (workout.liked) return (
                                        <Fragment key={index}></Fragment>
                                    )
                                    return (
                                        <Fragment key={index}>
                                            <WorkoutNoFav isLiked={workout.liked} workout={workout} />
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Workouts;