import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

interface Props {
	open: boolean;

	setOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarMenu = ({
	open,

	setOpen
}: Props) => {
	// const [isExpanded, setIsExpanded] = useState(false);
	// const [isHovered, setIsHovered] = useState(false);
	// const [isActive, setIsActive] = useState(false);

	// const handleMouseEnterUl = () => {
	// 	setIsActive(true);
	// 	setIsHovered(true);
	// };

	// const handleMouseLeaveUl = () => {
	// 	setIsActive(false);
	// 	setIsHovered(false);
	// };

	// const toggleMenu = () => {
	// 	setIsExpanded(!isExpanded);
	// };

	return (
		<nav className={`${styles.page} ${open && styles.open}`}>
			<button onClick={() => {
				setOpen(prev => !prev);
			}}>X</button>
			<ul
				className={styles.ul}
			>
				<Link className={styles.underline} to="/">
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
				<Link className={styles.underline} to="/">
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
				<Link className={styles.underline} to="/">
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
