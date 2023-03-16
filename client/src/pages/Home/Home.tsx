import styles from "./Home.module.css";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className={styles.page}>
            Home page
            <Link to="/iniciar-sesion">
                Hola soy un link
            </Link>
        </div>
    )
}

export default Home;