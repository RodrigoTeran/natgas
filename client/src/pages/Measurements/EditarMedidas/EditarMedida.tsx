import PopUp from "../../../components/Modals/PopUp/PopUp";
import styles from "./styles.module.css";
import { updateMeasure } from "../../../routes/medidas/medidas.routes";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useState, useContext } from "react";
import { MessagesContext } from "../../../layouts/Messages/Messages";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    measureId: string;
    measure: number;
    setMeasure: Dispatch<SetStateAction<number>>;
    table: string;
}

const dictionary = new Map<any, any>();
dictionary.set('Pecho', 'chest');
dictionary.set('Cadera', 'hip');
dictionary.set('Brazo izq', 'leftArm');
dictionary.set('Pantorrilla izq', 'leftCalve');
dictionary.set('Antebrazo izq', 'leftForearm');
dictionary.set('Pierna izq', 'leftLeg');
dictionary.set('Cuello', 'neck');
dictionary.set('Brazo der', 'rightArm');
dictionary.set('Pantorrilla der', 'rightCalve');
dictionary.set('Antebrazo der', 'rightForearm');
dictionary.set('Pierna der', 'rightLeg');
dictionary.set('Cintura', 'waist');
dictionary.set('Peso', 'weight');

export const EditarMedida = ({
    isOpen,
    setIsOpen,
    measureId,
    measure,
    setMeasure,
    table
}: Props) => {
    const { addStaticMsg } = useContext(MessagesContext);

    
    const updateMeasureController = (e:any): void => {
        e.preventDefault();
        const doFetch = async (): Promise<void> => {

            if(measure.toString().trim() === "") {
                addStaticMsg("Datos faltantes", "danger");
                return;
            }
            
            const resData = await updateMeasure(dictionary.get(table), measure.toString(), measureId);
    
            if (resData === null) {
                addStaticMsg("Error al editar la medida", "danger");
                return;
            }
    
            if (resData.msg !== "") {
                addStaticMsg(resData.msg, "danger");
                return;
            }
    
            addStaticMsg("Medida editada con éxito", "success");
        }
        void doFetch();
        setIsOpen(false);
    }

  return (
    <PopUp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    >
        <div className={styles.layout}>
            <form onSubmit={(e) => updateMeasureController(e)}>
                <br/>
                <h2>Editar medidas</h2>
                
                <div className={styles.name}>
                    <div className={styles.calories}>
                        <label htmlFor="name">{table}</label> <br/>
                        <input type="number" min="0" step="0.001" placeholder="Medida" id="medida" name="medida" required onChange={(e) => {setMeasure(Number.parseFloat(e.target.value))}} value={measure.toString()}/>
                    </div>
                </div>

                <br/>

                <button type="submit" id={styles.button_submit}>Submit</button>
            </form>
        </div>
    </PopUp>
  )
}