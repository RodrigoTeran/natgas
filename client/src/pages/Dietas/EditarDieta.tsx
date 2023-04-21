import PopUp from "../../components/Modals/PopUp/PopUp";
import styles from "./Add_styles/styles.module.css";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useState, useContext } from "react";
import { getDiet, updateDiet } from "../../routes/diets/diet.routes";
import { MessagesContext } from "../../layouts/Messages/Messages";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    dietId: string;
}

export const EditarDieta = ({
    isOpen,
    setIsOpen,
    dietId
}: Props) => {
    const { addStaticMsg } = useContext(MessagesContext);

    const [ingredients, setIngredients] = useState<any[]>([]);
    const [name, setName] = useState<any>("");
    const [calories, setCalories] = useState<any>("");
    const [macros, setMacros] = useState<any>({"proteina": '0', "grasas": '0', "carbohidratos": '0'});
    const [micros, setMicros] = useState<any>({"Fibra": '0', "Ceniza":'0', "Calcio": '0', "Fósforo": '0', 
                                                "Hierro": '0', "Tiamina": '0', "Riboflavina": '0', "Niacina": '0', 
                                                "Vitamina C": '0', "Vitamina A": '0', "Ac grasos mono-in": '0',
                                                "Ac grasos poli": '0', "Ac grasos saturados": '0', "Colesterol": '0', 
                                                "Potasio": '0', "Sodio": '0', "Zinc": '0', "Magnesio": '0', 
                                                "Vitamina B6": '0', "Vitamina B12": '0', "Ácido fólico": '0', "Folato Eq.": '0'});
    
    const [inputIng, setInputIng] = useState<string>("");
    const [inputCant, setInputCant] = useState<string>("");
    const [inputUnit, setInputUnit] = useState<string>("");
    const macrosKeys: any[] = [];
    const microsKeys: any[] = [];

    function setNutrients (name:string, value:any, type:number) {
        if(type === 1){
            setMacros((prev:any) => (
                {
                    ...prev,
                    [name]: value,
                }
            ))
        }
        else if (type === 0){
            setMicros((prev:any) => (
                {
                    ...prev,
                    [name]: value,
                }
            ))
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
                name: ingrediente,
                quantity: (Number.parseFloat(cantidad).toFixed(3)).toString(),
                unit: unidad
            }]));
            setInputIng("");
            setInputCant("");
            setInputUnit("");
        }
    }

    function setMacrosState(auxMacros: {}) {
        Object.keys(macros).map((key: string) => {
            macrosKeys.push(key);
        });
        
        Object.values(auxMacros).map((element: any, key:number) => {
            let macrosAux:any = macros;
            macrosAux[macrosKeys[key]] = element;
            setMacros(macrosAux);
        });
    }

    function setMicrosState(auxMicros: {}) {
        Object.keys(micros).map((key: string) => {
            microsKeys.push(key);
        });
        
        Object.values(auxMicros).map((element: any, key:number) => {
            let microsAux:any = micros;
            microsAux[microsKeys[key]] = element;
            setMicros(microsAux);
        });
    }
    
    const updateDietController = (e:any): void => {
        e.preventDefault();
        const doFetch = async (): Promise<void> => {
            const resData = await updateDiet(dietId, name, calories, ingredients, macros, micros);

           window.location.reload();
           //addStaticMsg("Dieta añadida con éxito", "success");
        };
        void doFetch();
    }

    const getDietController = ():void => {
        const doFetch = async ():Promise<void> => {
            const resData = await getDiet(dietId);

            if (resData === null) {
                addStaticMsg("Error al obtener la dieta", 'danger');
                return;
            }

            if (resData.msg !== "") {
                addStaticMsg(resData.msg, "danger");
                return;
            }

            const data = resData.data;

            if(data === null) {
                return;
            }

            setName(data.diet.name);
            setCalories(data.diet.calories);

            const ingAux:any[] = [];
            data.diet.ingredients.map((element:any, key:number) => {
                ingAux.push(JSON.parse(element));
            });

            setIngredients(ingAux);
            setMicrosState(JSON.parse(data.diet.micros));
            setMacrosState(JSON.parse(data.diet.macros));
        }
        void doFetch();
    }

    useEffect(() => {
        getDietController();
    }, [isOpen, setName]);

  return (
    <PopUp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <div className={styles.layout}>
            <form onSubmit={(e) => updateDietController(e)}>
                <div className={styles.titulo}>
                    <h2>Editar dieta</h2>
                </div>
                
                <div className={styles.name}>
                    <div className={styles.calories}>
                        <label htmlFor="name">Nombre</label> <br/>
                        <input type="text" placeholder="Nombre de la dieta" id="name" name="name" required onChange={(e) => {setName(e.target.value)}} value={name}/>
                    </div>
                    <div className={styles.calories}>
                        <label htmlFor="calories_number">Calorías</label> <br/>
                        <input type="number" min="0" step="0.001"  placeholder="Calorías" id="calories_number" name="calories_number" required onChange={(e) => {setCalories(e.target.value.toString())}} value={calories}/>
                    </div>
                </div>

                <div className={styles.macros_card}>
                    <h3>Macros</h3>

                    <div className={styles.macros}>
                        <div className={styles.macros_info}>
                            <label htmlFor="r_proteina">Proteínas (g)</label>
                            <input type="number" min="0" step="0.001"  placeholder="Proteínas" id="r_proteina" name="r_proteina" required onChange={(e) => {setNutrients("proteina", e.target.value.toString(), 1)}} value={macros['proteina']}/>
                        </div>

                        <div className={styles.macros_info}>
                            <label htmlFor="r_carbohidratos">Carbohidratos (g)</label>
                            <input type="number" min="0" step="0.001"  placeholder="Carbohidratos" id="r_carbohidratos" name="r_carbohidratos" required onChange={(e) => {setNutrients("carbohidratos", e.target.value.toString(), 1)}} value={macros['carbohidratos']}/>
                        </div>

                        <div className={styles.macros_info}> 
                            <label htmlFor="r_grasas">Grasas (g)</label>
                            <input type="number" min="0" step="0.001"  placeholder="Grasas" id="r_grasas" name="r_grasas" required onChange={(e) => {setNutrients("grasas", e.target.value.toString(), 1)}} value={macros['grasas']}/>
                        </div>
                    </div>
                </div>

                <div className={styles.ingredientes}>
                    <h3>Ingredientes</h3>
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
                                        <input value={element.name} id={"ingrediente" + key.toString()} className={"ingrediente" + key.toString()} disabled/>
                                    </div>

                                    <div className={styles.aux}>
                                        <input value={element.quantity} id={"cantidad" + key.toString()} className={"cantidad" + key.toString()} disabled/>
                                    </div>
                                    
                                    <div className={styles.aux}>
                                        <input disabled value={element.unit} id={"unidad" + key.toString()} className={"unidad" + key.toString()}/>
                                    </div>
                                    
                                    <button type="button" id={styles.remove} onClick={(e) => {setIngredients(remove(key))}}> &times; </button>
                                </div>
                        )}))}
                </div>

                <div className={styles.micros_card}>
                    <h3>Micros</h3>

                    <div className={styles.micros}>
                        <div className={styles.micros_info}>
                            <div className={styles.micros_col}>
                                <label htmlFor="real_fibra">Fibra (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="" id="real_" name="real_" required onChange={(e) => {setNutrients("Fibra", e.target.value.toString(), 0)}}  value={micros["Fibra"][0]}/> <br/>

                                <label htmlFor="real_ceniza">Ceniza (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Ceniza" id="real_ceniza" name="real_ceniza" required onChange={(e) => {setNutrients("Ceniza", e.target.value.toString(), 0)}}  value={micros["Ceniza"][0]}/> <br/>

                                <label htmlFor="real_calcio">Calcio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Calcio" id="real_calcio" name="real_calcio" required  onChange={(e) => {setNutrients("Calcio", e.target.value.toString(), 0)}}  value={micros["Calcio"][0]}/> <br/>

                                <label htmlFor="real_fósforo">Fósforo (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Fósforo" id="real_fósforo" name="real_fósforo" required  onChange={(e) => {setNutrients("Fósforo", e.target.value.toString(), 0)}}  value={micros["Fósforo"][0]}/> <br/>
                                
                                <label htmlFor="real_hierro">Hierro (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Hierro" id="real_hierro" name="real_hierro" required  onChange={(e) => {setNutrients("Hierro", e.target.value.toString(), 0)}}  value={micros["Hierro"][0]}/> <br/>

                                <label htmlFor="real_tiamina">Tiamina (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Tiamina" id="real_tiamina" name="real_tiamina" required  onChange={(e) => {setNutrients("Tiamina", e.target.value.toString(), 0)}}  value={micros["Tiamina"][0]}/> <br/>

                                <label htmlFor="real_riboflavina">Riboflavina (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Riboflavina" id="real_riboflavina" name="real_riboflavina" required  onChange={(e) => {setNutrients("Riboflavina", e.target.value.toString(), 0)}}   value={micros["Riboflavina"][0]}/> <br/>

                                <label htmlFor="real_niacina">Niacina (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Niacina" id="real_niacina" name="real_niacina" required  onChange={(e) => {setNutrients("Niacina", e.target.value.toString(), 0)}}   value={micros["Niacina"][0]}/> <br/>

                                <label htmlFor="real_vitamina C">Vitamina C (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Vitamina C" id="real_vitamina C" name="real_vitamina C" required  onChange={(e) => {setNutrients("Vitamina C", e.target.value.toString(), 0)}}   value={micros["Vitamina C"][0]}/> <br/>
                                
                                <label htmlFor="real_vitamina A">Vitamina A (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Vitamina A" id="real_vitamina A" name="real_vitamina A" required onChange={(e) => {setNutrients("Vitamina A", e.target.value.toString(), 0)}}  value={micros["Vitamina A"][0]}/> <br/>

                                <label htmlFor="real_acGrasosMono">Ac grasos mono-in (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Ac grasos mono-in" id="real_acGrasosMono" name="real_acGrasosMono" required onChange={(e) => {setNutrients("Ac grasos mono-in", e.target.value.toString(), 0)}}  value={micros["Ac grasos mono-in"][0]}/> <br/>
                            </div>

                            <div className={styles.micros_col}>
                                <label htmlFor="real_acGrasosPoli">Ac grasos poli (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Ac grasos poli" id="real_acGrasosPoli" name="real_acGrasosPoli" required onChange={(e) => {setNutrients("Ac grasos poli", e.target.value.toString(), 0)}} value={micros["Ac grasos poli"][0]}/> <br/>

                                <label htmlFor="real_acGrasosSaturados">Ac grasos saturados (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Ac grasos saturados" id="real_acGrasosSaturados" name="real_acGrasosSaturados" required onChange={(e) => {setNutrients("Ac grasos saturados", e.target.value.toString(), 0)}}  value={micros["Ac grasos saturados"][0]}/> <br/>

                                <label htmlFor="real_colesterol">Colesterol (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Colesterol" id="real_colesterol" name="real_colesterol" required onChange={(e) => {setNutrients("Colesterol", e.target.value.toString(), 0)}} value={micros["Colesterol"][0]}/> <br/>
                                
                                <label htmlFor="real_potasio">Potasio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Potasio" id="real_potasio" name="real_potasio" required onChange={(e) => {setNutrients("Potasio", e.target.value.toString(), 0)}} value={micros["Potasio"][0]}/> <br/>

                                <label htmlFor="real_sodio">Sodio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Sodio" id="real_sodio" name="real_sodio" required onChange={(e) => {setNutrients("Sodio", e.target.value.toString(), 0)}} value={micros["Sodio"][0]}/> <br/>

                                <label htmlFor="real_zinc">Zinc (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Zinc" id="real_zinc" name="real_zinc" required onChange={(e) => {setNutrients("Zinc", e.target.value.toString(), 0)}} value={micros["Zinc"][0]}/> <br/>

                                <label htmlFor="real_magnesio">Magnesio (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Magnesio" id="real_magnesio" name="real_magnesio" required onChange={(e) => {setNutrients("Magnesio", e.target.value.toString(), 0)}} value={micros["Magnesio"][0]}/> <br/>

                                <label htmlFor="real_vitaminaB6">Vitamina B6 (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Vitamina B6" id="real_vitaminaB6" name="real_vitaminaB6" required onChange={(e) => {setNutrients("Vitamina B6", e.target.value.toString(), 0)}} value={micros["Vitamina B6"][0]}/> <br/>
                                
                                <label htmlFor="real_vitaminaB12">Vitamina B12 (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="VitaminaB12" id="real_vitaminaB12" name="real_vitaminaB12" required onChange={(e) => {setNutrients("Vitamina B12", e.target.value.toString(), 0)}} value={micros["Vitamina B12"][0]}/> <br/>

                                <label htmlFor="real_acFolico">Ácido fólico (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Ácido fólico" id="real_acFolico" name="real_acFolico" required onChange={(e) => {setNutrients("Ácido fólico", e.target.value.toString(), 0)}} value={micros["Ácido fólico"][0]}/> <br/>
                                
                                <label htmlFor="real_folato">Folato Eq. (μg)</label> <br/>
                                <input type="number" min="0" step="0.001"  placeholder="Folato eq" id="real_folato" name="real_folato" required onChange={(e) => {setNutrients("Folato Eq.", e.target.value.toString(), 0)}} value={micros["Folato Eq."][0]}/> <br/>
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
