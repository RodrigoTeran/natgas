import React from "react";
import Menu from "../Menu/Menu";
import styles from "./AboutUs.module.css";

function AboutUs() {
	return (
		<div className={styles.page}>
			<Menu />
			<h1 className={styles.title}>Sobre Nosotros</h1>
		</div>
	);
}

export default AboutUs;
