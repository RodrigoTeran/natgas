import styles from "./BtnPrimary.module.css";

interface Props {
	message: "Login" | "Signup";
	color: string;
	color_text: string;
	borderColor?: string;
	children: any;
}

function BtnPrimary({
	message,
	color,
	color_text,
	borderColor,
	children,
}: Props) {
	return (
		<button
			className={styles.page}
			style={{
				backgroundColor: color,
				border: `1px solid ${borderColor || color}`,
				color: color_text,
			}}
		>
			{message === "Login" && <div>Login</div>}
			{message === "Signup" && <div>Signup</div>}
			{children}
		</button>
	);
}

export default BtnPrimary;
