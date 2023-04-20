import PopUp from "../../components/Modals/PopUp/PopUp";
import { Dispatch, SetStateAction } from "react";

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
        <div>EliminarDieta</div>

        <PopUp
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            Mensaje de confirmación
        </PopUp>
    </>
  )
}
