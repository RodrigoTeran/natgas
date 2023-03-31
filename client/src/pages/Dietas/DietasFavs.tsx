import Dashboard from "../../layouts/Dashboard/Dashboard";
import { getAllFavs } from "../../routes/diets/diet.routes";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Dietas.module.css";
import favicon from "./images/favicon.svg";
import { useNavigate } from "react-router"
import caloriesIcon from "./images/calories.svg";
import grasas from "./images/grasas.svg";
import carbohidrato from "./images/carbohidrato.svg"
import proteina from "./images/proteina.svg";
import { useEffect, useState, useContext } from "react";
import { MessagesContext } from "../../layouts/Messages/Messages";

function DietasFavs() {
    const { addStaticMsg } = useContext(MessagesContext);
    const navigate = useNavigate();

    const [caloriasOpen, setCaloriasOpen] = useState(false);
    const [ingredientFilter, setIngredientFilter] = useState('%');
    const [calorieFilter, setCalorieFilter] = useState(0);

    const [calories, setCalories] = useState<any>([]);
    const [diets, setDiets] = useState<any>([]);

    const filterCalories = (filter: number) => {
        setCaloriasOpen(false);
        setCalorieFilter(filter);
    };

    const macrosSum = (macros: any): number[] => {
        const carbs = Number.parseInt(macros[0].carbohidratos[0].split(0, macros[0].carbohidratos[0].length - 1));
        const proteins = Number.parseInt(macros[0].proteina[0].split(0, macros[0].proteina[0].length - 1));
        const fat = Number.parseInt(macros[0].grasas[0].split(0, macros[0].grasas[0].length - 1));

        return [carbs, proteins, fat, carbs + fat + proteins];
    }

    const getAllFavsController = (): void => {
        const doFetch = async (): Promise<void> => {

            const resData = await getAllFavs(calorieFilter.toString(), ingredientFilter);

            if (resData === null) {
                addStaticMsg("Error al obtener las dietas favoritas", "danger");
                return;
            }

            if (resData.msg !== "") {
                addStaticMsg(resData.msg, "danger");
                return;
            }

            const data = resData.data;

            if (data === null) return;
            setDiets(data.diets);
            setCalories(data.calories);
        };
        void doFetch();
    }

    useEffect(() => {
        getAllFavsController();
    }, [calorieFilter, ingredientFilter]);

    return (
        <Dashboard>
            <div className={styles.layout}>
                <div className={styles.dietas}>
                    <h1> Dietas favoritas </h1>

                    <div className={styles.dietas}>

                        <div className={styles.search_bar}>
                            <div className={styles.aux}>
                                {calories.length > 0 && (
                                    <Dropdown text={calorieFilter == 0 ? ("Calorias") : (calorieFilter.toString())} isOpen={caloriasOpen} setIsOpen={setCaloriasOpen}>
                                        <div className={styles.selection_calories}>
                                            <div onClick={() => { filterCalories(0) }} key={calories.length}>Default</div>
                                            {calories.map((element: string, key: number) => {
                                                return (
                                                    <div onClick={() => { filterCalories(Number.parseInt(element)) }} key={key}>{element}</div>
                                                )
                                            })}
                                        </div>
                                    </Dropdown>
                                )}
                            </div>

                            <div className={styles.aux}>
                                <input onChange={(e) => { setIngredientFilter(e.target.value) }} type="text" name="alimentos" id="alimentos" placeholder="&#128269;  Buscar alimento" />
                            </div>
                        </div>
                    </div>
                    <section>
                        {diets.length === 0 && <h2>No hay dietas favoritas registradas</h2>}
                        {diets.length > 0 && (diets.map((element: any, key: any) => {
                            const macros = macrosSum(JSON.parse(element.macros));

                            return (
                                <article key={key} className={styles.dieta_favorita}>
                                    <div className={styles.titulo}>
                                        <h2>Dieta {element.name}</h2>
                                        <img src={favicon} alt="Icono favoritos" />
                                    </div>

                                    <div className={styles.calorias}>
                                        <img src={caloriesIcon} alt="Icono calorías" />
                                        <p><span className={styles.subtitle}>Energía total:</span> {element.calories} calorías</p>
                                    </div>

                                    <div className={styles.macros}>
                                        <div className={styles.macros_info}>
                                            <div className={styles.macros_item}>
                                                <img src={carbohidrato} alt="Icono carbs" />
                                                <p>Carbs</p>
                                            </div>
                                            <h5>{JSON.parse(element.macros)[0].carbohidratos[0]}</h5>
                                            <div className={styles.bar}>
                                                <div className={styles.color_carbs} style={{
                                                    width: `${macros[0] / macros[3] * 100}%`
                                                }}>

                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.macros_info}>
                                            <div className={styles.macros_item}>
                                                <img src={proteina} alt="Icono proteina" />
                                                <p>Proteina</p>
                                            </div>
                                            <h5>{JSON.parse(element.macros)[0].proteina[0]}</h5>
                                            <div className={styles.bar}>
                                                <div className={styles.color_protein} style={{
                                                    width: `${macros[1] * 100 / macros[3]}%`
                                                }}>

                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.macros_info}>
                                            <div className={styles.macros_item}>
                                                <img src={grasas} alt="Icono grasas" />
                                                <p>Grasas</p>
                                            </div>
                                            <h5>{JSON.parse(element.macros)[0].grasas[0]}</h5>
                                            <div className={styles.bar}>
                                                <div className={styles.color_fats} style={{
                                                    width: `${macros[2] / macros[3] * 100}%`
                                                }}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )
                        }))}
                    </section>

                    <div className={styles.btn_container}>
                        <button onClick={() => { navigate('/dietas') }} id={styles.ver_todo}>Regresar</button>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}

export default DietasFavs;
