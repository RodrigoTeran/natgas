import styles from "./ComingSoon.module.css";
import Dashboard from "../../layouts/Dashboard/Dashboard";

function ComingSoon() {
    return (
        <Dashboard>
            <div className={styles.container}>
                Próximamente 🚀
            </div>
        </Dashboard>
    )
}

export default ComingSoon;