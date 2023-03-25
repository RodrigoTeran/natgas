import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import SidebarMenu from "./Sidebar/Sidebar";
import TopMenu from "./TopMenu/TopMenu";
import BtnPrimary from "../Welcome/Btns/BtnPrimary/BtnPrimary";
import MenuPrimary from "./MenuPrimary/MenuPrimary";

function Home() {
	return (
		<div className={styles.page}>
			<MenuPrimary />
		</div>
	);
}

export default Home;
