import styles from "./Home.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarMenu from "./Sidebar/Sidebar";
import TopMenu from "./TopMenu/TopMenu";
import BtnPrimary from "../Welcome/Btns/BtnPrimary/BtnPrimary";
import MenuPrimary from "./MenuPrimary/MenuPrimary";
import { setClientIdCache } from "../../cache/auth";

function Home() {

	const getParams = () => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());
		for (let i = 0; i < Object.keys(params).length; i++) {
			const key = Object.keys(params)[i];
			const value = params[key];

			if (key === "token") {
				setClientIdCache(value);
				break;
			}
		}
	}

	useEffect(() => {
		getParams();
	}, []);

	return (
		<div className={styles.page}>
			<MenuPrimary />
		</div>
	);
}

export default Home;
