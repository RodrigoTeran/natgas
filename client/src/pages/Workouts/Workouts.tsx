import { Fragment, useEffect, useRef, useState, useContext } from "react";
import Layout from "../../layouts/Dashboard/Dashboard";
import WorkoutFav from "./WorkoutFav/Workout";
import WorkoutNoFav from "./WorkoutNoFav/Workout";
import Dropdown from "../../components/Dropdown/Dropdown";
import Skeleton from "./Skeleton/Skeleton";
import { getAllWorkouts, getFavWorkouts, likeUnlikeWorkout } from "../../routes/workouts/workouts.routes";
import { IWorkout } from "../../interfaces/Workout.interfaces";
import { MessagesContext } from "../../layouts/Messages/Messages";
import styles from "./Workouts.module.css";

function Workouts() {
    const { addStaticMsg } = useContext(MessagesContext);
    const controllerWorkout = useRef<boolean>(false);
    const [favWorkouts, setFavWorkouts] = useState<IWorkout[]>([]);
    const [allWorkouts, setAllWorkouts] = useState<IWorkout[]>([]);
    const [isLoadingFavs, setIsLoadingFavs] = useState<boolean>(true);
    const [isLoadingAll, setIsLoadingAll] = useState<boolean>(true);

    const [isOpenFrequency, setIsOpenFrequency] = useState<boolean>(false);
    const [isOpenLevel, setIsOpenLevel] = useState<boolean>(false);
    const [isOpenType, setIsOpenType] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");
    const [optionFrequency, setOptionFrequency] = useState<"1" | "2" | "3" | "4" | "5" | "6" | "Cualquiera">("Cualquiera");
    const [optionLevel, setOptionLevel] = useState<"Principiante" | "Intermedio" | "Avanzado" | "Cualquiera">("Cualquiera");
    const [optionType, setOptionType] = useState<"Fuerza" | "Hipertrofia" | "Híbrido" | "Cualquiera">("Cualquiera");

    const getFavWorkoutsController = (): void => {
        const doFetch = async (): Promise<void> => {
            setIsLoadingFavs(true);
            const data = await getFavWorkouts();
            setIsLoadingFavs(false);

            if (data === null) return;

            setFavWorkouts(data.workouts);
        };
        void doFetch();
    }

    const getAllWorkoutsController = (): void => {
        const doFetch = async (): Promise<void> => {
            setIsLoadingAll(true);
            let query = "";

            if (search.trim() !== "") {
                query += "search=" + search;
            }
            if (optionFrequency !== "Cualquiera") {
                query += "frequency=" + optionFrequency;
            }
            if (optionLevel !== "Cualquiera") {
                query += "level=" + optionLevel;
            }
            if (optionType !== "Cualquiera") {
                query += "type=" + optionType;
            }

            const data = await getAllWorkouts(query);
            setIsLoadingAll(false);

            if (data === null) return;

            setAllWorkouts(data.workouts);
        };
        void doFetch();
    }

    const like = (workoutId: string) => {
        const doFetch = async (): Promise<void> => {
            const data = await likeUnlikeWorkout(workoutId);
            if (data.msg !== "") {
                addStaticMsg(data.msg, "danger")
                return;
            }
            getAllWorkoutsController();
            getFavWorkoutsController();
        };
        void doFetch()
    }

    useEffect(() => {
        getAllWorkoutsController();
    }, [optionFrequency, optionLevel, optionType]);

    useEffect(() => {
        if (search.trim() !== "") return;
        getAllWorkoutsController();
    }, [search]);

    useEffect(() => {
        if (controllerWorkout.current) return;
        controllerWorkout.current = true;

        getFavWorkoutsController();
    }, []);

    return (
        <Layout>
            <div className={styles.workouts_fav}>
                <div className={styles.wrapper}>
                    <div className={styles.workouts_container}>
                        <h2>
                            Workouts Favoritos
                        </h2>
                        {isLoadingFavs ? (
                            <div className={`${styles.loader} ${isLoadingFavs && styles.loader_open}`}>
                                <Skeleton />
                            </div>
                        ) : (
                            <div className={styles.workouts_container_wrapper}>
                                {favWorkouts.map((workout: IWorkout, index: number) => {
                                    if (!workout.liked) return (
                                        <Fragment key={index}></Fragment>
                                    )
                                    return (
                                        <Fragment key={index}>
                                            <WorkoutFav like={like} isLiked={workout.liked} workout={workout} />
                                        </Fragment>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <div className={styles.workouts_container}>
                        <h2>
                            Buscar Otros Workouts
                        </h2>
                        <div className={styles.workouts_search}>
                            <div className={styles.workouts_search_wrapper}>
                                <label>
                                    <input value={search} onChange={(e) => {
                                        setSearch(e.target.value);
                                    }} type="text" placeholder="Buscar" />
                                </label>
                                {search.trim() !== "" && (
                                    <button onClick={getAllWorkoutsController}>
                                        Buscar
                                    </button>
                                )}
                            </div>
                            <div className={styles.workouts_search_selects}>
                                <Dropdown
                                    text="Frecuencia"
                                    isOpen={isOpenFrequency}
                                    setIsOpen={setIsOpenFrequency}
                                    classDivChild={styles.child}
                                    classBtn={styles.btn}
                                >
                                    {["1", "2", "3", "4", "5", "6", "Cualquiera"].map((freq: string) => {
                                        return (
                                            <div key={freq} onClick={() => {
                                                setOptionFrequency(freq as any);
                                                setIsOpenFrequency(false);
                                            }} className={`${optionFrequency === freq && styles.active}`}>{freq}</div>
                                        )
                                    })}
                                </Dropdown>
                                <Dropdown
                                    text="Nivel"
                                    isOpen={isOpenLevel}
                                    setIsOpen={setIsOpenLevel}
                                    classDivChild={styles.child}
                                    classBtn={styles.btn}
                                >
                                    {["Principiante", "Intermedio", "Avanzado", "Cualquiera"].map((level: string) => {
                                        return (
                                            <div key={level} onClick={() => {
                                                setOptionLevel(level as any);
                                                setIsOpenLevel(false);
                                            }} className={`${optionLevel === level && styles.active}`}>{level}</div>
                                        )
                                    })}
                                </Dropdown>
                                <Dropdown
                                    text="Tipo"
                                    isOpen={isOpenType}
                                    setIsOpen={setIsOpenType}
                                    classDivChild={styles.child}
                                    classBtn={styles.btn}
                                >
                                    {["Fuerza", "Hipertrofia", "Híbrido", "Cualquiera"].map((typeW: string) => {
                                        return (
                                            <div key={typeW} onClick={() => {
                                                setOptionType(typeW as any);
                                                setIsOpenType(false);
                                            }} className={`${optionType === typeW && styles.active}`}>{typeW}</div>
                                        )
                                    })}
                                </Dropdown>
                            </div>
                        </div>

                        {isLoadingAll ? (
                            <Skeleton />
                        ) : (
                            <div className={styles.workouts_container_wrapper}>
                                {allWorkouts.map((workout: IWorkout, index: number) => {
                                    return (
                                        <Fragment key={index}>
                                            <WorkoutNoFav like={like} isLiked={workout.liked} workout={workout} />
                                        </Fragment>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default Workouts;