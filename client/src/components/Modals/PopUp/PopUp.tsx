import styles from './PopUp.module.css';
import React, { Dispatch, SetStateAction, useEffect } from 'react';

interface PropsCloseIcon {
    className?: string;
    onClick: () => any
}

const CloseIcon = ({
    className,
    onClick
}: PropsCloseIcon) => {
    return (
        <svg className={className} onClick={onClick} viewBox="0 0 217 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L213 213" />
            <path d="M4 213L213 4" />
        </svg>
    )
}

interface Props {
    children: any;
    isOpen: boolean;
    className?: string;
    setIsOpen: Dispatch<SetStateAction<boolean>> | null;
    callbackClose?: () => void;
}

const PopUp: React.FunctionComponent<Props> = ({
    children,
    setIsOpen,
    isOpen,
    callbackClose,
    className = ""
}): JSX.Element => {
    const close = (): void => {
        if (setIsOpen !== null) {
            setIsOpen(false);
        }
        if (callbackClose === undefined) return;
        callbackClose();
    };


    const manageScroll = (takeOut: boolean): void => {
        const body = document.querySelector("body");
        if (body === null) return; // Que raro xd

        if (takeOut) {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
        }
    };

    useEffect(() => {
        manageScroll(isOpen);
    }, [isOpen])

    return (
        <div
            // onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            //   if (e.target !== e.currentTarget) return;
            //   close();
            // }}
            className={`${styles.pop} ${isOpen && styles.pop_open}`}
        >
            <div className={`${styles.card} ${className}`}>
                <CloseIcon className={styles.cross} onClick={close} />
                {children}
            </div>
        </div>
    );
};

export default PopUp;
