import React from "react";
import Menu from "../Menu/Menu";
import styles from "./AboutUs.module.css";
import iFace from "../icons/facebook.png";
import instagram from "../icons/instagram.svg";

function AboutUs() {
	return (
		<div className={styles.page}>
			<Menu />
			<h1 className={styles.title}>Nuestra historia</h1>
			<div className={styles.row1}>
				<div className={styles.gallery}>
					<div className={styles.gallery_left}>
						<img
							className={styles.img_top}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
						<img
							className={styles.img_bottom}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
					</div>
					<div className={styles.gallery_right}>
						<img
							className={styles.img2}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
					</div>
				</div>
				<p className={styles.p}>
					Somos un proyecto de desarrollo personal fundado por dos hermanos en Querétaro con ayuda de un grupo Ingenieros del Tecnológico de Monterrey. <br /><br /> Nuestro sueño es ser la herramienta fitness más utilizada para lograr tus objetivos personales de estética física y de rendimiento en el gimnasio. <br /> <br />
					Contactamos profesores y líderes del Tecnologico de Monterrey para iniciar un proyecto de vinculación con alumnos de la carrera de ingeniería en Tecnologías Computacionales. 
				</p>
			</div>
			<div className={styles.row2}>
				<p className={styles.p}>
					De esta forma, la primera fase del proyecto Onyx será desarrollada 100% por el talento de los alumnos de la institución. <br/> <br />
					Nos enorgullece bastante el saber que el proyecto Onyx no solo será una herramienta para facilitar la obtención de resultados, sino que forma parte del desarrollo de alumnos brillantes de la institución. 
				</p>
				<div className={styles.gallery}>
					<div className={styles.gallery_left}>
						<img
							className={styles.img_top}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
						<img
							className={styles.img_bottom}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
					</div>
					<div className={styles.gallery_right}>
						<img
							className={styles.img2}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
					</div>
				</div>
			</div>
			<div className={styles.separador}>
				<h2 className={styles.title}>Conócenos</h2>
				<p className={styles.p_separador}>
					Para más información del proyecto Onyx síguenos en nuestras redes sociales. 
				</p>
				<div className={styles.icons}>
					<img className={styles.icon} src={iFace} />
					<img className={styles.icon} src={instagram} />
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.contexto_row}>
					<div className={styles.contexto_row_left}>
						<h3 className={styles.contexto_titulo}>Objetivo</h3>
						<p className={styles.contexto_p}>
						Onyx es una plataforma web que te ayude a conseguir objetivos físicos con un seguimiento de dietas, ejercicios y bitácoras{" "}
						</p>
					</div>
					<div className={styles.contexto_row_right}>
						<img
							className={styles.context_img}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutUs;
