import PopUp from "../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction } from "react";
import styles from "./Delete_styles/styles.module.css";
import { deleteDiet } from "../../routes/diets/diet.routes";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { useContext } from "react";
import { useNavigate } from "react-router";


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
    const { addStaticMsg } = useContext(MessagesContext);
    const navigate = useNavigate();
    
    const deleteDietController = (): void => {
        const doFetch = async(): Promise<void> => {
            const resData = await deleteDiet(dietId);

            if(resData === null) {
                addStaticMsg("La dieta no pudo ser eliminada", "danger");
                return;
            }

            if (resData.msg !== ""){
                addStaticMsg(resData.msg, "danger");
                return;
            }
    
            //window.location.reload();
            navigate("/dietas");
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
                <h2>Eliminar dieta</h2>
                <h4>¿Estás seguro de que deseas eliminar esta dieta?</h4>
                <p>(Se eliminara toda la información perteneciente a esta dieta)</p>  
                
                <div className={styles.buttons}>
                    <button id={styles.yes} onClick={(e) => deleteDietController()}>Aceptar</button>
                    <button id={styles.no} onClick={(e) => setIsOpen(false)}>Cancelar</button> 
                </div>
            </div>
        </PopUp>
    </>
  )
}
