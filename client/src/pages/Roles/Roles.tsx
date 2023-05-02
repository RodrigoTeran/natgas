import { useEffect, useContext, useState, Fragment } from "react";
import styles from "./Roles.module.css";
import { MessagesContext } from "../../layouts/Messages/Messages";
import Layout from "../../layouts/Dashboard/Dashboard";
import { IGetAllUsersData, getAllUsers, IUserAll } from "../../routes/clientInfo/clientInfo.routes";

interface Props {
    user: IUserAll
}

function Line({
    user
}: Props) {
    return (
        <div>
            {user.firstName} {user.lastName}
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
                    {users.map((user: IUserAll, index: number) => {
                        return (
                            <Fragment key={index}>
                                <Line user={user} />
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default Roles;
