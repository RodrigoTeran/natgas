import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const SidebarMenu = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const handleMouseEnterUl = () => {
		setIsActive(true);
		setIsHovered(true);
	};

	const handleMouseLeaveUl = () => {
		setIsActive(false);
		setIsHovered(false);
	};

	// const toggleMenu = () => {
	// 	setIsExpanded(!isExpanded);
	// };

	return (
		<nav className={`${styles.page} ${isActive ? styles.active : ""}`}>
			<ul
				className={styles.ul}
				onMouseEnter={handleMouseEnterUl}
				onMouseLeave={handleMouseLeaveUl}
			>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						{isHovered && <li className={styles.li}>Inicio</li>}
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						{isHovered && <li className={styles.li}>Workourts</li>}
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						{isHovered && <li className={styles.li}>Ejercicios</li>}
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						{isHovered && <li className={styles.li}>Dietas</li>}
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						{isHovered && <li className={styles.li}>Bitacora</li>}
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						{isHovered && <li className={styles.li}>Progreso</li>}
					</div>
				</Link>
				<Link className={styles.underline} to="/">
					<div className={styles.individual}>
						<img
							className={styles.icon}
							src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png"
						/>
						{isHovered && <li className={styles.li}>Medidas</li>}
					</div>
				</Link>
			</ul>
		</nav>
	);
};

export default SidebarMenu;
