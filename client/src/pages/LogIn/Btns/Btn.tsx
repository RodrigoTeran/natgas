import { API_AUTH } from "../../../config/api";
import styles from "./Btn.module.css";

interface Props {
	provider: "Google" | "Facebook";
	color: "#1F87FC" | "#3C5998";
	children: any;
}

function Btn({ children, provider, color }: Props) {
	async function login() {
		const xd = await fetch(API_AUTH + "/login");
	}

	return (
		<button
			className={styles.page}
			style={{
				backgroundColor: color,
			}}
		>
			{provider === "Google" && (
				<div>
					<img
						className={styles.img_icon}
						src="https://static.vecteezy.com/system/resources/previews/010/353/285/non_2x/colourful-google-logo-on-white-background-free-vector.jpg"
					/>
				</div>
			)}
			{provider === "Facebook" && (
				<div>
					<img
						className={styles.img_icon}
						src="https://assets.stickpng.com/images/60fea6773d624000048712b5.png"
					/>
				</div>
			)}
			{children}
		</button>
	);
}

export default Btn;
