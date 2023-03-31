import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

interface Props {
	open: boolean;

	setOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarMenu = ({
	open,

	setOpen,
}: Props) => {
	return (
		<nav className={`${styles.page} ${open && styles.open}`}>
			<button
				onClick={() => {
					setOpen((prev) => !prev);
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
				</svg>
			</button>
			<ul className={styles.ul}>
				<Link className={styles.underline} to="/home">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						<li className={styles.li}>Inicio</li>
					</div>
				</Link>
				<Link className={styles.underline} to="/rutinas">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						<li className={styles.li}>Workouts</li>
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						<li className={styles.li}>Ejercicios</li>
					</div>
				</Link>
				<Link className={styles.underline} to="/dietas">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						<li className={styles.li}>Dietas</li>
					</div>
				</Link>
				<Link className={styles.underline} to="/bitacora">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						<li className={styles.li}>Bitacora</li>
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						<li className={styles.li}>Progreso</li>
					</div>
				</Link>
				<Link className={styles.underline} to="/actualizar-medidas">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						<li className={styles.li}>Medidas</li>
					</div>
				</Link>
			</ul>
		</nav>
	);
};

export default SidebarMenu;
