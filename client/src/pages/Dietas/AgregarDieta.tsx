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

    const [ingredients, setIngredients] = useState<any[]>([]);
    const [name, setName] = useState<any>("");
    const [calories, setCalories] = useState<any>("");
    const [macros, setMacros] = useState<any>({"proteina": ['0', '0'], "grasas": ['0', '0'], "carbohidratos": ['0', '0']});
    const [micros, setMicros] = useState<any>({"Fibra": ['0', '0'], "Ceniza":['0', '0'], "Calcio": ['0', '0'], "Fósforo": ['0', '0'], 
                                                "Hierro": ['0', '0'], "Tiamina": ['0', '0'], "Riboflavina": ['0', '0'], "Niacina": ['0', '0'], 
                                                "Vitamina C": ['0', '0'], "Vitamina A": ['0', '0'], "Ac grasos mono-in": ['0', '0'],
                                                "Ac grasos poli": ['0', '0'], "Ac grasos saturados": ['0', '0'], "Colesterol": ['0', '0'], 
                                                "Potasio": ['0', '0'], "Sodio": ['0', '0'], "Zinc": ['0', '0'], "Magnesio": ['0', '0'], 
                                                "Vitamina B6": ['0', '0'], "Vitamina B12": ['0', '0'], "Ácido fólico": ['0', '0'], "Folato Eq.": ['0', '0']});
    
    const [inputIng, setInputIng] = useState<string>("");
    const [inputCant, setInputCant] = useState<string>("");
    const [inputUnit, setInputUnit] = useState<string>("");

    function setNutrients (name:string, pos:number, value:any, type:number) {
        if(type === 1){
            let macrosAux:any = macros;
            macrosAux[name][pos] = value;
            setMacros(macrosAux);
        }
        else if (type === 0){
            let microsAux:any = micros;
             microsAux[name][pos] = value;
             setMicros(microsAux);
        }
    }

    function remove(index:number): any[] {
        let aux:any[] = [];
        
        ingredients.map((element:any, key:number) => {
            if(key !== index) aux.push(element);
        })
        
        return aux;
    }

    function add(ingrediente: string, cantidad: string, unidad: string){
        if (ingrediente === "" || cantidad === "" || unidad === ""){
            addStaticMsg("Campos faltantes en ingredientes", "danger");
        } else if(Number.parseFloat(cantidad) <= 0) {
            addStaticMsg("La cantidad debe ser mayor a 0", "danger");
        }
        else {
            setIngredients(ingredients.concat([{
                ingrediente: ingrediente,
                cantidad: (Number.parseFloat(cantidad).toFixed(3)).toString(),
                unidad: unidad
            }]));
            setInputIng("");
            setInputCant("");
            setInputUnit("");
        }
    }
    
    const postDietController = (e:any): void => {
        e.preventDefault();
        const doFetch = async (): Promise<void> => {
            const resData = await postDiet(name, calories, ingredients, macros, micros);

           window.location.reload();
           //addStaticMsg("Dieta añadida con éxito", "success");
        };
        void doFetch();
    }

  return (
    <PopUp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <div className={styles.layout}>
            <form onSubmit={(e) => postDietController(e)}>
                <div className={styles.titulo}>
                    <h2>Agregar dieta</h2>
                </div>
                
                <div className={styles.name}>
                    <div className={styles.calories}>
                        <label htmlFor="name">Nombre</label> <br/>
                        <input type="text" placeholder="Nombre de la dieta" id="name" name="name" required onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className={styles.calories}>
                        <label htmlFor="calories_number">Calorías</label> <br/>
                        <input type="number" min="0" step="0.001" placeholder="Calorías" id="calories_number" name="calories_number" required onChange={(e) => {setCalories(e.target.value.toString())}}/>
                    </div>
                </div>

                <div className={styles.macros_card}>
                    <h3>Macros</h3>

                    <div className={styles.macros}>
                        <div className={styles.info}>
                            <h4>Meta</h4>

                            <label htmlFor="m_proteina">Proteínas (g)</label> <br/>
                            <input type="number" min="0" step="0.001" placeholder="Proteínas" id="m_proteina" name="m_proteina" required onChange={(e) => {setNutrients("proteina", 0, e.target.value.toString(), 1)}}/> <br/>

                            <label htmlFor="m_carbohidratos">Carbohidratos (g)</label> <br/>
                            <input type="number" min="0" step="0.001" placeholder="Carbohidratos" id="m_carbohidratos" name="m_carbohidratos" required onChange={(e) => {setNutrients("carbohidratos", 0, e.target.value.toString(), 1)}}/> <br/>

                            <label htmlFor="m_grasas">Grasas (g)</label> <br/>
                            <input type="number" min="0" step="0.001" placeholder="Grasas" id="m_grasas" name="m_grasas" required onChange={(e) => {setNutrients("grasas", 0, e.target.value.toString(), 1)}}/>
                            
                        </div>
                        <div className={styles.info}>
                            <h4>Real</h4>

                            <label htmlFor="r_proteina">Proteínas (g)</label> <br/>
                            <input type="number" min="0" step="0.001" placeholder="Proteínas" id="r_proteina" name="r_proteina" required onChange={(e) => {setNutrients("proteina", 1, e.target.value.toString(), 1)}}/> <br/>

                            <label htmlFor="r_carbohidratos">Carbohidratos (g)</label> <br/>
                            <input type="number" min="0" step="0.001" placeholder="Carbohidratos" id="r_carbohidratos" name="r_carbohidratos" required onChange={(e) => {setNutrients("carbohidratos", 1, e.target.value.toString(), 1)}}/> <br/>

                            <label htmlFor="r_grasas">Grasas (g)</label> <br/>
                            <input type="number" min="0" step="0.001" placeholder="Grasas" id="r_grasas" name="r_grasas" required onChange={(e) => {setNutrients("grasas", 1, e.target.value.toString(), 1)}}/>
                        </div>
                    </div>
                </div>
                <div className={styles.ingredientes}>
                    <h3>Ingredientes</h3>

                    <div className={styles.ingrediente}>
                        <div className={styles.ing_info}>
                            {ingredients.length === 0 && (
                                <>
                                    <div className={styles.aux}>
                                        <label htmlFor="ingrediente">Ingrediente</label> <br/>
                                        <input type="text" placeholder="Ingrediente" id="ingrediente" name="ingrediente" onChange={(e) => {setInputIng(e.target.value)}} value={inputIng} required/>
                                    </div>

                                    <div className={styles.aux}>
                                        <label htmlFor="cantidad">Cantidad</label> <br/>
                                        <input type="number" min="0" step="0.001"  placeholder="Cantidad" id="cantidad" name="cantidad" onChange={(e) => {setInputCant(e.target.value)}} value={inputCant} required/>
                                    </div>
                                    
                                    <div className={styles.aux}>
                                        <label htmlFor="unidad">Unidad</label> <br/>
                                        <input type="text" placeholder="Unidad" id="unidad" name="unidad" onChange={(e) => {setInputUnit(e.target.value)}} value={inputUnit} required/>
                                    </div>
                                </>
                            )}
                            {ingredients.length > 0 && (
                                <>
                                    <div className={styles.aux}>
                                        <label htmlFor="ingrediente">Ingrediente</label> <br/>
                                        <input type="text" placeholder="Ingrediente" id="ingrediente" name="ingrediente" onChange={(e) => {setInputIng(e.target.value)}} value={inputIng}/>
                                    </div>

                                    <div className={styles.aux}>
                                        <label htmlFor="cantidad">Cantidad</label> <br/>
                                        <input type="number" min="0" step="0.001"  placeholder="Cantidad" id="cantidad" name="cantidad" onChange={(e) => {setInputCant(e.target.value)}} value={inputCant}/>
                                    </div>
                                    
                                    <div className={styles.aux}>
                                        <label htmlFor="unidad">Unidad</label> <br/>
                                        <input type="text" placeholder="Unidad" id="unidad" name="unidad" onChange={(e) => {setInputUnit(e.target.value)}} value={inputUnit}/>
                                    </div>
                                </>
                            )}
                            <button type="button" onClick={ (e) => {add(inputIng, inputCant, inputUnit)}}> + </button>
                        </div>

                        {ingredients.length > 0 && (
                        
                        ingredients.map((element:any, key:number) => {
                            return(
                                <div className={styles.ing_info} key={key}>
                                    
                                    <div className={styles.aux}>
                                        <input value={element.ingrediente} id={"ingrediente" + key.toString()} className={"ingrediente" + key.toString()} disabled/>
                                    </div>

                                    <div className={styles.aux}>
                                        <input value={element.cantidad} id={"cantidad" + key.toString()} className={"cantidad" + key.toString()} disabled/>
                                    </div>
                                    
                                    <div className={styles.aux}>
                                        <input disabled value={element.unidad} id={"unidad" + key.toString()} className={"unidad" + key.toString()}/>
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
                            <input type="number" min="0" step="0.001"  placeholder="" id="real_" name="real_" onChange={(e) => {setNutrients("Fibra", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_ceniza">Ceniza (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Ceniza" id="real_ceniza" name="real_ceniza" onChange={(e) => {setNutrients("Ceniza", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_calcio">Calcio (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Calcio" id="real_calcio" name="real_calcio"  onChange={(e) => {setNutrients("Calcio", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_fósforo">Fósforo (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Fósforo" id="real_fósforo" name="real_fósforo"  onChange={(e) => {setNutrients("Fósforo", 0, e.target.value.toString(), 0)}}/> <br/>
                            
                            <label htmlFor="real_hierro">Hierro (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Hierro" id="real_hierro" name="real_hierro"  onChange={(e) => {setNutrients("Hierro", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_tiamina">Tiamina (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Tiamina" id="real_tiamina" name="real_tiamina"  onChange={(e) => {setNutrients("Tiamina", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_riboflavina">Riboflavina (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Riboflavina" id="real_riboflavina" name="real_riboflavina"  onChange={(e) => {setNutrients("Riboflavina", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_niacina">Niacina (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Niacina" id="real_niacina" name="real_niacina"  onChange={(e) => {setNutrients("Niacina", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_vitamina C">Vitamina C (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Vitamina C" id="real_vitamina C" name="real_vitamina C"  onChange={(e) => {setNutrients("Vitamina C", 0, e.target.value.toString(), 0)}}/> <br/>
                            
                            <label htmlFor="real_vitamina A">Vitamina A (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Vitamina A" id="real_vitamina A" name="real_vitamina A" onChange={(e) => {setNutrients("Vitamina A", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_acGrasosMono">Ac grasos mono-in (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Ac grasos mono-in" id="real_acGrasosMono" name="real_acGrasosMono" onChange={(e) => {setNutrients("Ac grasos mono-in", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_acGrasosPoli">Ac grasos poli (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Ac grasos poli" id="real_acGrasosPoli" name="real_acGrasosPoli" onChange={(e) => {setNutrients("Ac grasos poli", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_acGrasosSaturados">Ac grasos saturados (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Ac grasos saturados" id="real_acGrasosSaturados" name="real_acGrasosSaturados" onChange={(e) => {setNutrients("Ac grasos saturados", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_colesterol">Colesterol (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Colesterol" id="real_colesterol" name="real_colesterol" onChange={(e) => {setNutrients("Colesterol", 0, e.target.value.toString(), 0)}}/> <br/>
                            
                            <label htmlFor="real_potasio">Potasio (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Potasio" id="real_potasio" name="real_potasio" onChange={(e) => {setNutrients("Potasio", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_sodio">Sodio (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Sodio" id="real_sodio" name="real_sodio" onChange={(e) => {setNutrients("Sodio", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_zinc">Zinc (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Zinc" id="real_zinc" name="real_zinc" onChange={(e) => {setNutrients("Zinc", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_magnesio">Magnesio (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Magnesio" id="real_magnesio" name="real_magnesio" onChange={(e) => {setNutrients("Magnesio", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Vitamina B6" id="real_vitaminaB6" name="real_vitaminaB6" onChange={(e) => {setNutrients("Vitamina B6", 0, e.target.value.toString(), 0)}}/> <br/>
                            
                            <label htmlFor="real_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="VitaminaB12" id="real_vitaminaB12" name="real_vitaminaB12" onChange={(e) => {setNutrients("Vitamina B12", 0, e.target.value.toString(), 0)}}/> <br/>

                            <label htmlFor="real_acFolico">Ácido fólico (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Ácido fólico" id="real_acFolico" name="real_acFolico" onChange={(e) => {setNutrients("Ácido fólico", 0, e.target.value.toString(), 0)}}/> <br/>
                            
                            <label htmlFor="real_folato">Folato Eq. (μg)</label> <br/>
                            <input type="number" min="0" step="0.001"  placeholder="Folato eq" id="real_folato" name="real_folato" onChange={(e) => {setNutrients("Folato Eq.", 0, e.target.value.toString(), 0)}}/> <br/>
                        </div>

                        <div className={styles.micros_info}>
                            <h4>Recomendado</h4>

                            <label htmlFor="rec_fibra">Fibra (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Fibra", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="" id="rec_" name="rec_"/> <br/>

                            <label htmlFor="rec_ceniza">Ceniza (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Ceniza", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Ceniza" id="rec_ceniza" name="rec_ceniza"/> <br/>

                            <label htmlFor="rec_calcio">Calcio (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Calcio", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Calcio" id="rec_calcio" name="rec_calcio"/> <br/>

                            <label htmlFor="rec_fósforo">Fósforo (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Fósforo", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Fósforo" id="rec_fósforo" name="rec_fósforo"/> <br/>
                            
                            <label htmlFor="rec_hierro">Hierro (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Hierro", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Hierro" id="rec_hierro" name="rec_hierro"/> <br/>

                            <label htmlFor="rec_tiamina">Tiamina (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Tiamina", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Tiamina" id="rec_tiamina" name="rec_tiamina"/> <br/>

                            <label htmlFor="rec_riboflavina">Riboflavina (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Riboflavina", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Riboflavina" id="rec_riboflavina" name="rec_riboflavina"/> <br/>

                            <label htmlFor="rec_niacina">Niacina (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Niacina", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Niacina" id="rec_niacina" name="rec_niacina"/> <br/>

                            <label htmlFor="rec_vitamina C">Vitamina C (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Vitamina C", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Vitamina C" id="rec_vitamina C" name="rec_vitamina C"/> <br/>
                            
                            <label htmlFor="rec_vitamina A">Vitamina A (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Vitamina A", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Vitamina A" id="rec_vitamina A" name="rec_vitamina A"/> <br/>

                            <label htmlFor="rec_acGrasosMono">Ac grasos mono-in (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Ac grasos mono-in", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Ac grasos mono-in" id="rec_acGrasosMono" name="rec_acGrasosMono"/> <br/>

                            <label htmlFor="rec_acGrasosPoli">Ac grasos poli (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Ac grasos poli", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Ac grasos poli" id="rec_acGrasosPoli" name="rec_acGrasosPoli"/> <br/>

                            <label htmlFor="rec_acGrasosSaturados">Ac grasos saturados (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Ac grasos saturados", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Ac grasos saturados" id="rec_acGrasosSaturados" name="rec_acGrasosSaturados"/> <br/>

                            <label htmlFor="rec_colesterol">Colesterol (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Colesterol", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Colesterol" id="rec_colesterol" name="rec_colesterol"/> <br/>
                            
                            <label htmlFor="rec_potasio">Potasio (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Potasio", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Potasio" id="rec_potasio" name="rec_potasio"/> <br/>

                            <label htmlFor="rec_sodio">Sodio (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Sodio", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Sodio" id="rec_sodio" name="rec_sodio"/> <br/>

                            <label htmlFor="rec_zinc">Zinc (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Zinc", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Zinc" id="rec_zinc" name="rec_zinc"/> <br/>

                            <label htmlFor="rec_magnesio">Magnesio (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Magnesio", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Magnesio" id="rec_magnesio" name="rec_magnesio"/> <br/>

                            <label htmlFor="rec_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Vitamina B6", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Vitamina B6" id="rec_vitaminaB6" name="rec_vitaminaB6"/> <br/>
                            
                            <label htmlFor="rec_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Vitamina B12", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="VitaminaB12" id="rec_vitaminaB12" name="rec_vitaminaB12"/> <br/>

                            <label htmlFor="rec_acFolico">Ácido fólico (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Ácido fólico", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Ácido fólico" id="rec_acFolico" name="rec_acFolico"/> <br/>
                            
                            <label htmlFor="rec_folato">Folato Eq. (μg)</label> <br/>
                            <input onChange={(e) => {setNutrients("Folato Eq.", 1, e.target.value.toString(), 0)}} type="number" min="0" step="0.001"  placeholder="Folato eq" id="rec_folato" name="rec_folato"/> <br/>
                            
                        </div>
                    </div>
                </div>

                <button type="submit" id={styles.button_submit}>Submit</button>
            </form>
        </div>
    </PopUp>
  )
}
