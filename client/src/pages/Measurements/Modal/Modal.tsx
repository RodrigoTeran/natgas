import { Link } from "react-router-dom";
import BtnPrimary from "../../Welcome/Btns/BtnPrimary/BtnPrimary";
import styles from "./Modal.module.css";

interface Props {
	message: string;
	handleClose: any;
}

function Modal({ message, handleClose }: Props) {
	return (
		<div className={styles.page}>
			<div className={styles.modal}>
				<div className={styles.modal_content}>
					<span className={styles.close} onClick={handleClose}>
						&times;
					</span>
					<h3 className={styles.h3}>Omitir medidas</h3>
					<p className={styles.p}>{message}</p>
					<div className={styles.buttons}>
						<Link to="/inicio">
							<BtnPrimary
								message="Aceptar"
								color="#FF6159"
								color_text="white"
								borderColor="transparent"
								children={""}
							/>
						</Link>
						{/* buscar mejor solucion */}
						{/* <BtnPrimary
							message="Lorem"
							color="#6A6A6A"
							color_text="white"
							borderColor="transparent"
							children={""}
						/> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
