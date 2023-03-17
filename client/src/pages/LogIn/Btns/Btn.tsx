import { API_AUTH } from "../../../config/api";

interface Props {
	provider: "Google" | "Facebook";
	children: any;
}

function Btn({ children, provider }: Props) {
	async function login() {
		const xd = await fetch(API_AUTH + "/login");
	}

	return (
		<button>
			{provider === "Google" && <div>Google</div>}
			{provider === "Facebook" && <div>Facebook</div>}
			{children}
		</button>
	);
}

export default Btn;
