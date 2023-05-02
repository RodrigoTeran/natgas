import { useEffect, useContext, useState, Fragment } from "react";
import styles from "./Roles.module.css";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { AppContext } from "../../App";
import rolUser from "./images/rolUser.png";
import Dropdown from "../../components/Dropdown/Dropdown";
import Layout from "../../layouts/Dashboard/Dashboard";
import { IGetAllUsersData, getAllUsers, IUserAll, changeUserRole } from "../../routes/clientInfo/clientInfo.routes";

interface Props {
    user: IUserAll,
    index: number
}

function Line({
    user,
    index
}: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [choosenRole, setChoosenRole] = useState<string>(user.rol);
    const arr: any = { "Administrador": "uuidR01", "Cliente": "uuidR02" };
    const { user: userC } = useContext(AppContext);
    const { addStaticMsg } = useContext(MessagesContext);

    const changeRol = (rol: string): void => {
        setChoosenRole(rol);
        setIsOpen(false);

        const doFetch = async (): Promise<void> => {
            const rolid = arr[rol];
            if (rolid === null || rolid === undefined) return;
            const data = await changeUserRole(user.id, rolid);
            if (data === null) {
                addStaticMsg("Error al cambiar el rol", "danger");
                return;

            }
            if (data.msg) {
                addStaticMsg(data.msg, "danger");
                return;
            }
            addStaticMsg("Rol cambiado con éxito", "success");
        };

        void doFetch();
    };

    return (
        <div className={`${styles.row} ${index % 2 == 0 && styles.black}`}>
            <div className={styles.row_info}>
                <div className={styles.row_info_img}>
                    <img src={rolUser} alt="Usuario" />
                </div>
                <div className={styles.row_info_text}>
                    <div>{user.firstName} {user.lastName}</div>
                    <div className={styles.row_info_username}>{user.username === null ? "@" + user.firstName + user.lastName : "@" + user.username}</div>
                </div>
            </div>
            <div className={styles.row_rol}>
                <Dropdown callbackOpen={() => {
                    if (userC?.id !== user.id) return;
                    addStaticMsg("No puedes cambiarte de rol tú mismo", "danger");
                }} classDivParent={styles.drop} classDivChild={styles.dropwn} text={choosenRole} isOpen={userC?.id === user.id ? false : isOpen} setIsOpen={setIsOpen}>
                    <div className={styles.selection_roles}>
                        {Object.keys(arr).map((rol: string, index: number) => {
                            return (
                                <div onClick={() => { changeRol(rol) }} key={index}>
                                    {rol}
                                </div>
                            )
                        })}
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}

function Header() {

    return (
        <div className={styles.header}>
            <div>
                CUENTA
            </div>
            <div>
                ROL
            </div>
        </div>
    )
}

function Roles() {
    const { addStaticMsg } = useContext(MessagesContext);
    const [users, setUsers] = useState<IUserAll[]>([]);
    const [page, setPage] = useState<number>(0);

    const fetchAll = (): void => {
        const doFetch = async (): Promise<void> => {
            const data = await getAllUsers(page);
            if (data === null) {
                addStaticMsg("Error al obtener los usuarios", "danger");
                return;

            }
            if (data.msg) {
                addStaticMsg(data.msg, "danger");
                return;
            }
            setUsers(data.data.users);
        };
        void doFetch();
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <Layout>
            <div className={styles.roles}>
                <h1>
                    Roles
                </h1>
                <div className={styles.container}>
                    <Header />
                    {users.map((user: IUserAll, index: number) => {
                        return (
                            <Fragment key={index}>
                                <Line user={user} index={index} />
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default Roles;
