import Dashboard from "../../layouts/Dashboard/Dashboard";
import {IDiet} from "../../interfaces/Diet.interface"
import { getAll } from "../../routes/diets/diet.routes";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Dietas.module.css";
import favicon from "./images/favicon.svg";
import calories from "./images/calories.svg";
import grasas from "./images/grasas.svg";
import carbohidrato from "./images/carbohidrato.svg"
import proteina from "./images/proteina.svg";
import notFavicon from "./images/notFavico.svg";
import { useEffect, useState } from "react";

function Dietas() {

    const [caloriasOpen, setCaloriasOpen] = useState(false);
    const [top3, setTop3] = useState<any>([]);

    
    const filterCalories = (filter: number) => {
        console.log(filter);

        setCaloriasOpen(false);
    };

    const macrosSum = (macros: any): number[] => {
        const carbs = Number.parseInt(macros[0].carbohidratos[0].split(0, macros[0].carbohidratos[0].length - 1));
        const proteins = Number.parseInt(macros[0].proteina[0].split(0, macros[0].proteina[0].length - 1));
        const fat = Number.parseInt(macros[0].grasas[0].split(0, macros[0].grasas[0].length - 1));
        
        return [carbs, proteins, fat, carbs + fat + proteins]; 
    }

    const getAllController = (): void => {
        const doFetch = async (): Promise<void> => {
            const data: any = await getAll();

            if(data === null) return;

            console.log(data);
            setTop3(data.top3);
        };
        void doFetch();
    }

    useEffect(() => {
        getAllController();
    }, []);

	return (
		<Dashboard>  
			<div className={styles.layout}> 
                <div className={styles.dietas}>
                    <h1> Dietas favoritas </h1>

                    {top3.length === 0 && <h2>No hay dietas favoritas registradas</h2>}

                    <section> 
                        {top3.map((element: any, key: any) => {

                            const macros = macrosSum(JSON.parse(element.macros));
                            console.log(macros);
                            
                            return (
                                <article key={key} className={styles.dieta_favorita}>
                            <div className={styles.titulo}>
                                <h2>Dieta {element.name}</h2>
                                <img src={favicon} alt="Icono favoritos"/>
                            </div>

                            <div className={styles.calorias}>
                                <img src={calories} alt="Icono calorías"/>
                                <p><span className={styles.subtitle}>Energía total:</span> {element.calories} calorías</p>
                            </div>

                            <div className={styles.macros}>
                                <div className={styles.macros_info}>
                                    <div className={styles.macros_item}>
                                        <img src={carbohidrato} alt="Icono carbs"/>
                                        <p>Carbs</p>
                                    </div>
                                    <h5>{JSON.parse(element.macros)[0].carbohidratos[0]}</h5>
                                    <div className={styles.bar}>
                                        <div className={styles.color_carbs} style={{
                                            width: `${macros[0]/macros[3]*100}%`
                                        }}>

                                        </div>
                                    </div>
                                </div>

                                <div className={styles.macros_info}>
                                    <div className={styles.macros_item}>
                                        <img src={proteina} alt="Icono proteina"/>
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
                                        <img src={grasas} alt="Icono grasas"/>
                                        <p>Grasas</p>
                                    </div>
                                    <h5>{JSON.parse(element.macros)[0].grasas[0]}</h5>
                                    <div className={styles.bar}>
                                        <div className={styles.color_fats} style={{
                                            width: `${macros[2]/macros[3]*100}%`
                                        }}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                            )
                        })}
                    </section>

                    <div className={styles.btn_container}>
                        <button id= {styles.ver_todo}>Ver todo</button>
                    </div>
                </div>

                <div className={styles.dietas}>
                    <h1>Buscar dietas</h1>

                    <div className={styles.search_bar}>
                        <div className={styles.aux}>
                            <Dropdown text="Calorias" isOpen={caloriasOpen} setIsOpen={setCaloriasOpen}>
                                <div className={styles.selection_calories}>
                                {[1400, 1500, 1600, 1700].map((element, key) =>{
                                    return (
                                        <div onClick={() => {filterCalories(element)}} key={key}>{element}</div>
                                    )
                                })}
                                </div>
                            </Dropdown>
                        </div>

                        <div className={styles.aux}>
                            <label htmlFor="alimentos">Buscar alimento</label>
                            <input type="text" name="alimentos" id="alimentos" placeholder="&#128269;  Buscar alimento"/>
                        </div>
                    </div>

                    <section>
                        <article className={styles.diet_card}>
                            <div className={styles.titulo}>
                                <h2>Nombre de la dieta</h2>
                                <img src={notFavicon} alt="Icono de !favoritos"/>
                            </div>

                            <div className={styles.diet_info}>
                                <div className={styles.macros_item}>
                                    <img src={calories} alt="Icono calorías"/>
                                    <p>1500</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={grasas} alt="Icono carbs"/>
                                    <p>32g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={proteina} alt="Icono carbs"/>
                                    <p>10g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
                                    <p>4g</p>
                                </div>
                            </div>
                        </article>

                        <article className={styles.diet_card}>
                            <div className={styles.titulo}>
                                <h2>Nombre de la dieta</h2>
                                <img src={notFavicon} alt="Icono de !favoritos"/>
                            </div>

                            <div className={styles.diet_info}>
                                <div className={styles.macros_item}>
                                    <img src={calories} alt="Icono calorías"/>
                                    <p>1500</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={grasas} alt="Icono carbs"/>
                                    <p>32g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={proteina} alt="Icono carbs"/>
                                    <p>10g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
                                    <p>4g</p>
                                </div>
                            </div>
                        </article>

                        <article className={styles.diet_card}>
                            <div className={styles.titulo}>
                                <h2>Nombre de la dieta</h2>
                                <img src={notFavicon} alt="Icono de !favoritos"/>
                            </div>

                            <div className={styles.diet_info}>
                                <div className={styles.macros_item}>
                                    <img src={calories} alt="Icono calorías"/>
                                    <p>1500</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={grasas} alt="Icono carbs"/>
                                    <p>32g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={proteina} alt="Icono carbs"/>
                                    <p>10g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
                                    <p>4g</p>
                                </div>
                            </div>
                        </article>

                        <article className={styles.diet_card}>
                            <div className={styles.titulo}>
                                <h2>Nombre de la dieta</h2>
                                <img src={notFavicon} alt="Icono de !favoritos"/>
                            </div>

                            <div className={styles.diet_info}>
                                <div className={styles.macros_item}>
                                    <img src={calories} alt="Icono calorías"/>
                                    <p>1500</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={grasas} alt="Icono carbs"/>
                                    <p>32g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={proteina} alt="Icono carbs"/>
                                    <p>10g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
                                    <p>4g</p>
                                </div>
                            </div>
                        </article>

                        <article className={styles.diet_card}>
                            <div className={styles.titulo}>
                                <h2>Nombre de la dieta</h2>
                                <img src={notFavicon} alt="Icono de !favoritos"/>
                            </div>

                            <div className={styles.diet_info}>
                                <div className={styles.macros_item}>
                                    <img src={calories} alt="Icono calorías"/>
                                    <p>1500</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={grasas} alt="Icono carbs"/>
                                    <p>32g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={proteina} alt="Icono carbs"/>
                                    <p>10g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
                                    <p>4g</p>
                                </div>
                            </div>
                        </article>

                        <article className={styles.diet_card}>
                            <div className={styles.titulo}>
                                <h2>Nombre de la dieta</h2>
                                <img src={notFavicon} alt="Icono de !favoritos"/>
                            </div>

                            <div className={styles.diet_info}>
                                <div className={styles.macros_item}>
                                    <img src={calories} alt="Icono calorías"/>
                                    <p>1500</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={grasas} alt="Icono carbs"/>
                                    <p>32g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={proteina} alt="Icono carbs"/>
                                    <p>10g</p>
                                </div>

                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
                                    <p>4g</p>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>  
            </div>
		</Dashboard>
	);
}

export default Dietas;
