import Dashboard from "../../layouts/Dashboard/Dashboard";
import {IDiet} from "../../interfaces/Diet.interface"
//import { getIndex } from "../../../../dietas/src/controllers/index.controller";

import styles from "./Dietas.module.css";

function Dietas() {
    const getIndexController = (): void => {
        const doFetch = async(): Promise<void> => {
            const data = await getIndex();

            if(data === null){
                return;
            }
        };
        void doFetch();
    }
    

	return (
		<Dashboard>  
			<div className={styles.layout}> 
            <div className={styles.dietas}>
                <h1> Dietas favoritas </h1>

                <section>
                    <article className={styles.dieta_favorita}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/favicon.svg" alt="Icono favoritos"/>
                        </div>

                        <div className={styles.calorias}>
                            <img src="media/calories.svg" alt="Icono calorías"/>
                            <p><span className={styles.subtitle}>Energía total:</span> 500 calorías</p>
                        </div>

                        <div className={styles.macros}>
                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                    <p>Carbs</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_carbs}>

                                    </div>
                                </div>
                            </div>

                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/proteina.svg" alt="Icono proteina"/>
                                    <p>Proteina</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_protein}>

                                    </div>
                                </div>
                            </div>

                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/grasas.svg" alt="Icono grasas"/>
                                    <p>Grasas</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_fats}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    
                    <article className={styles.dieta_favorita}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/favicon.svg" alt="Icono favoritos"/>
                        </div>

                        <div className={styles.calorias}>
                            <img src="media/calories.svg" alt="Icono calorías"/>
                            <p><span className={styles.subtitle}>Energía total:</span> 500 calorías</p>
                        </div>

                        <div className={styles.macros}>
                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                    <p>Carbs</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_carbs}>

                                    </div>
                                </div>
                            </div>

                            <div  className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/proteina.svg" alt="Icono proteina"/>
                                    <p>Proteina</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_protein}>

                                    </div>
                                </div>
                            </div>

                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/grasas.svg" alt="Icono grasas"/>
                                    <p>Grasas</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_fats}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className={styles.dieta_favorita}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/favicon.svg" alt="Icono favoritos"/>
                        </div>

                        <div className={styles.calorias}>
                            <img src="media/calories.svg" alt="Icono calorías"/>
                            <p><span className={styles.subtitle}>Energía total:</span> 500 calorías</p>
                        </div>

                        <div className={styles.macros}>
                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                    <p>Carbs</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_carbs}>

                                    </div>
                                </div>
                            </div>

                            <div  className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/proteina.svg" alt="Icono proteina"/>
                                    <p>Proteina</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_protein}>

                                    </div>
                                </div>
                            </div>

                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src="media/grasas.svg" alt="Icono grasas"/>
                                    <p>Grasas</p>
                                </div>
                                <h5>200 g</h5>
                                <div className={styles.bar}>
                                    <div className={styles.color_fats}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>

                <div className={styles.btn_container}>
                    <button id="ver_todo">Ver todo</button>
                </div>
            </div>

            <div className={styles.dietas}>
                <h1>Buscar dietas</h1>

                <div className={styles.search_bar}>
                    <div className={styles.aux}>
                        <label htmlFor="calorias">Filtrar por calorías</label>
                        <select name="calorias" id="calorias">
                            <option value="" disabled selected hidden>Calorias</option>
                            <option value="1400">1400</option>
                            <option value="1500">1500</option>
                            <option value="1600">1600</option>
                            <option value="1700">1700</option>
                        </select>
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
                            <img src="media/!favicon.svg" alt="Icono de !favoritos"/>
                        </div>

                        <div className={styles.diet_info}>
                            <div className={styles.macros_item}>
                                <img src="media/calories.svg" alt="Icono calorías"/>
                                <p>1500</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/grasas.svg" alt="Icono carbs"/>
                                <p>32g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/proteina.svg" alt="Icono carbs"/>
                                <p>10g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                <p>4g</p>
                            </div>
                        </div>
                    </article>

                    <article className={styles.diet_card}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/!favicon.svg" alt="Icono de !favoritos"/>
                        </div>

                        <div className={styles.diet_info}>
                            <div className={styles.macros_item}>
                                <img src="media/calories.svg" alt="Icono calorías"/>
                                <p>1500</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/grasas.svg" alt="Icono carbs"/>
                                <p>32g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/proteina.svg" alt="Icono carbs"/>
                                <p>10g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                <p>4g</p>
                            </div>
                        </div>
                    </article>

                    <article className={styles.diet_card}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/!favicon.svg" alt="Icono de !favoritos"/>
                        </div>

                        <div className={styles.diet_info}>
                            <div className={styles.macros_item}>
                                <img src="media/calories.svg" alt="Icono calorías"/>
                                <p>1500</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/grasas.svg" alt="Icono carbs"/>
                                <p>32g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/proteina.svg" alt="Icono carbs"/>
                                <p>10g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                <p>4g</p>
                            </div>
                        </div>
                    </article>

                    <article className={styles.diet_card}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/!favicon.svg" alt="Icono de !favoritos"/>
                        </div>

                        <div className={styles.diet_info}>
                            <div className={styles.macros_item}>
                                <img src="media/calories.svg" alt="Icono calorías"/>
                                <p>1500</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/grasas.svg" alt="Icono carbs"/>
                                <p>32g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/proteina.svg" alt="Icono carbs"/>
                                <p>10g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                <p>4g</p>
                            </div>
                        </div>
                    </article>

                    <article className={styles.diet_card}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/!favicon.svg" alt="Icono de !favoritos"/>
                        </div>

                        <div className={styles.diet_info}>
                            <div className={styles.macros_item}>
                                <img src="media/calories.svg" alt="Icono calorías"/>
                                <p>1500</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/grasas.svg" alt="Icono carbs"/>
                                <p>32g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/proteina.svg" alt="Icono carbs"/>
                                <p>10g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/carbohidrato.svg" alt="Icono carbs"/>
                                <p>4g</p>
                            </div>
                        </div>
                    </article>

                    <article className={styles.diet_card}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src="media/!favicon.svg" alt="Icono de !favoritos"/>
                        </div>

                        <div className={styles.diet_info}>
                            <div className={styles.macros_item}>
                                <img src="media/calories.svg" alt="Icono calorías"/>
                                <p>1500</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/grasas.svg" alt="Icono carbs"/>
                                <p>32g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/proteina.svg" alt="Icono carbs"/>
                                <p>10g</p>
                            </div>

                            <div className={styles.macros_item}>
                                <img src="media/carbohidrato.svg" alt="Icono carbs"/>
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
