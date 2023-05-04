import PopUp from "../../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css"
import { deleteMeasure } from "../../../routes/medidas/medidas.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { useContext } from "react";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    table: string,
    measureId: string;
    clear: () => any;
}

export const EliminarMedida = ({
    isOpen,
    setIsOpen,
    table,
    measureId,
    clear
}: Props) => {
    const { addStaticMsg } = useContext(MessagesContext);
    
    const deleteMeasureController = (): void => {
        const doFetch = async (): Promise<void> => {
            
            const resData = await deleteMeasure(table, measureId);
    
            if (resData === null) {
                addStaticMsg("Error al eliminar la medida", "danger");
                return;
            }
    
            if (resData.msg !== "") {
                addStaticMsg(resData.msg, "danger");
                return;
            }
    
            addStaticMsg("Medida eliminada con éxito", "success");
            setIsOpen(false);
            clear();
        }
        void doFetch();
    }
  
    return (
    <>
        <PopUp
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className={styles.layout}>
                <h2>Eliminar medida</h2>
                <h4>¿Estás seguro de que deseas eliminar esta medida?</h4>
                <p>(Se eliminará permanentemente)</p>  
                
                <div className={styles.buttons}>
                    <button id={styles.yes} onClick={(e) => deleteMeasureController()}>Aceptar</button>
                    <button id={styles.no} onClick={(e) => setIsOpen(false)}>Cancelar</button> 
                </div>
            </div>
        </PopUp>
    </>
  )
}
