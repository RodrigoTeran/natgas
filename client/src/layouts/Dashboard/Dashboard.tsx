import styles from "./Dashboard.module.css";
import TopMenu from "./TopMenu/TopMenu";
import SidebarMenu from "./Sidebar/Sidebar";
import { useState } from "react";

interface Props {
    children: any
}

function Dashboard({
    children
}: Props) {

    const [open, setOpen] = useState<boolean>(true);

    return (
        <div className={styles.page}>
            <TopMenu nombre="ONYX" />
            <SidebarMenu open={open} setOpen={setOpen} />
            <div className={`${styles.container} ${open && styles.open}`}>
                {children}
            </div>
        </div>
    );
}

export default Dashboard;
