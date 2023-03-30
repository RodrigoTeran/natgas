import React, {
    useState,
    useRef,
    createContext,
    Dispatch,
    SetStateAction,
} from 'react';
import MessagesModal from '../../components/Messages/Messages';
import type {
    MESSAGE_MODAL,
    MESSAGE_MODAL_RESOLVERS_DICT,
    MESSAGE_TYPE_MODAL_STATIC,
} from '../../components/Messages/Messages.types';
import styles from './Messages.module.css';

// Context
export const MessagesContext = createContext({} as LayoutValueProvider);

interface LayoutValueProvider {
    modalMsgs: MESSAGE_MODAL[];
    waitForPressResolveArray: React.MutableRefObject<MESSAGE_MODAL_RESOLVERS_DICT>;
    hashSetSeedsMsgs: React.MutableRefObject<Set<string>>;

    setModalMsgs: Dispatch<SetStateAction<MESSAGE_MODAL[]>>;
    addAsyncMsg: (text: string) => Promise<boolean>;
    addStaticMsg: (text: string, typeMsg: MESSAGE_TYPE_MODAL_STATIC) => void;
}

interface Props {
    children: any
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
    // Modal messages
    const [modalMsgs, setModalMsgs] = useState<MESSAGE_MODAL[]>([]);
    const waitForPressResolveArray = useRef<MESSAGE_MODAL_RESOLVERS_DICT>({});
    const hashSetSeedsMsgs = useRef<Set<string>>(new Set());

    const addAsyncMsg = async (text: string): Promise<boolean> => {
        // eslint-disable-next-line
        if (hashSetSeedsMsgs.current.has(text))
            return await new Promise<boolean>((resolve) => {
                resolve(false);
            });
        hashSetSeedsMsgs.current.add(text);

        const waitForPress = async (id: string): Promise<boolean> => {
            // eslint-disable-next-line
            return new Promise<boolean>(
                (resolve) => (waitForPressResolveArray.current[id] = resolve)
            );
        };

        // Create unique id
        const id: string = String(new Date().getTime() + Math.random());

        // Push msg
        setModalMsgs((prev) => [
            ...prev,
            {
                id,
                text,
                type: 'ask',
                isOkCancel: true,
            },
        ]);

        const resOfBtn: boolean = await waitForPress(id);
        return resOfBtn;
    };

    const addStaticMsg = (
        text: string,
        typeMsg: MESSAGE_TYPE_MODAL_STATIC
    ): void => {
        if (hashSetSeedsMsgs.current.has(text)) return;
        hashSetSeedsMsgs.current.add(text);

        // Create unique id
        const id: string = String(new Date().getTime() + Math.random());

        // Push msg
        setModalMsgs((prev) => [
            ...prev,
            {
                id,
                text,
                type: typeMsg,
                isOkCancel: false,
            },
        ]);
    };

    return (
        <MessagesContext.Provider
            value={{
                modalMsgs,
                waitForPressResolveArray,
                hashSetSeedsMsgs,

                setModalMsgs,
                addAsyncMsg,
                addStaticMsg,
            }}
        >
            <MessagesModal />
            <div className={styles.messages}>
                {children}
            </div>
        </MessagesContext.Provider>
    );
};

export default Layout;
