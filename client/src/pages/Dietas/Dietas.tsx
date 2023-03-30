import Dashboard from "../../layouts/Dashboard/Dashboard";
import {IDiet} from "../../interfaces/Diet.interface"
import { getAll } from "../../routes/diets/diet.routes";
import styles from "./Dietas.module.css";
import favicon from "./images/favicon.svg";
import calories from "./images/calories.svg";
import grasas from "./images/grasas.svg";
import carbohidrato from "./images/carbohidrato.svg"
import proteina from "./images/proteina.svg";
import notFavicon from "./images/notFavico.svg";

function Dietas() {
	return (
		<Dashboard>  
			<div className={styles.layout}> 
            <div className={styles.dietas}>
                <h1> Dietas favoritas </h1>

                <section>
                    <article className={styles.dieta_favorita}>
                        <div className={styles.titulo}>
                            <h2>Nombre de la dieta</h2>
                            <img src={favicon} alt="Icono favoritos"/>
                        </div>

                        <div className={styles.calorias}>
                            <img src={calories} alt="Icono calorías"/>
                            <p><span className={styles.subtitle}>Energía total:</span> 500 calorías</p>
                        </div>

                        <div className={styles.macros}>
                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
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
                                    <img src={proteina} alt="Icono proteina"/>
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
                                    <img src={grasas} alt="Icono grasas"/>
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
                            <img src={favicon} alt="Icono favoritos"/>
                        </div>

                        <div className={styles.calorias}>
                            <img src={calories} alt="Icono calorías"/>
                            <p><span className={styles.subtitle}>Energía total:</span> 500 calorías</p>
                        </div>

                        <div className={styles.macros}>
                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
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
                                    <img src={proteina} alt="Icono proteina"/>
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
                                    <img src={grasas} alt="Icono grasas"/>
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
                            <img src={favicon} alt="Icono favoritos"/>
                        </div>

                        <div className={styles.calorias}>
                            <img src={calories} alt="Icono calorías"/>
                            <p><span className={styles.subtitle}>Energía total:</span> 500 calorías</p>
                        </div>

                        <div className={styles.macros}>
                            <div className={styles.macros_info}>
                                <div className={styles.macros_item}>
                                    <img src={carbohidrato} alt="Icono carbs"/>
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
                                    <img src={proteina} alt="Icono proteina"/>
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
                                    <img src={grasas} alt="Icono grasas"/>
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
                    <button id= {styles.ver_todo}>Ver todo</button>
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
