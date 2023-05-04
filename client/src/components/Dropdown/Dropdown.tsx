import { Dispatch, SetStateAction } from "react";
import styles from "./Dropdown.module.css";

interface Props {
    children: any;
    text: string;
    classBtn?: string;
    classDivChild?: string;
    componentText?: any;
    classDivParent?: string;
    id?: string;
    callbackOpen?: (() => any) | null;

    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DropDown({
    text,
    children,
    classBtn,
    classDivChild,
    classDivParent,
    isOpen,
    id,
    setIsOpen,
    componentText = null,
    callbackOpen = null
}: Props) {

    return (
        <div
            id={id}
            tabIndex={-1}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsOpen(false);
                }
            }}
            className={`${classDivParent} ${styles.container}`}>
            <div tabIndex={-1} onClick={() => {
                setIsOpen(prev => !prev);
                if (callbackOpen === null) return;
                callbackOpen();
            }} className={`${classBtn} ${styles.container_btn}`}>
                {componentText === null && text}
                {componentText !== null && componentText()}
                <span>
                    {isOpen && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                        </svg>
                    )}
                    {!isOpen && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                        </svg>
                    )}
                </span>
            </div>
            {
                isOpen && (
                    <div className={`${classDivChild} ${styles.child}`}>
                        {children}
                    </div>
                )
            }
        </div >
    )
}