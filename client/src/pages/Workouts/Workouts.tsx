import { Fragment, useEffect, useRef, useState } from "react";
import Layout from "../../layouts/Dashboard/Dashboard";
import WorkoutFav from "./WorkoutFav/Workout";
import WorkoutNoFav from "./WorkoutNoFav/Workout";
import { getWorkouts, IGetWorkoutsData } from "../../routes/workouts/workouts.routes";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import styles from "./Workouts.module.css";

function Workouts() {

    const controllerWorkout = useRef<boolean>(false);
    const [workouts, setWorkouts] = useState<IGetWorkoutsData>({
        workoutsAll: [],
        workoutsFav: []
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getWorkoutsController = (): void => {
        const doFetch = async (): Promise<void> => {
            setIsLoading(true);
            const data = await getWorkouts();
            setIsLoading(false);

            if (data === null) return;

            setWorkouts(data);
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
                <h2>
                    Workouts Favoritos
                </h2>
                {isLoading && (
                    <div>
                        Cargando...
                    </div>
                )}
                {!isLoading && (
                    <div>
                        <div className={styles.workouts_container}>
                            {workouts.workoutsFav.map((workout: IWorkout, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <WorkoutFav isLiked workout={workout} />
                                    </Fragment>
                                )
                            })}
                        </div>
                        xd
                        <div className={styles.workouts_container}>
                            {workouts.workoutsAll.map((workout: IWorkout, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <WorkoutNoFav workout={workout} />
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Workouts;