import styles from "./Welcome.module.css";
import { useContext } from "react";
import { AppContext } from "../../App";
import BtnPrimary from "./Btns/BtnPrimary/BtnPrimary";
import Menu from "./Menu/Menu";
import iFace from "./icons/facebook.png";
import image_right from "./image/welcome_image_v1.png";
import { Link } from "react-router-dom";

function Welcome() {
	const { user } = useContext(AppContext);

	return (
		<div className={styles.page}>
			<Menu />
			<div className={styles.content}>
				<div className={styles.left}>
					<h2 className={styles.title}>Lorem ipsum dolor sit amet.</h2>
					<p className={styles.p}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad aliquid
						delectus, fugit magnam, ut minus nobis molestiae facere eius aliquam
						deleniti explicabo reiciendis asperiores obcaecati, quis optio
						exercitationem velit vitae odit. Adipisci!
					</p>
					{user === null && (
						<>
							<Link to="/iniciar-sesion">
								<BtnPrimary
									message="Login"
									color="#FF6159"
									color_text="white"
									borderColor="transparent"
									children={""}
								/>
							</Link>
							<Link to="/iniciar-sesion">
								<BtnPrimary
									message="Signup"
									color="transparent"
									color_text="white"
									borderColor="white"
									children={""}
								/>
							</Link>
						</>
					)}
					{user !== null && (
						<Link to="/home">
							<BtnPrimary
								message="Siguiente"
								color="#FF6159"
								color_text="white"
								borderColor="transparent"
								children={""}
							/>
						</Link>
					)}

					<div className={styles.icons}>
						<img className={styles.icon} src={iFace} />
						<img className={styles.icon} src={iFace} />
						<img className={styles.icon} src={iFace} />
					</div>
				</div>
				<div className={styles.right}>
					<img className={styles.image_right} src={image_right} />
				</div>
			</div>
		</div>
	);
}

export default Welcome;
