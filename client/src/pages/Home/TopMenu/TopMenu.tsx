import styles from "./TopMenu.module.css";
import arrowDown from "../../../images/arrow-down.png";

interface Props {
	nombre: string;
}

function TopMenu({ nombre }: Props) {
	return (
		<div className={styles.page}>
			<h1 className={styles.title}>ONYX</h1>
			<div className={styles.right}>
				<img
					className={styles.image}
					src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
				/>
				<p className={styles.p}>{nombre}</p>
				<img className={styles.icon} src={arrowDown} />
			</div>
		</div>
	);
}

export default TopMenu;
