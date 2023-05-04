import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
	getUserGoalData,
	getUserSexData,
} from "../../../routes/auth/auth.routes";
import { MessagesContext } from "../../../layouts/Messages/Messages";
import { useContext, useEffect, useState } from "react";
import styles from "./UserGoal.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function UserGoal() {
	const { addStaticMsg } = useContext(MessagesContext);
	const [goalData, setGoalData] = useState({
		SubirPeso: 0,
		MantenerPeso: 0,
		BajarPeso: 0,
	});

	const fetchSexData = async (): Promise<void> => {
		const resData = await getUserGoalData();
		console.log(resData);
		if (resData === null) {
			addStaticMsg("Error al obtener las dietas", "danger");
			return;
		}

		setGoalData(resData.data);
	};

	useEffect(() => {
		fetchSexData();
	}, []);

	const chartData = {
		labels: ["Subir Peso", "Mantener Peso", "Bajar Peso"],
		datasets: [
			{
				label: "# of users",
				data: [2, 1, 2],
				backgroundColor: [
					"rgb(255, 99, 132)",
					"rgb(54, 162, 235)",
					"rgb(0,255,0)",
				],
				borderColor: [
					"rgb(255, 99, 132, 1)",
					"rgb(54, 162, 235, 1)",
					"rgb(0,255,0)",
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className={styles.content}>
			<h1 className={styles.spacing}>User Goal</h1>
			<Pie data={chartData} />
		</div>
	);
}
export default UserGoal;
