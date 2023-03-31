import { Link } from "react-router-dom";
import styles from "./404.module.css";
import svg from "./icon.svg";

function Error404Page() {
    return (
        <div className={styles.container}>
            <p>
                <img width={500} src={svg} alt="" />
            </p>
            <Link to="/">
                Ir a página principal
            </Link>
        </div>
    )
}

export default Error404Page;