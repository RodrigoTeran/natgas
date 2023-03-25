import styles from "./MenuPrimary.module.css";
import SidebarMenu from "../Sidebar/Sidebar";
import TopMenu from "../TopMenu/TopMenu";

function MenuPrimary() {
	return (
		<div>
			<TopMenu nombre="ONYX" />
			<SidebarMenu />
		</div>
	);
}

export default MenuPrimary;
