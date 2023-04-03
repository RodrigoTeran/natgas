import styles from "./BtnPrimary.module.css";

interface Props {
	message: "Login" | "Signup" | "Omitir" | "Siguiente" | "Lorem" | "Ingresar";
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
			{message === "Omitir" && <div>Omitir</div>}
			{message === "Siguiente" && <div>Siguiente</div>}
			{message === "Ingresar" && <div>Ingresar</div>}
			{message === "Lorem" && <div>Lorem</div>}
			{children}
		</button>
	);
}

export default BtnPrimary;
