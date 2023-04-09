import PopUp from "../../components/Modals/PopUp/PopUp";
import styles from "./Add_styles/styles.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AgregarDieta = ({
    isOpen,
    setIsOpen
}: Props) => {

  return (
    <PopUp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <div className={styles.layout}>
            <form action="/dietas" method="POST">
                <div className={styles.titulo}>
                    <h2>Agregar dieta</h2>
                </div>
                
                <div className={styles.name}>
                    <div className={styles.calories}>
                        <label htmlFor="name">Nombre</label> <br/>
                        <input type="text" placeholder="Nombr/e de la dieta" id="name" name="name" required/>
                    </div>
                    <div className={styles.calories}>
                        <label htmlFor="calories_number">Calorías</label> <br/>
                        <input type="number" placeholder="Calorías" id="calories_number" name="calories_number" required/>
                    </div>
                </div>

                <div className={styles.macros_card}>
                    <h3>Macros</h3>

                    <div className={styles.macros}>
                        <div className={styles.info}>
                            <h4>Meta</h4>

                            <label htmlFor="m_proteina">Proteínas (g)</label> <br/>
                            <input type="number" placeholder="Proteínas" id="m_proteina" name="m_proteina" required/> <br/>

                            <label htmlFor="m_carbohidratos">Carbohidratos (g)</label> <br/>
                            <input type="number" placeholder="Carbohidratos" id="m_carbohidratos" name="m_carbohidratos" required/> <br/>

                            <label htmlFor="m_grasas">Grasas (g)</label> <br/>
                            <input type="number" placeholder="Grasas" id="m_grasas" name="m_grasas" required/>
                            
                        </div>
                        <div className={styles.info}>
                            <h4>Real</h4>

                            <label htmlFor="r_proteina">Proteínas (g)</label> <br/>
                            <input type="number" placeholder="Proteínas" id="r_proteina" name="r_proteina" required/> <br/>

                            <label htmlFor="r_carbohidratos">Carbohidratos (g)</label> <br/>
                            <input type="number" placeholder="Carbohidratos" id="r_carbohidratos" name="r_carbohidratos" required/> <br/>

                            <label htmlFor="r_grasas">Grasas (g)</label> <br/>
                            <input type="number" placeholder="Grasas" id="r_grasas" name="r_grasas" required/>
                        </div>
                    </div>
                </div>
                <div className={styles.ingredientes}>
                    <h3>Ingredientes</h3>

                    <div className={styles.ingrediente}>
                        <div className={styles.ing_info}>

                            <div className={styles.aux}>
                                <label htmlFor="ingrediente">Ingrediente</label> <br/>
                                <input type="text" placeholder="Ingrediente" id="ingrediente" name="ingrediente" required/>
                            </div>

                            <div className={styles.aux}>
                                <label htmlFor="cantidad">Cantidad</label> <br/>
                                <input type="number" placeholder="Cantidad" id="cantidad" name="cantidad" required/>
                            </div>
                            
                            <div className={styles.aux}>
                                <label htmlFor="unidad">Unidad</label> <br/>
                                <input type="text" placeholder="Unidad" id="unidad" name="unidad" required/>
                            </div>
                            
                            <button> + </button>
                        </div>

                        <div className={styles.ing_info}>

                            <div className={styles.aux}>
                                <label htmlFor="ingrediente">Ingrediente</label> <br/>
                                <input type="text" placeholder="Ingrediente" id="ingrediente" name="ingrediente" required/>
                            </div>

                            <div className={styles.aux}>
                                <label htmlFor="cantidad">Cantidad</label> <br/>
                                <input type="number" placeholder="Cantidad" id="cantidad" name="cantidad" required/>
                            </div>
                            
                            <div className={styles.aux}>
                                <label htmlFor="unidad">Unidad</label> <br/>
                                <input type="text" placeholder="Unidad" id="unidad" name="unidad" required/>
                            </div>
                            
                            <button> + </button>
                        </div>

                        <div className={styles.ing_info}>

                            <div className={styles.aux}>
                                <label htmlFor="ingrediente">Ingrediente</label> <br/>
                                <input type="text" placeholder="Ingrediente" id="ingrediente" name="ingrediente" required/>
                            </div>

                            <div className={styles.aux}>
                                <label htmlFor="cantidad">Cantidad</label> <br/>
                                <input type="number" placeholder="Cantidad" id="cantidad" name="cantidad" required/>
                            </div>
                            
                            <div className={styles.aux}>
                                <label htmlFor="unidad">Unidad</label> <br/>
                                <input type="text" placeholder="Unidad" id="unidad" name="unidad" required/>
                            </div>
                            
                            <button> + </button>
                        </div>
                    </div>


                </div>
                <div className={styles.micros_card}>
                    <h3>Micros</h3>

                    <div className={styles.smicros}>
                        <div className={styles.micros_info}>
                            <h4>Real</h4>

                            <label htmlFor="real_fibr/a">Fibr/a (μg)</label> <br/>
                            <input type="number" placeholder="" id="real_" name="real_" required/> <br/>

                            <label htmlFor="real_ceniza">Ceniza (μg)</label> <br/>
                            <input type="number" placeholder="Ceniza" id="real_ceniza" name="real_ceniza" required/> <br/>

                            <label htmlFor="real_calcio">Calcio (μg)</label> <br/>
                            <input type="number" placeholder="Calcio" id="real_calcio" name="real_calcio" required/> <br/>

                            <label htmlFor="real_fósforo">Fósforo (μg)</label> <br/>
                            <input type="number" placeholder="Fósforo" id="real_fósforo" name="real_fósforo" required/> <br/>
                            
                            <label htmlFor="real_hierro">Hierro (μg)</label> <br/>
                            <input type="number" placeholder="Hierro" id="real_hierro" name="real_hierro" required/> <br/>

                            <label htmlFor="real_tiamina">Tiamina (μg)</label> <br/>
                            <input type="number" placeholder="Tiamina" id="real_tiamina" name="real_tiamina" required/> <br/>

                            <label htmlFor="real_riboflavina">Riboflavina (μg)</label> <br/>
                            <input type="number" placeholder="Riboflavina" id="real_riboflavina" name="real_riboflavina" required/> <br/>

                            <label htmlFor="real_niacina">Niacina (μg)</label> <br/>
                            <input type="number" placeholder="Niacina" id="real_niacina" name="real_niacina" required/> <br/>

                            <label htmlFor="real_vitamina C">Vitamina C (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina C" id="real_vitamina C" name="real_vitamina C" required/> <br/>
                            
                            <label htmlFor="real_vitamina A">Vitamina A (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina A" id="real_vitamina A" name="real_vitamina A" required/> <br/>

                            <label htmlFor="real_acGrasosMono">Ac grasos mono-in (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos mono-in" id="real_acGrasosMono" name="real_acGrasosMono" required/> <br/>

                            <label htmlFor="real_acGrasosPoli">Ac grasos poli (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos poli" id="real_acGrasosPoli" name="real_acGrasosPoli" required/> <br/>

                            <label htmlFor="real_acGrasosSaturados">Ac grasos saturados (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos saturados" id="real_acGrasosSaturados" name="real_acGrasosSaturados" required/> <br/>

                            <label htmlFor="real_colesterol">Colesterol (μg)</label> <br/>
                            <input type="number" placeholder="Colesterol" id="real_colesterol" name="real_colesterol" required/> <br/>
                            
                            <label htmlFor="real_potasio">Potasio (μg)</label> <br/>
                            <input type="number" placeholder="Potasio" id="real_potasio" name="real_potasio" required/> <br/>

                            <label htmlFor="real_sodio">Sodio (μg)</label> <br/>
                            <input type="number" placeholder="Sodio" id="real_sodio" name="real_sodio" required/> <br/>

                            <label htmlFor="real_zinc">Zinc (μg)</label> <br/>
                            <input type="number" placeholder="Zinc" id="real_zinc" name="real_zinc" required/> <br/>

                            <label htmlFor="real_magnesio">Magnesio (μg)</label> <br/>
                            <input type="number" placeholder="Magnesio" id="real_magnesio" name="real_magnesio" required/> <br/>

                            <label htmlFor="real_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina B6" id="real_vitaminaB6" name="real_vitaminaB6" required/> <br/>
                            
                            <label htmlFor="real_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                            <input type="number" placeholder="VitaminaB12" id="real_vitaminaB12" name="real_vitaminaB12" required/> <br/>

                            <label htmlFor="real_acFolico">Ácido fólico (μg)</label> <br/>
                            <input type="number" placeholder="Ácido fólico" id="real_acFolico" name="real_acFolico" required/> <br/>
                            
                            <label htmlFor="real_folato">Folato eq. (μg)</label> <br/>
                            <input type="number" placeholder="Folato eq" id="real_folato" name="real_folato" required/> <br/>
                        </div>
                        <div className={styles.micros_info}>
                            <h4>Recomendado</h4>

                            <label htmlFor="rec_fibr/a">Fibr/a (μg)</label> <br/>
                            <input type="number" placeholder="" id="rec_" name="rec_" required/> <br/>

                            <label htmlFor="rec_ceniza">Ceniza (μg)</label> <br/>
                            <input type="number" placeholder="Ceniza" id="rec_ceniza" name="rec_ceniza" required/> <br/>

                            <label htmlFor="rec_calcio">Calcio (μg)</label> <br/>
                            <input type="number" placeholder="Calcio" id="rec_calcio" name="rec_calcio" required/> <br/>

                            <label htmlFor="rec_fósforo">Fósforo (μg)</label> <br/>
                            <input type="number" placeholder="Fósforo" id="rec_fósforo" name="rec_fósforo" required/> <br/>
                            
                            <label htmlFor="rec_hierro">Hierro (μg)</label> <br/>
                            <input type="number" placeholder="Hierro" id="rec_hierro" name="rec_hierro" required/> <br/>

                            <label htmlFor="rec_tiamina">Tiamina (μg)</label> <br/>
                            <input type="number" placeholder="Tiamina" id="rec_tiamina" name="rec_tiamina" required/> <br/>

                            <label htmlFor="rec_riboflavina">Riboflavina (μg)</label> <br/>
                            <input type="number" placeholder="Riboflavina" id="rec_riboflavina" name="rec_riboflavina" required/> <br/>

                            <label htmlFor="rec_niacina">Niacina (μg)</label> <br/>
                            <input type="number" placeholder="Niacina" id="rec_niacina" name="rec_niacina" required/> <br/>

                            <label htmlFor="rec_vitamina C">Vitamina C (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina C" id="rec_vitamina C" name="rec_vitamina C" required/> <br/>
                            
                            <label htmlFor="rec_vitamina A">Vitamina A (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina A" id="rec_vitamina A" name="rec_vitamina A" required/> <br/>

                            <label htmlFor="rec_acGrasosMono">Ac grasos mono-in (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos mono-in" id="rec_acGrasosMono" name="rec_acGrasosMono" required/> <br/>

                            <label htmlFor="rec_acGrasosPoli">Ac grasos poli (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos poli" id="rec_acGrasosPoli" name="rec_acGrasosPoli" required/> <br/>

                            <label htmlFor="rec_acGrasosSaturados">Ac grasos saturados (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos saturados" id="rec_acGrasosSaturados" name="rec_acGrasosSaturados" required/> <br/>

                            <label htmlFor="rec_colesterol">Colesterol (μg)</label> <br/>
                            <input type="number" placeholder="Colesterol" id="rec_colesterol" name="rec_colesterol" required/> <br/>
                            
                            <label htmlFor="rec_potasio">Potasio (μg)</label> <br/>
                            <input type="number" placeholder="Potasio" id="rec_potasio" name="rec_potasio" required/> <br/>

                            <label htmlFor="rec_sodio">Sodio (μg)</label> <br/>
                            <input type="number" placeholder="Sodio" id="rec_sodio" name="rec_sodio" required/> <br/>

                            <label htmlFor="rec_zinc">Zinc (μg)</label> <br/>
                            <input type="number" placeholder="Zinc" id="rec_zinc" name="rec_zinc" required/> <br/>

                            <label htmlFor="rec_magnesio">Magnesio (μg)</label> <br/>
                            <input type="number" placeholder="Magnesio" id="rec_magnesio" name="rec_magnesio" required/> <br/>

                            <label htmlFor="rec_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina B6" id="rec_vitaminaB6" name="rec_vitaminaB6" required/> <br/>
                            
                            <label htmlFor="rec_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                            <input type="number" placeholder="VitaminaB12" id="rec_vitaminaB12" name="rec_vitaminaB12" required/> <br/>

                            <label htmlFor="rec_acFolico">Ácido fólico (μg)</label> <br/>
                            <input type="number" placeholder="Ácido fólico" id="rec_acFolico" name="rec_acFolico" required/> <br/>
                            
                            <label htmlFor="rec_folato">Folato eq. (μg)</label> <br/>
                            <input type="number" placeholder="Folato eq" id="rec_folato" name="rec_folato" required/> <br/>
                            
                        </div>
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    </PopUp>
  )
}
