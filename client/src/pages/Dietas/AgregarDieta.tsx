import PopUp from "../../components/Modals/PopUp/PopUp";
import styles from "./Add_styles/styles.module.css";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useState, useContext } from "react";
import { postDiet } from "../../routes/diets/diet.routes";
import { MessagesContext } from "../../layouts/Messages/Messages";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AgregarDieta = ({
    isOpen,
    setIsOpen
}: Props) => {
    const { addStaticMsg } = useContext(MessagesContext);

    const [ingredients, setIngredients] = useState<any>([]);
    let input_ingrediente:string = "";
    let input_cantidad: string = "";
    let input_unidad:string = "";

    const body = {
        name: "", 
        calories: "",
        macros: {"proteina": ['0', '0'], "grasas": ['0', '0'], "carbohidratos": ['0', '0']},
        micros: {"Fibra": ['0', '0'], "Ceniza":['0', '0'], "Calcio": ['0', '0'], "Fósforo": ['0', '0'], 
                "Hierro": ['0', '0'], "Tiamina": ['0', '0'], "Riboflavina": ['0', '0'], "Niacina": ['0', '0'], 
                "Vitamina C": ['0', '0'], "Vitamina A": ['0', '0'], "Ac grasos mono-in": ['0', '0'],
                "Ac grasos poli": ['0', '0'], "Ac grasos saturados": ['0', '0'], "Colesterol": ['0', '0'], 
                "Potasio": ['0', '0'], "Sodio": ['0', '0'], "Zinc": ['0', '0'], "Magnesio": ['0', '0'], 
                "Vitamina B6": ['0', '0'], "Vitamina B12": ['0', '0'], "Ácido fólico": ['0', '0'], "Folato Eq.": ['0', '0']},
    }

    
    function remove(index:number): any[] {
        let aux:any[] = [];
        
        ingredients.map((element:any, key:number) => {
            if(key !== index) aux.push(element);
        })
        
        return aux;
    }

    function add(ingrediente: string, cantidad: string, unidad: string){
        if (ingrediente === null || cantidad === null || unidad === null){
            alert("Campos faltantes en ingredientes");
        }
        else {
            return {
                ingrediente: ingrediente,
                cantidad: cantidad,
                unidad: unidad
            }
        }
    }

    
    const postDietController = (): void => {
        const doFetch = async (): Promise<void> => {

            const resData = await postDiet(ingredients, body);

            /*if (resData === null) {
                addStaticMsg("Error al añadir las dietas", "danger");
                return;
            }

            if (resData.msg !== "") {
                addStaticMsg(resData.msg, "danger");
                return;
            }

            const data = resData.data;

            */
        };
        void doFetch();
    }

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  return (
    <PopUp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <div className={styles.layout}>
            <form action="" method="POST">
                <div className={styles.titulo}>
                    <h2>Agregar dieta</h2>
                </div>
                
                <div className={styles.name}>
                    <div className={styles.calories}>
                        <label htmlFor="name">Nombre</label> <br/>
                        <input type="text" placeholder="Nombre de la dieta" id="name" name="name" required onChange={(e) => {body.name=e.target.value}}/>
                    </div>
                    <div className={styles.calories}>
                        <label htmlFor="calories_number">Calorías</label> <br/>
                        <input type="number" placeholder="Calorías" id="calories_number" name="calories_number" required onChange={(e) => {body.calories=e.target.value}}/>
                    </div>
                </div>

                <div className={styles.macros_card}>
                    <h3>Macros</h3>

                    <div className={styles.macros}>
                        <div className={styles.info}>
                            <h4>Meta</h4>

                            <label htmlFor="m_proteina">Proteínas (g)</label> <br/>
                            <input type="number" placeholder="Proteínas" id="m_proteina" name="m_proteina" required onChange={(e) => {body.macros.proteina[0]=e.target.value}}/> <br/>

                            <label htmlFor="m_carbohidratos">Carbohidratos (g)</label> <br/>
                            <input type="number" placeholder="Carbohidratos" id="m_carbohidratos" name="m_carbohidratos" required onChange={(e) => {body.macros.carbohidratos[0]=e.target.value}}/> <br/>

                            <label htmlFor="m_grasas">Grasas (g)</label> <br/>
                            <input type="number" placeholder="Grasas" id="m_grasas" name="m_grasas" required onChange={(e) => {body.macros.grasas[0]=e.target.value}}/>
                            
                        </div>
                        <div className={styles.info}>
                            <h4>Real</h4>

                            <label htmlFor="r_proteina">Proteínas (g)</label> <br/>
                            <input type="number" placeholder="Proteínas" id="r_proteina" name="r_proteina" required onChange={(e) => {body.macros.proteina[1]=e.target.value}}/> <br/>

                            <label htmlFor="r_carbohidratos">Carbohidratos (g)</label> <br/>
                            <input type="number" placeholder="Carbohidratos" id="r_carbohidratos" name="r_carbohidratos" required onChange={(e) => {body.macros.carbohidratos[1]=e.target.value}}/> <br/>

                            <label htmlFor="r_grasas">Grasas (g)</label> <br/>
                            <input type="number" placeholder="Grasas" id="r_grasas" name="r_grasas" required onChange={(e) => {body.macros.grasas[1]=e.target.value}}/>
                        </div>
                    </div>
                </div>
                <div className={styles.ingredientes}>
                    <h3>Ingredientes</h3>

                    <div className={styles.ingrediente}>
                        <div className={styles.ing_info}>

                            <div className={styles.aux}>
                                <label htmlFor="ingrediente">Ingrediente</label> <br/>
                                <input type="text" placeholder="Ingrediente" id="ingrediente" name="ingrediente" onChange={(e) => {input_ingrediente = e.target.value}}/>
                            </div>

                            <div className={styles.aux}>
                                <label htmlFor="cantidad">Cantidad</label> <br/>
                                <input type="number" placeholder="Cantidad" id="cantidad" name="cantidad" onChange={(e) => {input_cantidad = e.target.value}}/>
                            </div>
                            
                            <div className={styles.aux}>
                                <label htmlFor="unidad">Unidad</label> <br/>
                                <input type="text" placeholder="Unidad" id="unidad" name="unidad" onChange={(e) => {input_unidad = e.target.value}}/>
                            </div>
                            
                            <button type="button" onClick={ (e) => {setIngredients(ingredients.concat([add(input_ingrediente, input_cantidad, input_unidad)]))}}> + </button>
                        </div>

                        {ingredients.length > 0 && (
                        
                        ingredients.map((element:any, key:number) => {
                            return(
                                <div className={styles.ing_info} key={key}>
                                    
                                    <div className={styles.aux}>
                                        <input value={element.ingrediente} id={"ingrediente" + key.toString} className={"ingrediente" + key.toString} disabled/>
                                    </div>

                                    <div className={styles.aux}>
                                        <input value={element.cantidad} id={"cantidad" + key.toString} className={"cantidad" + key.toString} disabled/>
                                    </div>
                                    
                                    <div className={styles.aux}>
                                        <input disabled value={element.unidad} id={"unidad" + key.toString} className={"unidad" + key.toString}/>
                                    </div>
                                    
                                    <button type="button" id={styles.remove} onClick={(e) => {setIngredients(remove(key))}}> &times; </button>
                                </div>
                        )}))}

                    </div>


                </div>
                <div className={styles.micros_card}>
                    <h3>Micros</h3>

                    <div className={styles.micros}>
                        <div className={styles.micros_info}>
                            <h4>Real</h4>

                            <label htmlFor="real_fibra">Fibra (μg)</label> <br/>
                            <input type="number" placeholder="" id="real_" name="real_" required onChange={(e) => {body.micros["Fibra"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_ceniza">Ceniza (μg)</label> <br/>
                            <input type="number" placeholder="Ceniza" id="real_ceniza" name="real_ceniza" required onChange={(e) => {body.micros["Ceniza"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_calcio">Calcio (μg)</label> <br/>
                            <input type="number" placeholder="Calcio" id="real_calcio" name="real_calcio" required  onChange={(e) => {body.micros["Calcio"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_fósforo">Fósforo (μg)</label> <br/>
                            <input type="number" placeholder="Fósforo" id="real_fósforo" name="real_fósforo" required  onChange={(e) => {body.micros["Fósforo"][0]=e.target.value}}/> <br/>
                            
                            <label htmlFor="real_hierro">Hierro (μg)</label> <br/>
                            <input type="number" placeholder="Hierro" id="real_hierro" name="real_hierro" required  onChange={(e) => {body.micros["Hierro"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_tiamina">Tiamina (μg)</label> <br/>
                            <input type="number" placeholder="Tiamina" id="real_tiamina" name="real_tiamina" required  onChange={(e) => {body.micros["Tiamina"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_riboflavina">Riboflavina (μg)</label> <br/>
                            <input type="number" placeholder="Riboflavina" id="real_riboflavina" name="real_riboflavina" required  onChange={(e) => {body.micros["Riboflavina"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_niacina">Niacina (μg)</label> <br/>
                            <input type="number" placeholder="Niacina" id="real_niacina" name="real_niacina" required  onChange={(e) => {body.micros["Niacina"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_vitamina C">Vitamina C (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina C" id="real_vitamina C" name="real_vitamina C" required  onChange={(e) => {body.micros["Vitamina C"][0]=e.target.value}}/> <br/>
                            
                            <label htmlFor="real_vitamina A">Vitamina A (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina A" id="real_vitamina A" name="real_vitamina A" required onChange={(e) => {body.micros["Vitamina A"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_acGrasosMono">Ac grasos mono-in (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos mono-in" id="real_acGrasosMono" name="real_acGrasosMono" required onChange={(e) => {body.micros["Ac grasos mono-in"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_acGrasosPoli">Ac grasos poli (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos poli" id="real_acGrasosPoli" name="real_acGrasosPoli" required onChange={(e) => {body.micros["Ac grasos poli"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_acGrasosSaturados">Ac grasos saturados (μg)</label> <br/>
                            <input type="number" placeholder="Ac grasos saturados" id="real_acGrasosSaturados" name="real_acGrasosSaturados" required onChange={(e) => {body.micros["Ac grasos saturados"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_colesterol">Colesterol (μg)</label> <br/>
                            <input type="number" placeholder="Colesterol" id="real_colesterol" name="real_colesterol" required onChange={(e) => {body.micros["Colesterol"][0]=e.target.value}}/> <br/>
                            
                            <label htmlFor="real_potasio">Potasio (μg)</label> <br/>
                            <input type="number" placeholder="Potasio" id="real_potasio" name="real_potasio" required onChange={(e) => {body.micros["Potasio"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_sodio">Sodio (μg)</label> <br/>
                            <input type="number" placeholder="Sodio" id="real_sodio" name="real_sodio" required onChange={(e) => {body.micros["Sodio"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_zinc">Zinc (μg)</label> <br/>
                            <input type="number" placeholder="Zinc" id="real_zinc" name="real_zinc" required onChange={(e) => {body.micros["Zinc"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_magnesio">Magnesio (μg)</label> <br/>
                            <input type="number" placeholder="Magnesio" id="real_magnesio" name="real_magnesio" required onChange={(e) => {body.micros["Magnesio"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                            <input type="number" placeholder="Vitamina B6" id="real_vitaminaB6" name="real_vitaminaB6" required onChange={(e) => {body.micros["Vitamina B6"][0]=e.target.value}}/> <br/>
                            
                            <label htmlFor="real_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                            <input type="number" placeholder="VitaminaB12" id="real_vitaminaB12" name="real_vitaminaB12" required onChange={(e) => {body.micros["Vitamina B12"][0]=e.target.value}}/> <br/>

                            <label htmlFor="real_acFolico">Ácido fólico (μg)</label> <br/>
                            <input type="number" placeholder="Ácido fólico" id="real_acFolico" name="real_acFolico" required onChange={(e) => {body.micros["Ácido fólico"][0]=e.target.value}}/> <br/>
                            
                            <label htmlFor="real_folato">Folato Eq. (μg)</label> <br/>
                            <input type="number" placeholder="Folato eq" id="real_folato" name="real_folato" required onChange={(e) => {body.micros["Folato Eq."][0]=e.target.value}}/> <br/>
                        </div>
                        <div className={styles.micros_info}>
                            <h4>Recomendado</h4>

                            <label htmlFor="rec_fibra">Fibra (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Fibra"][1] = e.target.value}} type="number" placeholder="" id="rec_" name="rec_" required/> <br/>

                            <label htmlFor="rec_ceniza">Ceniza (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Ceniza"][1] = e.target.value}} type="number" placeholder="Ceniza" id="rec_ceniza" name="rec_ceniza" required/> <br/>

                            <label htmlFor="rec_calcio">Calcio (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Calcio"][1] = e.target.value}} type="number" placeholder="Calcio" id="rec_calcio" name="rec_calcio" required/> <br/>

                            <label htmlFor="rec_fósforo">Fósforo (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Fósforo"][1] = e.target.value}} type="number" placeholder="Fósforo" id="rec_fósforo" name="rec_fósforo" required/> <br/>
                            
                            <label htmlFor="rec_hierro">Hierro (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Hierro"][1] = e.target.value}} type="number" placeholder="Hierro" id="rec_hierro" name="rec_hierro" required/> <br/>

                            <label htmlFor="rec_tiamina">Tiamina (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Tiamina"][1] = e.target.value}} type="number" placeholder="Tiamina" id="rec_tiamina" name="rec_tiamina" required/> <br/>

                            <label htmlFor="rec_riboflavina">Riboflavina (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Riboflavina"][1] = e.target.value}} type="number" placeholder="Riboflavina" id="rec_riboflavina" name="rec_riboflavina" required/> <br/>

                            <label htmlFor="rec_niacina">Niacina (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Niacina"][1] = e.target.value}} type="number" placeholder="Niacina" id="rec_niacina" name="rec_niacina" required/> <br/>

                            <label htmlFor="rec_vitamina C">Vitamina C (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Vitamina C"][1] = e.target.value}} type="number" placeholder="Vitamina C" id="rec_vitamina C" name="rec_vitamina C" required/> <br/>
                            
                            <label htmlFor="rec_vitamina A">Vitamina A (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Vitamina A"][1] = e.target.value}} type="number" placeholder="Vitamina A" id="rec_vitamina A" name="rec_vitamina A" required/> <br/>

                            <label htmlFor="rec_acGrasosMono">Ac grasos mono-in (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Ac grasos mono-in"][1] = e.target.value}} type="number" placeholder="Ac grasos mono-in" id="rec_acGrasosMono" name="rec_acGrasosMono" required/> <br/>

                            <label htmlFor="rec_acGrasosPoli">Ac grasos poli (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Ac grasos poli"][1] = e.target.value}} type="number" placeholder="Ac grasos poli" id="rec_acGrasosPoli" name="rec_acGrasosPoli" required/> <br/>

                            <label htmlFor="rec_acGrasosSaturados">Ac grasos saturados (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Ac grasos saturados"][1] = e.target.value}} type="number" placeholder="Ac grasos saturados" id="rec_acGrasosSaturados" name="rec_acGrasosSaturados" required/> <br/>

                            <label htmlFor="rec_colesterol">Colesterol (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Colesterol"][1] = e.target.value}} type="number" placeholder="Colesterol" id="rec_colesterol" name="rec_colesterol" required/> <br/>
                            
                            <label htmlFor="rec_potasio">Potasio (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Potasio"][1] = e.target.value}} type="number" placeholder="Potasio" id="rec_potasio" name="rec_potasio" required/> <br/>

                            <label htmlFor="rec_sodio">Sodio (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Sodio"][1] = e.target.value}} type="number" placeholder="Sodio" id="rec_sodio" name="rec_sodio" required/> <br/>

                            <label htmlFor="rec_zinc">Zinc (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Zinc"][1] = e.target.value}} type="number" placeholder="Zinc" id="rec_zinc" name="rec_zinc" required/> <br/>

                            <label htmlFor="rec_magnesio">Magnesio (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Magnesio"][1] = e.target.value}} type="number" placeholder="Magnesio" id="rec_magnesio" name="rec_magnesio" required/> <br/>

                            <label htmlFor="rec_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Vitamina B6"][1] = e.target.value}} type="number" placeholder="Vitamina B6" id="rec_vitaminaB6" name="rec_vitaminaB6" required/> <br/>
                            
                            <label htmlFor="rec_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Vitamina B12"][1] = e.target.value}} type="number" placeholder="VitaminaB12" id="rec_vitaminaB12" name="rec_vitaminaB12" required/> <br/>

                            <label htmlFor="rec_acFolico">Ácido fólico (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Ácido fólico"][1] = e.target.value}} type="number" placeholder="Ácido fólico" id="rec_acFolico" name="rec_acFolico" required/> <br/>
                            
                            <label htmlFor="rec_folato">Folato Eq. (μg)</label> <br/>
                            <input onChange={(e) => {body.micros["Folato Eq."][1] = e.target.value}} type="number" placeholder="Folato eq" id="rec_folato" name="rec_folato" required/> <br/>
                            
                        </div>
                    </div>
                </div>

                <button id={styles.button_submit} type="submit" onClick={(e) => postDietController()}>Submit</button>
            </form>
        </div>
    </PopUp>
  )
}
