import styles from "./TopMenu.module.css";
import arrowDown from "../../../images/arrow-down.png";
import { useState, useContext } from "react";
import TopMenuModal from "./TopMenuModal/TopMenuModal";
import arrowUp from "../../../images/upload.png";
import { Link } from "react-router-dom";
import { AppContext } from "../../../App";

interface Props {
	nombre: string;
}

function TopMenu({ nombre }: Props) {
	const { user } = useContext(AppContext);

	const [isVisible, setIsVisible] = useState(false);

	const handleShowVisible = () => {
		setIsVisible(true);
	};
	const handleCloseVisible = () => {
		setIsVisible(false);
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>
				<Link to="/">
					ONYX
				</Link>
			</h1>
			<div className={styles.right}>
				<p className={styles.p} onClick={(e) => isVisible?setIsVisible(false):setIsVisible(true)}>{(user && user.username)? user.username:"Usuario"}</p>
				{isVisible ? (
					<img
						onClick={handleCloseVisible}
						className={styles.icon}
						src={arrowUp}
					/>
				) : (
					<img
						onClick={handleShowVisible}
						className={styles.icon}
						src={arrowDown}
					/>
				)}
				{isVisible && <TopMenuModal />}
			</div>
		</div>
	);
}

export default TopMenu;
