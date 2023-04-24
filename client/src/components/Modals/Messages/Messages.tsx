import React, { useContext, useEffect, useRef } from 'react';
import styles from './Messages.module.css';
import { MESSAGE_MODAL } from './Messages.types';
import { MessagesContext } from '../../../layouts/Messages/Messages';

const MILISECONDS_MSGS = 5000;

const CloseIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
    )
}

interface Props {
    msg: MESSAGE_MODAL;
    resolveMsgOk: (msg: MESSAGE_MODAL, isOk: boolean) => void;
}

const Message: React.FunctionComponent<Props> = ({ msg, resolveMsgOk }) => {
    const putTimeOut = useRef<boolean>(false);

    const time = (): void => {
        const t: NodeJS.Timeout = setTimeout(() => {
            resolveMsgOk(msg, false);
            clearTimeout(t);
        }, MILISECONDS_MSGS);
    };

    useEffect(() => {
        if (putTimeOut.current) return;
        putTimeOut.current = true;
        if (msg.isOkCancel) return;
        time();
    }, []);

    return (
        <div
            className={`${styles.msg} ${styles[msg.type]} ${!msg.isOkCancel && styles.counter
                }`}
        >
            <div className={styles.msg_top}>
                <div className={styles.msg_top_text}>{msg.text}</div>
                <button
                    title="Cerrar mensaje"
                    onClick={() => {
                        resolveMsgOk(msg, false);
                    }}
                    className={styles.msg_top_icon}
                >
                    <CloseIcon />
                </button>
            </div>
            {msg.isOkCancel && (
                <div className={styles.msg_async}>
                    <button
                        className={styles.msg_async_cancel}
                        onClick={() => {
                            resolveMsgOk(msg, false);
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles.msg_async_ok}
                        onClick={() => {
                            resolveMsgOk(msg, true);
                        }}
                    >
                        Ok
                    </button>
                </div>
            )}
        </div>
    );
};

const MessagesModal: React.FunctionComponent = () => {
    const {
        modalMsgs,
        waitForPressResolveArray,
        setModalMsgs,
        hashSetSeedsMsgs,
    } = useContext(MessagesContext);

    const removeOurselves = (
        prev: MESSAGE_MODAL[],
        msg: MESSAGE_MODAL
    ): MESSAGE_MODAL[] => {
        const aux: MESSAGE_MODAL[] = [];

        for (let i = 0; i < prev.length; i++) {
            if (prev[i].id !== msg.id) {
                aux.push(prev[i]);
            }
        }

        return aux;
    };

    const remove = (msg: MESSAGE_MODAL): void => {
        setModalMsgs((prev) => removeOurselves(prev, msg));
    };

    const resolveMsgOk = (msg: MESSAGE_MODAL, isOk: boolean): void => {
        // eslint-disable-next-line
        if (waitForPressResolveArray.current[msg.id]) {
            waitForPressResolveArray.current[msg.id](isOk);
        }
        // We delete that resolver
        // In this case it will not cause bugs, because this keys are random numbers
        // eslint-disable-next-line
        delete waitForPressResolveArray.current[msg.id];
        hashSetSeedsMsgs.current.delete(msg.text);
        remove(msg);
    };

    return (
        <div className={styles.msgs}>
            {modalMsgs.map((msg: MESSAGE_MODAL, index: number) => {
                return (
                    <React.Fragment key={index}>
                        <Message resolveMsgOk={resolveMsgOk} msg={msg} />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default MessagesModal;
