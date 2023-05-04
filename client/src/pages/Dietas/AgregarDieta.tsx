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
    const [macros, setMacros] = useState<any>({"proteina": '0', "grasas": '0', "carbohidratos": '0'});
    const [micros, setMicros] = useState<any>({"Fibra": '0', "Ceniza":'0', "Calcio": '0', "Fósforo": '0', 
                                                "Hierro": '0', "Tiamina": '0', "Riboflavina": '0', "Niacina": '0', 
                                                "Vitamina C": '0', "Vitamina A": '0', "Colesterol": '0', 
                                                "Potasio": '0', "Sodio": '0', "Zinc": '0', "Magnesio": '0', 
                                                "Vitamina B6": '0', "Vitamina B12": '0', "Ácido fólico": '0', "Folato Eq.": '0'});
    
    const [inputIng, setInputIng] = useState<string>("");
    const [inputCant, setInputCant] = useState<string>("");
    const [inputUnit, setInputUnit] = useState<string>("");

    function setNutrients (name:string, value:any, type:number) {
        if(type === 1){
            let macrosAux:any = macros;
            macrosAux[name] = value;
            setMacros(macrosAux);
        } else if (type === 0){
            let microsAux:any = micros;
            microsAux[name] = value;
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
        if (ingrediente.trim() === "" || cantidad.trim() === "" || unidad.trim() === ""){
            addStaticMsg("Campos faltantes en ingredientes", "danger");
        } else if(Number.parseFloat(cantidad) <= 0) {
            addStaticMsg("La cantidad debe ser mayor a 0", "danger");
        }
        else {
            setIngredients(ingredients.concat([{
                ingrediente: ingrediente.trim(),
                cantidad: (Number.parseFloat(cantidad).toFixed(3)).toString().trim(),
                unidad: unidad.trim()
            }]));
            setInputIng("");
            setInputCant("");
            setInputUnit("");
        }
    }
    
   
    const postDietController = (e:any): void => {
        e.preventDefault();
        const doFetch = async (): Promise<void> => {
            if(name.trim() === ""){
                addStaticMsg("Nombre faltante", "danger");
                return;
            }

            const resData = await postDiet(name.trim(), calories, ingredients, macros, micros);
        

            if (resData !== null && resData.msg !== ""){
                addStaticMsg(resData.msg, "danger");
                return;
            }
            setIsOpen(false);
            addStaticMsg("La dieta se agrego correctamente", "success");
  
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
                        <div className={styles.macros_info}>
                            <label htmlFor="r_proteina">Proteínas (g)</label>
                            <input type="number" min="0" step="0.001" placeholder="Proteínas" id="r_proteina" name="r_proteina" required onChange={(e) => {setNutrients("proteina", e.target.value.toString(), 1)}}/>
                        </div>

                        <div className={styles.macros_info}> 
                            <label htmlFor="r_carbohidratos">Carbohidratos (g)</label> 
                            <input type="number" min="0" step="0.001" placeholder="Carbohidratos" id="r_carbohidratos" name="r_carbohidratos" required onChange={(e) => {setNutrients("carbohidratos", e.target.value.toString(), 1)}}/>
                        </div>

                        <div className={styles.macros_info}> 
                            <label htmlFor="r_grasas">Grasas (g)</label> 
                            <input type="number" min="0" step="0.001" placeholder="Grasas" id="r_grasas" name="r_grasas" required onChange={(e) => {setNutrients("grasas", e.target.value.toString(), 1)}}/>
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
                            <div className={styles.micros_col}>
                                <label htmlFor="real_fibra">Fibra (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="" id="real_" name="real_" onChange={(e) => {setNutrients("Fibra", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_ceniza">Ceniza (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Ceniza" id="real_ceniza" name="real_ceniza" onChange={(e) => {setNutrients("Ceniza", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_calcio">Calcio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Calcio" id="real_calcio" name="real_calcio"  onChange={(e) => {setNutrients("Calcio", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_fósforo">Fósforo (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Fósforo" id="real_fósforo" name="real_fósforo"  onChange={(e) => {setNutrients("Fósforo", e.target.value.toString(), 0)}}/> <br/>
                                
                                <label htmlFor="real_hierro">Hierro (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Hierro" id="real_hierro" name="real_hierro"  onChange={(e) => {setNutrients("Hierro", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_tiamina">Tiamina (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Tiamina" id="real_tiamina" name="real_tiamina"  onChange={(e) => {setNutrients("Tiamina", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_riboflavina">Riboflavina (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Riboflavina" id="real_riboflavina" name="real_riboflavina"  onChange={(e) => {setNutrients("Riboflavina", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_niacina">Niacina (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Niacina" id="real_niacina" name="real_niacina"  onChange={(e) => {setNutrients("Niacina", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_vitamina C">Vitamina C (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Vitamina C" id="real_vitamina C" name="real_vitamina C"  onChange={(e) => {setNutrients("Vitamina C", e.target.value.toString(), 0)}}/> <br/>
                                
                                <label htmlFor="real_vitamina A">Vitamina A (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Vitamina A" id="real_vitamina A" name="real_vitamina A" onChange={(e) => {setNutrients("Vitamina A", e.target.value.toString(), 0)}}/> <br/>

                            </div>

                            <div className={styles.micros_col}>
                                <label htmlFor="real_colesterol">Colesterol (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Colesterol" id="real_colesterol" name="real_colesterol" onChange={(e) => {setNutrients("Colesterol", e.target.value.toString(), 0)}}/> <br/>
                                
                                <label htmlFor="real_potasio">Potasio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Potasio" id="real_potasio" name="real_potasio" onChange={(e) => {setNutrients("Potasio", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_sodio">Sodio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Sodio" id="real_sodio" name="real_sodio" onChange={(e) => {setNutrients("Sodio", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_zinc">Zinc (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Zinc" id="real_zinc" name="real_zinc" onChange={(e) => {setNutrients("Zinc", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_magnesio">Magnesio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Magnesio" id="real_magnesio" name="real_magnesio" onChange={(e) => {setNutrients("Magnesio", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Vitamina B6" id="real_vitaminaB6" name="real_vitaminaB6" onChange={(e) => {setNutrients("Vitamina B6", e.target.value.toString(), 0)}}/> <br/>
                                
                                <label htmlFor="real_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="VitaminaB12" id="real_vitaminaB12" name="real_vitaminaB12" onChange={(e) => {setNutrients("Vitamina B12", e.target.value.toString(), 0)}}/> <br/>

                                <label htmlFor="real_acFolico">Ácido fólico (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Ácido fólico" id="real_acFolico" name="real_acFolico" onChange={(e) => {setNutrients("Ácido fólico", e.target.value.toString(), 0)}}/> <br/>
                                
                                <label htmlFor="real_folato">Folato Eq. (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Folato eq" id="real_folato" name="real_folato" onChange={(e) => {setNutrients("Folato Eq.", e.target.value.toString(), 0)}}/> <br/>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" id={styles.button_submit}>Submit</button>
            </form>
        </div>
    </PopUp>
  )
}