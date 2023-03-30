import styles from "./Menu.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Menu() {
	const [activeIndex, setActiveIndex] = useState(-1);
	const [isBurgerActive, setIsBurgerActive] = useState(false);

	const handleBurgerClick = () => {
		setIsBurgerActive(!isBurgerActive);
	};

	const handleLinkClick = (index: number) => {
		setActiveIndex(index);
		setIsBurgerActive(false);
	};

	return (
		<div className={styles.page}>
			<div className={styles.start}>
				<Link className={styles.link} to="/">
					<p className={styles.logo_text}>Logo</p>
				</Link>
			</div>
			<div className={styles.end}>
				<Link
					to="/"
					onClick={() => {
						setActiveIndex(0);
					}}
					className={`${styles.link} ${activeIndex === 0 ? styles.active : ""}`}
				>
					<p className={styles.individual}>Inicio</p>
				</Link>
				<Link
					to="/sobre-nosotros"
					onClick={() => {
						setActiveIndex(1);
					}}
					className={`${styles.link} ${activeIndex === 1 ? styles.active : ""}`}
				>
					<p className={styles.individual}>Sobre Nosotros</p>
				</Link>
				<Link
					onClick={() => {
						setActiveIndex(2);
					}}
					className={`${styles.link} ${activeIndex === 2 ? styles.active : ""}`}
					to="/faq"
				>
					<p className={styles.individual}>FAQ</p>
				</Link>
				<Link
					onClick={() => {
						setActiveIndex(3);
					}}
					className={`${styles.link} ${activeIndex === 3 ? styles.active : ""}`}
					to="/contact"
				>
					<p className={styles.individual}>Contáctanos</p>
				</Link>
			</div>
			<div className={styles.burger} onClick={handleBurgerClick}>
				≡
			</div>
			{isBurgerActive && (
				<div className={styles.mobileMenu}>
					<Link
						to="/"
						onClick={() => handleLinkClick(0)}
						className={`${styles.link} ${
							activeIndex === 0 ? styles.active : ""
						}`}
					>
						Inicio
					</Link>
					<Link
						to="/sobre-nosotros"
						onClick={() => {
							setActiveIndex(1);
						}}
						className={`${styles.link} ${
							activeIndex === 1 ? styles.active : ""
						}`}
					>
						<p className={styles.individual}>Sobre Nosotros</p>
					</Link>
					<Link
						onClick={() => {
							setActiveIndex(2);
						}}
						className={`${styles.link} ${
							activeIndex === 2 ? styles.active : ""
						}`}
						to="/faq"
					>
						<p className={styles.individual}>FAQ</p>
					</Link>
					<Link
						onClick={() => {
							setActiveIndex(3);
						}}
						className={`${styles.link} ${
							activeIndex === 3 ? styles.active : ""
						}`}
						to="/contact"
					>
						<p className={styles.individual}>Contáctanos</p>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Menu;
