import PopUp from "../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction } from "react";
import styles from "./Delete_styles/styles.module.css";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    dietId: string;
}

export const EliminarDieta = ({
    isOpen,
    setIsOpen,
    dietId
}: Props) => {
  return (
    <>
        <PopUp
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className={styles.layout}>
                <h2>Eliminar dieta</h2>
                <h4>¿Estás seguro de que deseas eliminar esta dieta?</h4>
                <p>(Se eliminara toda la información perteneciente a esta dieta)</p>  
                
                <div className={styles.buttons}>
                    <button id={styles.yes}>Aceptar</button>
                    <button id={styles.no} onClick={(e) => setIsOpen(false)}>Cancelar</button> 
                </div>
            </div>
        </PopUp>
    </>
  )
}
