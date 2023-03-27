import React from "react";
import Menu from "../Menu/Menu";
import styles from "./AboutUs.module.css";
import iFace from "../icons/facebook.png";

function AboutUs() {
	return (
		<div className={styles.page}>
			<Menu />
			<h1 className={styles.title}>Sobre Nosotros</h1>
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
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
					maximus urna vel velit sollicitudin venenatis. Duis luctus posuere
					nulla quis elementum. Class aptent taciti sociosqu ad litora torquent
					per conubia nostra, per inceptos himenaeos. Aliquam varius varius
					neque facilisis tincidunt. Nunc est felis, tristique nec nibh sit
					amet, cursus pellentesque libero. Maecenas pulvinar elit dui, id
					luctus sem pharetra eget. Interdum et malesuada fames ac ante ipsum
					primis in faucibus. Phasellus id sagittis tortor. Sed volutpat metus
					at eleifend vestibulum. Nulla massa est, mollis sit amet ligula
					dictum, porttitor gravida purus.
				</p>
			</div>
			<div className={styles.row2}>
				<p className={styles.p}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
					maximus urna vel velit sollicitudin venenatis. Duis luctus posuere
					nulla quis elementum. Class aptent taciti sociosqu ad litora torquent
					per conubia nostra, per inceptos himenaeos. Aliquam varius varius
					neque facilisis tincidunt. Nunc est felis, tristique nec nibh sit
					amet, cursus pellentesque libero. Maecenas pulvinar elit dui, id
					luctus sem pharetra eget. Interdum et malesuada fames ac ante ipsum
					primis in faucibus. Phasellus id sagittis tortor. Sed volutpat metus
					at eleifend vestibulum. Nulla massa est, mollis sit amet ligula
					dictum, porttitor gravida purus.
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
				<h2 className={styles.title}>Lorem Ipsum</h2>
				<p className={styles.p_separador}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem,
					dicta eum molestiae ipsa ratione, est fugiat tempore illo ut neque
					aliquam doloribus.
				</p>
				<div className={styles.icons}>
					<img className={styles.icon} src={iFace} />
					<img className={styles.icon} src={iFace} />
					<img className={styles.icon} src={iFace} />
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.contexto_row}>
					<div className={styles.contexto_row_left}>
						<h3 className={styles.contexto_titulo}>Lorem Ipsum</h3>
						<p className={styles.contexto_p}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
							maximus urna vel velit sollicitudin venenatis. Duis luctus posuere
							nulla quis elementum. Class aptent taciti sociosqu ad litora
							torquent per conubia nostra, per inceptos himenaeos. Aliquam
							varius varius neque facilisis tincidunt. Nunc est felis, tristique
							nec nibh sit amet, cursus pellentesque libero.{" "}
						</p>
					</div>
					<div className={styles.contexto_row_right}>
						<img
							className={styles.context_img}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
					</div>
				</div>
				<div className={styles.contexto_row2}>
					<div className={styles.contexto_row_left}>
						<h3 className={styles.contexto_titulo}>Lorem Ipsum</h3>
						<p className={styles.contexto_p}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
							maximus urna vel velit sollicitudin venenatis. Duis luctus posuere
							nulla quis elementum. Class aptent taciti sociosqu ad litora
							torquent per conubia nostra, per inceptos himenaeos. Aliquam
							varius varius neque facilisis tincidunt. Nunc est felis, tristique
							nec nibh sit amet, cursus pellentesque libero.{" "}
						</p>
					</div>
					<div className={styles.contexto_row_right}>
						<img
							className={styles.context_img2}
							src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
						/>
					</div>
				</div>
				<div className={styles.contexto_row}>
					<div className={styles.contexto_row_left}>
						<h3 className={styles.contexto_titulo}>Lorem Ipsum</h3>
						<p className={styles.contexto_p}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
							maximus urna vel velit sollicitudin venenatis. Duis luctus posuere
							nulla quis elementum. Class aptent taciti sociosqu ad litora
							torquent per conubia nostra, per inceptos himenaeos. Aliquam
							varius varius neque facilisis tincidunt. Nunc est felis, tristique
							nec nibh sit amet, cursus pellentesque libero.{" "}
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
